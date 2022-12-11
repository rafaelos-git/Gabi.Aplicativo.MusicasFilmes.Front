import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacityProps } from 'react-native'
import colors from '../styles/colors'

interface LabelProps extends TouchableOpacityProps {
    title: string,
    secure: boolean,
}

export function Label({ title, secure, ...rest }: LabelProps) {
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [text, setText] = useState<string>()

    function handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!text)
    }

    function handleInputFocus() {
        setIsFocused(true)
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value)
        setText(value)
    }

    return (
        <TextInput 
            style={[
                styles.input,
                (isFocused || isFilled) && { borderColor: '#3650e7' }
            ]} 
            placeholder={title} 
            onBlur={handleInputBlur} 
            onFocus={handleInputFocus}
            onChangeText={handleInputChange}
            secureTextEntry={secure}
            {...rest}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
    }
})