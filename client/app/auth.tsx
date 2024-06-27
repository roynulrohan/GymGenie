import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { Button, Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import { useState } from 'react';

WebBrowser.maybeCompleteAuthSession();

GoogleSignin.configure({
    scopes: ['profile', 'email'],
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

export default function Auth() {
    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState<any>();

    const config = {
        iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    };

    const [request, response, promptAsync] = Google.useAuthRequest(config);

    const getUserInfo = async (token: string) => {
        //absent token
        if (!token) return;
        //present token
        try {
            const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const user = await response.json();
            //store user information  in Asyncstorage
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setUserInfo(user);
        } catch (error) {
            console.error('Failed to fetch user data:', response);
        }
    };

    const signInWithGoogle = async () => {
        try {
            // Attempt to retrieve user information from AsyncStorage
            const userJSON = await AsyncStorage.getItem('user');

            if (userJSON) {
                // If user information is found in AsyncStorage, parse it and set it in the state
                setUserInfo(JSON.parse(userJSON));
            } else if (response?.type === 'success') {
                getUserInfo(response.authentication?.accessToken!);
            }
        } catch (error) {
            // Handle any errors that occur during AsyncStorage retrieval or other operations
            console.error('Error retrieving user data from AsyncStorage:', error);
        }
    };

    useEffect(() => {
        signInWithGoogle();
    }, [response]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {userInfo ? (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 25, marginBottom: 50 }}>
                        <Image
                            source={userInfo.picture}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: '#0553',
                            }}
                            contentFit='cover'
                            transition={200}
                        />

                        <Text>{userInfo.name}</Text>
                    </View>

                    <Button
                        title='Sign Out'
                        onPress={async () => {
                            await AsyncStorage.removeItem('user');
                            setUserInfo(undefined);
                        }}
                    />
                </View>
            ) : (
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => {
                        promptAsync();
                    }}
                />
            )}
        </View>
    );
}
