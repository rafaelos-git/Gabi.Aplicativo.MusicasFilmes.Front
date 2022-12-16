import React from 'react'
import { StyleSheet, Text, TouchableOpacityProps, View } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

interface FilmeModelProps extends TouchableOpacityProps {
    id: number,
    nome: string,
    editItem: Function,
    deleteItem: Function
}

export function FilmeModel({id, nome, editItem, deleteItem, ...rest}: FilmeModelProps) {
    const navigation = useNavigation()
    
    return (
        <View style={styles.bar}>
            <View style={styles.internBar}>
                <View style={styles.infoBar}>
                    <View style={styles.dataBar}>
                        <View style={styles.titleBar}>
                            <Text style={styles.info}>
                                {nome}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.editBar}>
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => editItem()}>
                        <FontAwesome name="edit" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteItem()}>
                        <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
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
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    editBar: {
        flexDirection: 'row',
        height: 50,
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleBar: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: 14,
        fontFamily: fonts.text,
        textAlign: 'center',
        height: 45,
        width: '90%',
        marginLeft: 5,
    },
})