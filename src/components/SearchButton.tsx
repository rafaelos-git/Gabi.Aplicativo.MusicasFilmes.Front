import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

import colors from '../styles/colors'
import { StyleSheet, TouchableOpacityProps } from 'react-native'

interface SearchButtonProps extends TouchableOpacityProps {
}

export function SearchButton({...rest}: SearchButtonProps) {
    return(
        <TouchableOpacity>
            <Feather name="search" size={30} color="black" {...rest}/>
        </TouchableOpacity>
    )
}
