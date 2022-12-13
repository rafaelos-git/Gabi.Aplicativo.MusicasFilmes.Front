import React from 'react'
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, View } from 'react-native'
import { AntDesign, Ionicons, FontAwesome5, MaterialCommunityIcons, Entypo  } from '@expo/vector-icons'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ButtonProps extends TouchableOpacityProps {
    title: string,
    icon: number,
}

export function Button({ title, icon, ...rest }: ButtonProps ) {
    return(
        <TouchableOpacity style={styles.container} {...rest}>
            {(icon === 1) &&
                <Entypo name="folder-video" size={36} color="black" />
            }
            {(icon === 2) &&
                <Entypo name="folder-music" size={36} color="black" />
            }
            {(icon === 3) &&
                <Entypo name="stopwatch" size={36} color="black" />
            }
            <View>
                <Text style={styles.buttonText}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        borderBottomWidth: 4,
        borderRightWidth: 0.2,
        borderLeftWidth: 0.2,
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderColor: colors.blue_custom,
        alignItems: 'center',
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
        width: '90%',
        height: 150,
    },
    buttonText: {
        marginTop: 10,
        fontSize: 20,
        color: '#000',
        fontFamily: fonts.heading,
        textAlign: 'center',
    }
})