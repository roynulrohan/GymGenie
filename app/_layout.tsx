import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import tailwindColors from 'tailwindcss/colors';
import '../global.css';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const MyTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: tailwindColors.red[500],
    },
};

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
        <ThemeProvider value={colorScheme === 'dark' ? MyTheme : DefaultTheme}>
            <Stack screenOptions={{ headerStyle: { backgroundColor: tailwindColors.zinc[950] } }}>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen name='create-program' options={{ headerShown: false, presentation: 'modal' }} />
                <Stack.Screen name='auth' options={{ title: 'Sign In' }} />
                <Stack.Screen name='+not-found' />
            </Stack>
        </ThemeProvider>
    );
}
