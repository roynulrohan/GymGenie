import FormInput from '@/components/FormInput';
import { ThemedText } from '@/components/ThemedText';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Alert, Button, Keyboard, Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import ContextMenu from 'react-native-context-menu-view';

const programFormSchema = z.object({
    name: z.string().min(3, 'Program name must be at least 3 characters').max(50, "Program name can't be longer than 50 characters"),
    workoutSplit: z.string(),
});

const workoutSplitOptions = ['Full Body', 'Upper/Lower', 'Push/Pull/Legs', 'Push Pull', 'Body Part Split', 'Other'];

export default function CreateProgramModal() {
    const navigation = useNavigation();

    const { control, handleSubmit, formState, watch, setValue } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            workoutSplit: 'Full Body',
        },
        resolver: zodResolver(programFormSchema),
    });

    const workoutSplit = watch('workoutSplit');

    const onSubmit = (data: FieldValues) => {
        console.log(data);
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable disabled={!formState.isDirty} onPress={handleSubmit(onSubmit)}>
                    <ThemedText className={twMerge('', !formState.isValid ? '!text-zinc-400' : '!text-red-500')}>Save</ThemedText>
                </Pressable>
            ),
        });
    }, [navigation, formState]);

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

                <View className='mt-10'>
                    <ContextMenu
                        actions={workoutSplitOptions.map((option) => ({ title: option }))}
                        onPress={(e) => {
                            setValue('workoutSplit', e.nativeEvent.name);
                        }}
                        dropdownMenuMode>
                        <View className='dark:bg-zinc-800 px-5 py-4 rounded-lg flex-row justify-between items-center'>
                            <Text className='dark:text-white text-lg'>Workout Split</Text>
                            <Text className='dark:text-zinc-400 text-lg'>{workoutSplit}</Text>
                        </View>
                    </ContextMenu>
                </View>
            </View>
        </Pressable>
    );
}
