import FormInput from '@/components/FormInput';
import { IExercise, removeExercise, setWorkouts, updateName } from '@/redux/programCreateSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { AntDesign } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import tailwindColors from 'tailwindcss/colors';

const workoutFormSchema = z.object({
    name: z.string().min(1, 'Workout name must be at least 1 characters').max(50, "Program name can't be longer than 50 characters"),
    exercises: z.array(z.object({ id: z.string(), name: z.string(), sets: z.number(), reps: z.number(), weight: z.number(), rest: z.number() })),
});

interface IWorkoutForm {
    key: string;
    name: string;
    exercises: IExercise[];
}

export default function EditWorkout() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const workout = useSelector((state: RootState) => state.programCreate.workouts.find((workout) => workout.id === id));
    const dispatch = useDispatch<AppDispatch>();
    const { control, handleSubmit, formState, watch, setValue } = useForm<IWorkoutForm>({
        defaultValues: {
            name: '',
            exercises: [],
        },
        resolver: zodResolver(workoutFormSchema),
    });

    const formData = watch();

    useEffect(() => {
        if (workout) {
            setValue('name', workout?.name);
            setValue('exercises', workout?.exercises);
        }
    }, [workout]);

    useEffect(() => {
        if (workout && formData.name && workout?.name !== formData.name) {
            dispatch(updateName({ id: workout.id, name: formData.name }));
        }
    }, [formData.name]);

    const handleAddExercise = () => {};

    return (
        <Pressable onPress={Keyboard.dismiss}>
            <View className='bg-zinc-900 h-full px-5 py-10'>
                <FormInput
                    control={control}
                    name={'name'}
                    placeholder='Workout Name'
                    className='dark:bg-zinc-800 dark:text-white px-5 py-2.5 pb-4 text-lg rounded-lg'
                    errorProps={{ className: '!text-red-500 mt-1 text-center' }}
                />

                <View className='mt-10  rounded-lg items-stretch'>
                    <SwipeListView
                        data={formData.exercises}
                        scrollEnabled={false}
                        disableRightSwipe
                        stopRightSwipe={-75}
                        rightOpenValue={-75}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        renderItem={(data, rowMap) => (
                            <Pressable
                                onPress={() => {
                                    router.navigate({
                                        pathname: 'create-program/exercise-view',
                                        params: { exerciseId: data.item.id, workoutId: workout?.id! },
                                    });
                                }}
                                className={twMerge(
                                    'dark:bg-zinc-800 px-5 py-3 w-full flex-row justify-between items-center',
                                    data.index === 0 ? 'rounded-t-lg' : ''
                                )}
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }}>
                                <View>
                                    <Text className='dark:text-white text-lg'>{data.item.name}</Text>
                                </View>
                                <AntDesign name='right' size={16} color={tailwindColors.zinc[500]} />
                            </Pressable>
                        )}
                        renderHiddenItem={(data, rowMap) => (
                            <Pressable
                                onPress={() => {
                                    dispatch(removeExercise({ workoutId: workout?.id!, exerciseIndex: data.index }));
                                }}
                                className='rounded-lg items-center flex-1 flex-row'>
                                <View
                                    className={twMerge(
                                        'absolute bg-red-500 right-0 top-0 bottom-0 w-[75px] items-center flex-1',
                                        data.index === 0 ? 'rounded-tr-lg' : ''
                                    )}>
                                    <Text className='text-white my-auto'>Delete</Text>
                                </View>
                            </Pressable>
                        )}
                    />

                    <Pressable
                        onPress={handleAddExercise}
                        className={twMerge('dark:bg-zinc-800 px-5 py-3 w-full', formData.exercises.length !== 0 ? 'rounded-b-lg' : 'rounded-lg')}>
                        <Text className='text-red-600 text-lg'>Add Exercise</Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
}
