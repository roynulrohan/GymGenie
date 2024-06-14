// src/redux/workoutsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

export interface IExercise {
    id: string;
    name: string;
    description: string;
    muscle: string;
    equipment: string;
    type: string;
    sets: number;
    reps: number;
    startingWeight: number;
}

export interface IWorkout {
    id: string;
    key: string;
    name: string;
    exercises: IExercise[];
}

interface WorkoutsState {
    workouts: IWorkout[];
}

const initialState: WorkoutsState = {
    workouts: [
        {
            id: uuid.v4().toString(),
            key: 'A',
            name: 'Workout A',
            exercises: [
                {
                    id: 'squats',
                    name: 'Squats',
                    description:
                        'Squats are a compound exercise that works the muscles in your lower body and core. They are a great exercise for building strength and muscle mass in your legs, glutes, and lower back.',
                    muscle: 'Legs',
                    equipment: 'Barbell',
                    type: 'SetxRepxWeight',
                    sets: 5,
                    reps: 5,
                    startingWeight: 45,
                },
                {
                    id: 'bench-press',
                    name: 'Bench Press',
                    description:
                        'Bench Press is a compound exercise that works the muscles in your chest, shoulders, and triceps. It is a great exercise for building strength and muscle mass in your upper body.',
                    muscle: 'Chest',
                    equipment: 'Barbell',
                    type: 'SetxRepxWeight',
                    sets: 5,
                    reps: 5,
                    startingWeight: 45,
                },
                {
                    id: 'barbell-row',
                    name: 'Barbell Row',
                    description:
                        'Barbell Row is a compound exercise that works the muscles in your back and biceps. It is a great exercise for building strength and muscle mass in your upper body.',
                    muscle: 'Back',
                    equipment: 'Barbell',
                    type: 'SetxRepxWeight',
                    sets: 5,
                    reps: 5,
                    startingWeight: 45,
                },
            ],
        },
    ],
};

const programCreateSlice = createSlice({
    name: 'programCreate',
    initialState,
    reducers: {
        resetWorkouts: (state) => {
            state.workouts = initialState.workouts;
        },
        setWorkouts: (state, action: PayloadAction<IWorkout[]>) => {
            state.workouts = action.payload;
        },
        updateName: (state, action: PayloadAction<{ id: string; name: string }>) => {
            state.workouts = state.workouts.map((workout) => (workout.id === action.payload.id ? { ...workout, name: action.payload.name } : workout));
        },
        addWorkout: (state, action: PayloadAction<IWorkout>) => {
            state.workouts.push(action.payload);
        },
        deleteWorkout: (state, action: PayloadAction<string>) => {
            state.workouts = state.workouts.filter((workout) => workout.id !== action.payload);
        },
        removeExercise: (state, action: PayloadAction<{ workoutId: string; exerciseIndex: number }>) => {
            state.workouts = state.workouts.map((workout) => {
                if (workout.id === action.payload.workoutId) {
                    workout.exercises.splice(action.payload.exerciseIndex, 1);
                }

                return workout;
            });
        },
        updateExercise: (state, action: PayloadAction<{ workoutId: string; exerciseIndex: number; exercise: IExercise }>) => {
            state.workouts = state.workouts.map((workout) => {
                if (workout.id === action.payload.workoutId) {
                    workout.exercises[action.payload.exerciseIndex] = action.payload.exercise;
                }

                return workout;
            });
        },
    },
});

export const { setWorkouts, updateName, resetWorkouts, addWorkout, deleteWorkout, removeExercise, updateExercise } = programCreateSlice.actions;

export default programCreateSlice.reducer;
