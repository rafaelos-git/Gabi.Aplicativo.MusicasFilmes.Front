import React from 'react'
import { StyleSheet, Text, TouchableOpacityProps, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

interface ReportBarAntecipationProps extends TouchableOpacityProps {
    id: number,
    nome: string,
}

export function FilmeModel({id, nome, ...rest}: ReportBarAntecipationProps) {
    const navigation = useNavigation()
    
    return (
        <View style={styles.bar}>
            <View style={styles.internBar}>
                <View style={styles.infoBar}>
                    {/* <View style={styles.dataBar}>
                        <View style={styles.titleBar}>
                            <View style={styles.backgroundPosition}>
                                <Text style={styles.titleInfo}>
                                    NOME DO FILME
                                </Text>
                            </View>
                        </View>
                    </View> */}
                    <View style={styles.dataBar}>
                        <View style={styles.titleBar}>
                            <View style={styles.backgroundPosition}>
                                <Text style={styles.info}>
                                    {nome}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        borderColor: colors.blue_custom,
        marginBottom: 30,
        width: '90%',
        height: 50,
        borderWidth: 1.2,
        borderRadius: 10,
    },
    internBar: {
        flexDirection: 'row',
    },
    infoBar: {
        width: '100%',
    },
    background: {
        backgroundColor: colors.blue_custom,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        height: 50,
        width: '100%',
    },
    dataBar: {
        height: 50,
        width: '100%',
    },
    editBar: {
        height: 100,
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    titlePosition: {
        flex: 0.4,
    },
    datePosition: {
        flex: 0.6,
        marginBottom: 5,
        alignItems: 'center',
    },
    backgroundPosition: {
        flex: 1,
    },
    title: {
        color: colors.white,
        fontSize: 14,
        fontFamily: fonts.text,
        textAlign: 'center',
    },
    date: {
        color: colors.white,
        fontSize: 14,
        fontFamily: fonts.text,
        textAlign: 'center',
    },
    titleInfo: {
        color: '#000',
        fontSize: 20,
        fontFamily: fonts.text,
        textAlign: 'center',
        marginBottom: 10,
    },
    info: {
        color: '#000',
        fontSize: 16,
        fontFamily: fonts.text,
        textAlign: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        // marginBottom: 10,
        // marginLeft: 5,
    },
})