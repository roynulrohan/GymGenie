import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].text,
                headerShown: false,
                tabBarStyle: {paddingTop:5, height:90},
            }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name='programs'
                options={{
                    title: 'Programs',
                    tabBarIcon: ({ color, focused }) => <FontAwesome6 name='gripfire' size={24} color={color} />,
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
