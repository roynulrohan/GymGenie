export const PresetPrograms = [
  {
    id: 'stronglifts-5x5',
    name: 'StrongLifts 5x5',
    workoutSplit: 'Full Body',
    schedule: 'Every Other Day',
    workouts: [
      {
        name: 'Workout A',
        exerciseIds: ['squats', 'bench-press', 'barbell-row'],
      },
      {
        name: 'Workout B',
        exerciseIds: ['squats', 'overhead-press', 'deadlift'],
      },
    ],
  },
  {
    id: 'stronglifts-5x5-plus',
    name: 'StrongLifts 5x5 Plus',
    workoutSplit: 'Full Body',
    schedule: 'Every Other Day',
    workouts: [
      {
        name: 'Workout A',
        exerciseIds: ['squats', 'bench-press', 'barbell-row', 'situps'],
      },
      {
        name: 'Workout B',
        exerciseIds: ['deadlift', 'overhead-press', 'dips', 'planks'],
      },
      {
        name: 'Workout C',
        exerciseIds: [
          'incline-bench-press',
          'pullups',
          'dumbbell-bench-press',
          'dumbbell-row',
          'skull-crushers',
          'barbell-curl',
          'standing-calf-raise',
          'pallof-press',
        ],
      },
    ],
  },
];
