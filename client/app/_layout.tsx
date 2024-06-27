import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { Auth0Provider, useAuth0 } from 'react-native-auth0';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import store from '@/src/redux/store';
import { Provider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider, useLazyQuery } from '@apollo/client';
import '../global.css';
import tailwindColors from 'tailwindcss/colors';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { VERIFY_TOKEN } from '@/src/graphql/User';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const MyTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: tailwindColors.red[500],
    },
};

const client = new ApolloClient({
    uri: 'http://localhost:54321/graphql',
    cache: new InMemoryCache(),
});

export default function RootLayout() {
    const colorScheme = useColorScheme();

    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    return (
        <ApolloProvider client={client}>
            <Auth0Provider domain='gymgenie.ca.auth0.com' clientId='C91p0QLsRXScITOxvezpNolzeewgymoQ'>
                <Provider store={store}>
                    <ThemeProvider value={colorScheme === 'dark' ? MyTheme : DefaultTheme}>
                        <App />
                    </ThemeProvider>
                </Provider>
            </Auth0Provider>
        </ApolloProvider>
    );
}

const App = () => {
    const [verifyToken] = useLazyQuery(VERIFY_TOKEN);
    const { user, getCredentials } = useAuth0();

    return (
        <Stack screenOptions={{ headerStyle: { backgroundColor: tailwindColors.zinc[950] } }}>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='create-program' options={{ headerShown: false, presentation: 'formSheet' }} />
            <Stack.Screen name='auth' options={{ title: 'Sign In' }} />
            <Stack.Screen name='+not-found' />
        </Stack>
    );
};
