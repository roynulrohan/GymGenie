import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import tailwindColors from 'tailwindcss/colors';

interface NumberInputProps {
    decrement: () => void;
    increment: () => void;
    value: number;
    leftProps?: any;
    rightProps?: any;
    leftIconColor?: string;
    rightIconColor?: string;
}

export default function NumberInput({ decrement, increment, value, leftProps, rightProps, leftIconColor, rightIconColor }: NumberInputProps) {
    return (
        <View className='flex-row items-center'>
            <TouchableHighlight
                onPress={decrement}
                className='dark:bg-zinc-900 px-4 py-2 rounded-l-lg'
                style={{
                    borderRightColor: tailwindColors.zinc[800],
                    borderRightWidth: StyleSheet.hairlineWidth,
                }}
                {...leftProps}>
                <AntDesign name='minus' size={16} color={leftIconColor || tailwindColors.zinc[500]} />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={increment}
                className='dark:bg-zinc-900 px-4 py-2 rounded-r-lg'
                style={{
                    borderRightColor: tailwindColors.zinc[800],
                    borderRightWidth: StyleSheet.hairlineWidth,
                }}
                {...rightProps}>
                <AntDesign name='plus' size={16} color={rightIconColor || tailwindColors.zinc[500]} />
            </TouchableHighlight>
        </View>
    );
}
