import { ThemedText } from '@/src/components/ThemedText';
import { resetWorkouts } from '@/src/redux/programCreateSlice';
import { AppDispatch } from '@/src/redux/store';
import { Link, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import tailwindColors from 'tailwindcss/colors';

export default function CreateProgramLayout() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(resetWorkouts());
    }, []);

    return (
        <Stack screenOptions={{ headerStyle: { backgroundColor: tailwindColors.zinc[900] } }}>
            <Stack.Screen
                name='index'
                options={{
                    title: 'Create Program',
                    headerLeft: () => (
                        <Link href='../' className='px-5 py-2' suppressHighlighting>
                            <ThemedText className='!text-red-600'>Cancel</ThemedText>
                        </Link>
                    ),
                    headerRight: () => (
                        <Pressable disabled>
                            <ThemedText className='!text-zinc-400'>Save</ThemedText>
                        </Pressable>
                    ),
                }}
            />
            <Stack.Screen
                name='select-schedule'
                options={{ title: 'Schedule', headerTintColor: tailwindColors.red[600], headerTitleStyle: { color: 'white' } }}
            />
            <Stack.Screen
                name='edit-workout'
                options={{ title: 'Edit Workout', headerBackTitle: 'Back', headerTintColor: tailwindColors.red[600], headerTitleStyle: { color: 'white' } }}
            />
            <Stack.Screen name='exercise-view' options={{ title: 'Exercise' }} />
        </Stack>
    );
}
