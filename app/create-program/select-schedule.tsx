import { Link, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

const scheduleOptions = ['1x/week', '2x/week', '3x/week', '4x/week', '5x/week', '6x/week', 'Every other day', 'Every 2 days'];

export default function SelectSchedule() {
    const router = useRouter();

    return (
        <View className='bg-zinc-900 h-full px-5 py-10'>
            <View className='gap-[1px] rounded-lg'>
                {scheduleOptions.map((schedule, i) => (
                    <Pressable
                        key={schedule}
                        onPress={() => router.navigate({ pathname: '/create-program', params: { schedule } })}
                        className={twMerge(
                            'dark:bg-zinc-800 px-5 py-3 w-full',
                            i === 0 ? 'rounded-t-lg' : i === scheduleOptions.length - 1 ? 'rounded-b-lg' : ''
                        )}>
                        <Text className='dark:text-white text-lg'>{schedule}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}
