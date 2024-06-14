import { AppDispatch, RootState } from '@/redux/store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function ExerciseView() {
    const { exerciseId, workoutId } = useLocalSearchParams();
    const router = useRouter();
    const exercise = useSelector((state: RootState) =>
        state.programCreate.workouts.find((workout) => workout.id === workoutId)?.exercises.find((exercise) => exercise.id === exerciseId)
    );
    const dispatch = useDispatch<AppDispatch>();

    const currentWeightInputRef = useRef<TextInput>(null);

    const [currentWeight, setCurrentWeight] = useState<number | null>(exercise?.startingWeight || 45);

    if (!exercise) {
        return null;
    }

    return (
        <Pressable onPress={Keyboard.dismiss}>
            <View className='bg-zinc-900 h-full px-5 py-10'>
                <View className='mt-10 rounded-lg flex-row w-full'>
                    <Pressable
                        onPress={() => router.push({ pathname: '/create-program/set-rep-edit', params: { exerciseId, workoutId } })}
                        className={'dark:bg-zinc-800 px-5 py-3 flex-1 rounded-l-lg'}
                        style={{
                            borderRightColor: 'black',
                            borderRightWidth: StyleSheet.hairlineWidth,
                        }}>
                        <Text className='dark:text-zinc-400 text-sm text-center mb-1'>SetsxReps</Text>

                        <Text className='dark:text-white text-lg text-center'>
                            {exercise.sets}x{exercise.reps}
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => currentWeightInputRef.current?.focus()}
                        className={'dark:bg-zinc-800 px-5 py-3 flex-1 rounded-r-lg'}
                        style={{
                            borderRightColor: 'black',
                            borderRightWidth: StyleSheet.hairlineWidth,
                        }}>
                        <Text className='dark:text-zinc-400 text-sm text-center mb-1'>Weight (lbs)</Text>

                        <View className='flex-row items-end justify-center'>
                            <TextInput
                                ref={currentWeightInputRef}
                                value={currentWeight?.toString()}
                                onChange={(e) => {
                                    if (!e.nativeEvent.text) {
                                        setCurrentWeight(null);
                                        return;
                                    }

                                    setCurrentWeight(parseInt(e.nativeEvent.text));
                                }}
                                keyboardType='numeric'
                                className='dark:text-white text-lg'
                            />
                        </View>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
}
