import FormInput from '@/components/FormInput';
import { ThemedText } from '@/components/ThemedText';
import { AntDesign } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import { SwipeListView } from 'react-native-swipe-list-view';
import { twMerge } from 'tailwind-merge';
import tailwindColors from 'tailwindcss/colors';
import { z } from 'zod';

const programFormSchema = z.object({
    name: z.string().min(3, 'Program name must be at least 3 characters').max(50, "Program name can't be longer than 50 characters"),
    workoutSplit: z.string(),
    schedule: z.string(),
    workouts: z.array(z.object({ name: z.string(), exercises: z.array(z.string()) })),
});

interface IProgramForm {
    name: string;
    workoutSplit: string;
    schedule: string;
    workouts: { key: string; name: string; exercises: string[] }[];
}

const workoutSplitOptions = ['Full Body', 'Upper/Lower', 'Push/Pull/Legs', 'Push Pull', 'Body Part Split', 'Other'];

export default function Index() {
    const navigation = useNavigation();
    const params = useLocalSearchParams();

    const { control, handleSubmit, formState, watch, setValue } = useForm<IProgramForm>({
        defaultValues: {
            name: '',
            workoutSplit: 'Full Body',
            schedule: '3x/week',
            workouts: [{ key: 'A', name: 'Workout A', exercises: ['Squat', 'Bench', 'BB Row'] }],
        },
        resolver: zodResolver(programFormSchema),
    });

    const formData = watch();

    const onSubmit = (data: FieldValues) => {
        console.log(data);
    };

    // Define available keys
    const availableKeys = useMemo(() => {
        const allKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        const usedKeys = formData.workouts.map((workout) => workout.key);
        return allKeys.filter((key) => !usedKeys.includes(key));
    }, [formData.workouts]);

    const addWorkout = () => {
        const newWorkout = { key: availableKeys[0], name: `Workout ${availableKeys[0]}`, exercises: [] };
        setValue('workouts', [...formData.workouts, newWorkout]);
    };

    const deleteWorkout = (key: string) => {
        setValue(
            'workouts',
            formData.workouts.filter((workout) => workout.key !== key)
        );
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable disabled={!formState.isDirty} onPress={handleSubmit(onSubmit)} className='px-5 py-2'>
                    <ThemedText className={twMerge('', !formState.isValid ? '!text-zinc-400' : '!text-red-500')}>Save</ThemedText>
                </Pressable>
            ),
        });
    }, [navigation, formState]);

    useEffect(() => {
        setValue('schedule', (params.schedule as string) ?? '3x/week');
    }, [params.schedule]);

    return (
        <Pressable onPress={Keyboard.dismiss}>
            <View className='bg-zinc-900 h-full px-5 py-10'>
                <FormInput
                    control={control}
                    name={'name'}
                    placeholder='Program Name'
                    className='dark:bg-zinc-800 dark:text-white px-5 py-2.5 pb-4 text-lg rounded-lg'
                    errorProps={{ className: '!text-red-500 mt-1 text-center' }}
                />

                <View className='mt-10 gap-1 rounded-lg'>
                    <ContextMenu
                        actions={workoutSplitOptions.map((option) => ({ title: option }))}
                        onPress={(e) => {
                            setValue('workoutSplit', e.nativeEvent.name);
                        }}
                        dropdownMenuMode>
                        <View className='dark:bg-zinc-800 px-5 py-3 rounded-t-lg flex-row justify-between items-center'>
                            <Text className='dark:text-white text-lg'>Workout Split</Text>
                            <Text className='dark:text-zinc-400 text-lg'>{formData.workoutSplit}</Text>
                        </View>
                    </ContextMenu>

                    <Link href={{ pathname: '/create-program/select-schedule', params: { selected: formData.schedule } }}>
                        <View className='dark:bg-zinc-800 px-5 py-3 rounded-b-lg w-full flex-row justify-between items-center'>
                            <Text className='dark:text-white text-lg'>Schedule</Text>
                            <Text className='dark:text-zinc-400 text-lg'>{formData.schedule}</Text>
                        </View>
                    </Link>
                </View>

                <View className='mt-10  rounded-lg items-stretch'>
                    <SwipeListView
                        data={formData.workouts}
                        disableRightSwipe
                        stopRightSwipe={-75}
                        rightOpenValue={-75}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        renderItem={(data, rowMap) => (
                            <View
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
                                    {data.item.exercises.length !== 0 && <Text className='dark:text-zinc-400 text-sm'>{data.item.exercises.join(', ')}</Text>}
                                </View>
                                <AntDesign name='right' size={16} color={tailwindColors.zinc[500]} />
                            </View>
                        )}
                        renderHiddenItem={(data, rowMap) => (
                            <Pressable onPress={() => deleteWorkout(data.item.key)} className='rounded-lg items-center flex-1 flex-row'>
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
                        onPress={addWorkout}
                        className={twMerge('dark:bg-zinc-800 px-5 py-3 w-full', formData.workouts.length !== 0 ? 'rounded-b-lg' : 'rounded-lg')}>
                        <Text className='text-red-600 text-lg'>Add Workout</Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});
