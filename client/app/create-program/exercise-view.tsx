import NumberInput from '@/src/components/NumberInput';
import WeightPlatesView from '@/src/components/WeightPlatesView';
import { updateExercise } from '@/src/redux/programCreateSlice';
import { AppDispatch, RootState } from '@/src/redux/store';
import { roundToNearestFive } from '@/src/util/formatting';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tailwindColors from 'tailwindcss/colors';

export default function ExerciseView() {
    const { exerciseId, workoutId } = useLocalSearchParams();
    const navigation = useNavigation();
    const router = useRouter();
    const exercise = useSelector((state: RootState) =>
        state.programCreate.workouts.find((workout) => workout.id === workoutId)?.exercises.find((exercise) => exercise.id === exerciseId)
    );
    const dispatch = useDispatch<AppDispatch>();

    const currentWeightInputRef = useRef<TextInput>(null);

    const [currentWeight, setCurrentWeight] = useState<number | null>(exercise?.startingWeight || 45);
    const [currentIncrements, setCurrentIncrements] = useState<number | null>(exercise?.increment || 5);
    const [currentIncrementFrequency, setCurrentIncrementFrequency] = useState<number | null>(exercise?.incrementFrequency || 1);

    useEffect(() => {
        navigation.setOptions({
            title: exercise?.name,
        });
    }, [navigation]);

    if (!exercise) {
        return null;
    }

    return (
        <Pressable
            onPress={() => {
                Keyboard.dismiss();
                setCurrentWeight((prev) => roundToNearestFive(prev || 45));
            }}>
            <View className='bg-zinc-900 h-full px-5 py-10'>
                <View className='my-5'>
                    <WeightPlatesView weight={currentWeight || 45} />
                </View>

                <View className='mt-10 rounded-lg flex-row justify-center gap-x-5 w-full'>
                    <View className='rounded-lg'>
                        <View
                            className={'dark:bg-zinc-800 px-5 py-3 rounded-t-lg'}
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}>
                            <View className='flex-row items-center gap-x-5 justify-between'>
                                <Text className='dark:text-white text-lg'>Sets</Text>

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
                            <View className='flex-row items-center gap-x-5 justify-between'>
                                <Text className='dark:text-white text-lg'>Reps</Text>

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

                    <View className='flex-row'>
                        <Pressable
                            onPress={() => currentWeightInputRef.current?.focus()}
                            className={'dark:bg-zinc-800 px-5 py-3 rounded-l-lg items-center justify-center'}
                            style={{
                                borderRightColor: 'black',
                                borderRightWidth: StyleSheet.hairlineWidth,
                            }}>
                            <Text className='dark:text-zinc-400 text-sm text-center mb-1'>Weight (lbs)</Text>
                            <View className='flex-row items-center justify-center'>
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
                                    className='dark:text-white text-xl font-bold'
                                />
                            </View>
                        </Pressable>

                        <View className='dark:bg-zinc-800 p-2 rounded-r-lg items-stretch'>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                onPress={() => {
                                    setCurrentWeight((prev) => roundToNearestFive((prev || 45) + 5));
                                }}
                                className={'dark:bg-zinc-900 px-4 py-2 rounded-t-lg flex-1'}
                                style={{
                                    borderBottomColor: tailwindColors.zinc[800],
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }}>
                                <Text className='text-zinc-400 text-lg'>+ 5</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                activeOpacity={0.6}
                                onPress={() => {
                                    setCurrentWeight((prev) => roundToNearestFive((prev || 45) - 5));
                                }}
                                className={'dark:bg-zinc-900 px-4 py-2 rounded-b-lg flex-1'}
                                style={{
                                    borderBottomColor: tailwindColors.zinc[800],
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }}>
                                <Text className='text-zinc-400 text-lg'>- 5</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>

                <View className='dark:bg-zinc-800 mt-10 rounded-lg flex-row w-full'>
                    <View
                        className={'px-5 py-3 rounded-l-lg items-center justify-center flex-1'}
                        style={{
                            borderRightColor: 'black',
                            borderRightWidth: StyleSheet.hairlineWidth,
                        }}>
                        <Text className='dark:text-zinc-400 text-sm text-center mb-1'>Increments (lbs)</Text>
                        <View className='flex-row items-center justify-center'>
                            <TextInput
                                value={currentIncrements?.toString()}
                                onChange={(e) => {
                                    if (!e.nativeEvent.text) {
                                        setCurrentIncrements(null);
                                        return;
                                    }

                                    setCurrentIncrements(parseInt(e.nativeEvent.text));
                                }}
                                keyboardType='numeric'
                                className='dark:text-white text-xl'
                            />
                        </View>
                    </View>
                    <View className={'px-5 py-3 rounded-l-lg items-center justify-center flex-1'}>
                        <Text className='dark:text-zinc-400 text-sm text-center mb-1'>Increment Frequency</Text>
                        <View className='flex-row items-center justify-center'>
                            <TextInput
                                value={currentIncrementFrequency?.toString()}
                                onChange={(e) => {
                                    if (!e.nativeEvent.text) {
                                        setCurrentIncrementFrequency(null);
                                        return;
                                    }

                                    setCurrentIncrementFrequency(parseInt(e.nativeEvent.text));
                                }}
                                keyboardType='numeric'
                                className='dark:text-white text-xl'
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}
