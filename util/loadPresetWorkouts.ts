import programs from '../data/preset-programs.json';

export interface Program {
    id: string;
    name: string;
    tags: string[];
    selected?:boolean;
    schedules: Schedule[];
    workouts: Workout[];
}

export interface Schedule {
    frequency: string;
    days: string[];
}

export interface Workout {
    name: string;
    exercises: Exercise[];
}

export interface Exercise {
    name: string;
    sets: number;
    reps: number;
    weight: number;
    increment: number;
}

export const loadPresetPrograms = () => {
    return programs as Program[];
};
