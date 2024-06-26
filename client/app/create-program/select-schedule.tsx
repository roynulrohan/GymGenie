import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import tailwindColors from 'tailwindcss/colors';

const scheduleOptions = ['1x/week', '2x/week', '3x/week', '4x/week', '5x/week', '6x/week', 'Every other day'];

export default function SelectSchedule() {
    const router = useRouter();
    const params = useLocalSearchParams();

    return (
        <View className='bg-zinc-900 h-full px-5 py-10'>
            <View className='gap-[1px] rounded-lg'>
                {scheduleOptions.map((schedule, i) => (
                    <Pressable
                        key={schedule}
                        onPress={() => router.navigate({ pathname: '/create-program', params: { schedule } })}
                        className={twMerge(
                            'dark:bg-zinc-800 px-5 py-3 w-full flex-row justify-between items-center',
                            i === 0 ? 'rounded-t-lg' : i === scheduleOptions.length - 1 ? 'rounded-b-lg' : ''
                        )}>
                        <Text className='dark:text-white text-lg'>{schedule}</Text>
                        {params.selected === schedule && <Feather name='check' size={20} color={tailwindColors.red[600]} />}
                    </Pressable>
                ))}
            </View>
        </View>
    );
}
