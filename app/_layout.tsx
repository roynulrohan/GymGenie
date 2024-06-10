import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import '../global.css';
import tailwindColors from 'tailwindcss/colors';
import { Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerStyle: { backgroundColor: tailwindColors.zinc[950] } }}>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen
                    name='create-program'
                    options={{
                        title: 'Create Program',
                        presentation: 'modal',
                        headerStyle: { backgroundColor: tailwindColors.zinc[900] },
                        headerLeft: () => (
                            <Link href='../'>
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
                <Stack.Screen name='auth' options={{ title: 'Sign In' }} />
                <Stack.Screen name='+not-found' />
            </Stack>
        </ThemeProvider>
    );
}
