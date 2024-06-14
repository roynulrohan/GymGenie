import { calculateWeightPlates } from '@/services/WeightPlateCalculator';
import React, { useMemo } from 'react';
import { Text, View, ViewProps } from 'react-native';
import Animated, { SlideInRight } from 'react-native-reanimated';

interface WeightPlatesViewProps extends ViewProps {
    weight: number;
}

export default function WeightPlatesView({ weight, ...rest }: WeightPlatesViewProps) {
    const weightPlates = useMemo(() => {
        if (!weight || weight < 45) {
            return { 45: 0, 35: 0, 25: 0, 10: 0, 5: 0, 2.5: 0 };
        }
        return calculateWeightPlates(weight);
    }, [weight]);

    return (
        <View {...rest} className='flex-row justify-center items-center h-[180px] relative'>
            <Animated.View className='bg-zinc-600 w-44 h-[18px] rounded-l-sm flex-row items-center justify-center absolute left-0'>
                <Text className='text-white text-lg font-bold leading-none p-[2px]'>45</Text>
            </Animated.View>
            <Animated.View className='bg-zinc-600 w-2 h-[40px] rounded-sm absolute left-[154px]'></Animated.View>

            <Animated.View className='bg-zinc-600 w-[160px] h-[18px] rounded-r-sm absolute !-z-10 left-[164px]'></Animated.View>

            <Animated.View className='flex-row justify-start items-center absolute left-[162px]'>
                {weightPlates[45] > 0 &&
                    Array.from({ length: weightPlates[45] }).map((_, index) => (
                        <Animated.View
                            key={index}
                            className='bg-red-600 w-8 h-[180px] rounded-sm ml-[1px] flex-row items-center justify-center'
                            entering={SlideInRight}>
                            <Text className='text-white text-lg font-bold'>45</Text>
                        </Animated.View>
                    ))}
                {weightPlates[35] > 0 &&
                    Array.from({ length: weightPlates[35] }).map((_, index) => (
                        <Animated.View
                            key={index}
                            className='bg-blue-600 w-8 h-[160px] rounded-sm ml-[1px] flex-row items-center justify-center'
                            entering={SlideInRight}>
                            <Text className='text-white text-lg font-bold'>35</Text>
                        </Animated.View>
                    ))}
                {weightPlates[25] > 0 &&
                    Array.from({ length: weightPlates[25] }).map((_, index) => (
                        <Animated.View
                            key={index}
                            className='bg-green-600 w-8 h-[140px] rounded-sm ml-[1px] flex-row items-center justify-center'
                            entering={SlideInRight}>
                            <Text className='text-white text-lg font-bold'>25</Text>
                        </Animated.View>
                    ))}
                {weightPlates[10] > 0 &&
                    Array.from({ length: weightPlates[10] }).map((_, index) => (
                        <Animated.View
                            key={index}
                            className='bg-yellow-600 w-7 h-[120px] rounded-sm ml-[1px] flex-row items-center justify-center'
                            entering={SlideInRight}>
                            <Text className='text-white text-lg font-bold'>10</Text>
                        </Animated.View>
                    ))}
                {weightPlates[5] > 0 &&
                    Array.from({ length: weightPlates[5] }).map((_, index) => (
                        <Animated.View
                            key={index}
                            className='bg-purple-600 w-6 h-[80px] rounded-sm ml-[1px] flex-row items-center justify-center'
                            entering={SlideInRight}>
                            <Text className='text-white text-lg font-bold'>5</Text>
                        </Animated.View>
                    ))}
                {weightPlates[2.5] > 0 &&
                    Array.from({ length: weightPlates[2.5] }).map((_, index) => (
                        <Animated.View
                            key={index}
                            className='bg-indigo-600 w-6 h-[60px] rounded-sm ml-[1px] items-center justify-center'
                            entering={SlideInRight}>
                            <Text className='text-white text-lg font-bold leading-none'>2</Text>
                            <Text className='text-white text-lg font-bold leading-none'>·</Text>
                            <Text className='text-white text-lg font-bold leading-none'>5</Text>
                        </Animated.View>
                    ))}
            </Animated.View>
        </View>
    );
}
