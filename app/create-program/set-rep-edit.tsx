import NumberInput from '@/components/NumberInput';
import { updateExercise } from '@/redux/programCreateSlice';
import { RootState, AppDispatch } from '@/redux/store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function SetRepEdit() {
    const { exerciseId, workoutId } = useLocalSearchParams();
    const router = useRouter();
    const exercise = useSelector((state: RootState) =>
        state.programCreate.workouts.find((workout) => workout.id === workoutId)?.exercises.find((exercise) => exercise.id === exerciseId)
    );
    const dispatch = useDispatch<AppDispatch>();

    if (!exercise) {
        return null;
    }

    return (
        <View className='bg-zinc-900 h-full px-5'>
            <View className='mt-10 rounded-lg w-full'>
                <View
                    className={'dark:bg-zinc-800 px-5 py-3 rounded-t-lg'}
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}>
                    <View className='flex-row items-center justify-between'>
                        <Text className='dark:text-white text-lg'>{exercise.sets} Sets</Text>

                        <NumberInput
                            decrement={() => {
                                if (exercise.sets === 1) return;

                                dispatch(
                                    updateExercise({
                                        workoutId: workoutId as string,
                                        exerciseIndex: 0,
                                        exercise: { ...exercise, sets: exercise.sets - 1 },
                                    })
                                );
                            }}
                            increment={() => {
                                if (exercise.sets === 10) return;

                                dispatch(
                                    updateExercise({
                                        workoutId: workoutId as string,
                                        exerciseIndex: 0,
                                        exercise: { ...exercise, sets: exercise.sets + 1 },
                                    })
                                );
                            }}
                            value={exercise.sets}
                        />
                    </View>
                </View>
                <View
                    className={'dark:bg-zinc-800 px-5 py-3 rounded-b-lg'}
                    style={{
                        borderRightColor: 'black',
                        borderRightWidth: StyleSheet.hairlineWidth,
                    }}>
                    <View className='flex-row items-center justify-between'>
                        <Text className='dark:text-white text-lg'>{exercise.reps} Reps</Text>

                        <NumberInput
                            decrement={() => {
                                if (exercise.reps === 1) return;

                                dispatch(
                                    updateExercise({
                                        workoutId: workoutId as string,
                                        exerciseIndex: 0,
                                        exercise: { ...exercise, reps: exercise.reps - 1 },
                                    })
                                );
                            }}
                            increment={() => {
                                dispatch(
                                    updateExercise({
                                        workoutId: workoutId as string,
                                        exerciseIndex: 0,
                                        exercise: { ...exercise, reps: exercise.reps + 1 },
                                    })
                                );
                            }}
                            value={exercise.reps}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
