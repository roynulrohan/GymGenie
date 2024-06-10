import { ThemedText } from '@/components/ThemedText';
import { loadPresetPrograms, Program } from '@/util/loadPresetWorkouts';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

export default function Programs() {
    const [programs, setPrograms] = useState<Program[]>([]);

    useEffect(() => {
        const presets = loadPresetPrograms();

        // hardcoding for now
        presets[0].selected = true;

        setPrograms(presets);
    }, []);

    return (
        <SafeAreaView className='dark:bg-black h-full'>
            <ScrollView className='px-4' overScrollMode='never'>
                <ThemedText className='dark:!text-zinc-500 mx-5 mt-5'>ACTIVE PROGRAM</ThemedText>

                {programs[0] && <ProgramCard program={programs[0]} className='mt-2.5' />}

                <ThemedText className='dark:!text-zinc-500 mx-5 mt-5 mb-2.5'>OTHER PROGRAMS</ThemedText>
                {programs.map((program, index) => {
                    if (!program.selected) {
                        return <ProgramCard key={program.id} program={program} className='mb-5' />;
                    }
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

interface ProgramCardProps extends ViewProps {
    program: Program;
}

const ProgramCard = ({ program, className, ...rest }: ProgramCardProps) => {
    return (
        <View {...rest} className={twMerge('bg-zinc-900 rounded-lg px-7 py-5 gap-y-5', className)}>
            <View className='flex-row gap-x-2.5 items-center'>
                {program.selected && <AntDesign name='checkcircle' size={18} color='red' />}
                <ThemedText type='subtitle'>{program.name}</ThemedText>
            </View>

            <View className='flex-row gap-x-2.5'>
                {program.tags.map((tag) => (
                    <View key={tag} className='dark:bg-zinc-800 rounded-lg px-3 py-1'>
                        <ThemedText className='!text-sm'>{tag}</ThemedText>
                    </View>
                ))}
            </View>
        </View>
    );
};
