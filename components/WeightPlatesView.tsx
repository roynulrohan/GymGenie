import { calculateWeightPlates } from '@/services/WeightPlateCalculator';
import React, { useMemo } from 'react';
import { Text, View, ViewProps } from 'react-native';

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
        <View {...rest}>
            <View className='flex-row justify-center items-center'>
                <View className='bg-zinc-600 w-10 h-[18px] rounded-l-sm'></View>
                <View className='bg-zinc-600 w-2 h-[35px] rounded-sm'></View>
                {weightPlates[45] > 0 &&
                    Array.from({ length: weightPlates[45] }).map((_, index) => (
                        <View key={index} className='bg-red-600 w-7 h-[140px] rounded-sm ml-[2px] flex-row items-center justify-center'>
                            <Text className='text-white text-xs font-bold'>45</Text>
                        </View>
                    ))}
                {weightPlates[35] > 0 &&
                    Array.from({ length: weightPlates[35] }).map((_, index) => (
                        <View key={index} className='bg-blue-600 w-7 h-[120px] rounded-sm ml-[2px] flex-row items-center justify-center'>
                            <Text className='text-white text-xs font-bold'>35</Text>
                        </View>
                    ))}
                {weightPlates[25] > 0 &&
                    Array.from({ length: weightPlates[25] }).map((_, index) => (
                        <View key={index} className='bg-green-600 w-7 h-[100px] rounded-sm ml-[2px] flex-row items-center justify-center'>
                            <Text className='text-white text-xs font-bold'>25</Text>
                        </View>
                    ))}
                {weightPlates[10] > 0 &&
                    Array.from({ length: weightPlates[10] }).map((_, index) => (
                        <View key={index} className='bg-yellow-600 w-5 h-[70px] rounded-sm ml-[2px] flex-row items-center justify-center'>
                            <Text className='text-white text-xs font-bold'>10</Text>
                        </View>
                    ))}
                {weightPlates[5] > 0 &&
                    Array.from({ length: weightPlates[5] }).map((_, index) => (
                        <View key={index} className='bg-purple-600 w-5 h-[50px] rounded-sm ml-[2px] flex-row items-center justify-center'>
                            <Text className='text-white text-xs font-bold'>5</Text>
                        </View>
                    ))}
                {weightPlates[2.5] > 0 &&
                    Array.from({ length: weightPlates[2.5] }).map((_, index) => (
                        <View key={index} className='bg-indigo-600 w-5 h-[40px] rounded-sm ml-[2px] flex-row items-center justify-center'>
                            <Text className='text-white text-xs font-bold'>2.5</Text>
                        </View>
                    ))}
                <View className='bg-zinc-600 w-20 h-[18px] rounded-r-sm ml-[2px] flex-row items-center justify-center'>
                    <Text className='text-white text-xs font-bold'>45</Text>
                </View>
            </View>
        </View>
    );
}
