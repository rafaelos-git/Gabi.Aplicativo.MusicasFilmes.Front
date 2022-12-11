import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

import colors from '../styles/colors'
import { StyleSheet, TouchableOpacityProps } from 'react-native'

interface BackButtonProps extends TouchableOpacityProps {
    back: string,
    color: string
}

export function BackButton({back, color, ...rest}: BackButtonProps) {
    const navigation = useNavigation()
    return(
        <TouchableOpacity onPress={(back != 'Back') ? () => navigation.navigate(back as never) : () => navigation.goBack()}>
            <Ionicons name="ios-chevron-back-sharp" color={(color === 'branco') ? colors.white : colors.blue_custom} size={40} />
        </TouchableOpacity>
    )
}
