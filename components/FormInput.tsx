import React from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextProps, TextStyle } from 'react-native';
import { Control, Controller, ControllerProps, FieldValues } from 'react-hook-form';

interface Styles {
    input: StyleProp<TextStyle>;
    errorMessage: StyleProp<TextStyle>;
}

interface FormInputProps extends TextInputProps {
    control: Control<FieldValues> | undefined;
    name: string;
    errorProps?: TextProps;
}

const FormInput = ({ control, name, errorProps, ...rest }: FormInputProps) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <>
                    <TextInput value={value} onChangeText={onChange} onBlur={onBlur} {...rest} />
                    {error && <Text {...errorProps}>{error.message}</Text>}
                </>
            )}
        />
    );
};
export default FormInput;
