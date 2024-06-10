import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { AntDesign, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import tailwindColors from 'tailwindcss/colors';
import { Link } from '@react-navigation/native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: tailwindColors.red[500],
                headerStyle: { backgroundColor: 'black' },
                tabBarStyle: { backgroundColor: tailwindColors.zinc[950], paddingTop: 5, height: 90 },
            }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    headerTitle: 'GYM GENIE',
                    headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
                    tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name='programs'
                options={{
                    title: 'Programs',
                    tabBarIcon: ({ color, focused }) => <FontAwesome6 name='gripfire' size={24} color={color} />,
                    headerRight: () => (
                        <Link to={'/create-program'} className='px-10 py-2'>
                            <TabBarIcon name='add' size={25} color={tailwindColors.red[500]} />
                        </Link>
                    ),
                }}
            />

            <Tabs.Screen
                name='history'
                options={{
                    title: 'History',
                    tabBarIcon: ({ color, focused }) => <AntDesign name='calendar' size={24} color={color} />,
                }}
            />

            <Tabs.Screen
                name='progress'
                options={{
                    title: 'Progress',
                    tabBarIcon: ({ color, focused }) => <MaterialIcons name='ssid-chart' size={24} color={color} />,
                }}
            />

            <Tabs.Screen
                name='settings'
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => <FontAwesome6 name='gear' size={20} color={color} />,
                }}
            />
        </Tabs>
    );
}
