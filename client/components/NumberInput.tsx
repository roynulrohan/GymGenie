import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';
import tailwindColors from 'tailwindcss/colors';

interface NumberInputProps extends ViewProps {
    decrement: () => void;
    increment: () => void;
    value: number;
    leftProps?: any;
    rightProps?: any;
    leftIconColor?: string;
    rightIconColor?: string;
    leftClassname?: string;
    rightClassname?: string;
}

export default function NumberInput({
    decrement,
    increment,
    value,
    leftProps,
    rightProps,
    leftClassname,
    rightClassname,
    leftIconColor,
    rightIconColor,
    ...rest
}: NumberInputProps) {
    return (
        <View {...rest}>
            <View className='flex-row items-center'>
                <TouchableHighlight
                    onPress={decrement}
                    className={twMerge('dark:bg-zinc-900 px-4 py-2 h-full rounded-l-lg', leftClassname)}
                    style={{
                        borderRightColor: tailwindColors.zinc[800],
                        borderRightWidth: StyleSheet.hairlineWidth,
                    }}
                    {...leftProps}>
                    <AntDesign name='minus' size={16} color={leftIconColor || tailwindColors.zinc[500]} />
                </TouchableHighlight>
                <View className='dark:bg-zinc-900 h-full px-3 flex-row items-center'>
                    <Text className='dark:text-white text-lg leading-none'>{value}</Text>
                </View>
                <TouchableHighlight
                    onPress={increment}
                    className={twMerge('dark:bg-zinc-900 px-4 py-2 h-full rounded-r-lg', rightClassname)}
                    style={{
                        borderLeftColor: tailwindColors.zinc[800],
                        borderLeftWidth: StyleSheet.hairlineWidth,
                    }}
                    {...rightProps}>
                    <AntDesign name='plus' size={16} color={rightIconColor || tailwindColors.zinc[500]} />
                </TouchableHighlight>
            </View>
        </View>
    );
}
