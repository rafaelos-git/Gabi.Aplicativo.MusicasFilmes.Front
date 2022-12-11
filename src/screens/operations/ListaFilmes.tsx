import { useNavigation, useRoute } from '@react-navigation/native'
import React, { SetStateAction, useEffect, useState } from 'react'
import { Alert, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import { BackButton } from '../../components/BackButton'
import { FilmeModel } from '../../components/FilmeModel'

export function ListaFilmes (){
    const navigation = useNavigation()
    const route = useRoute()

    const [filmes, setFilmes] = useState<string[]>([])
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [novoFilme, setNovoFilme] = useState<string>()

    useEffect(() => {
        getFilmes()
    }, [])

    const getFilmes = async () => {
        try {
            
            const jsonValue = await AsyncStorage.getItem('filmes')

            const parseJasonValue = JSON.parse(jsonValue as string)

            let values: string[] = []

            parseJasonValue.map((item: string, index: any) => {
                values.push(item)
            })

            setFilmes(values)
        } catch(e) {
          // error reading value
        }
    }

    const storeFilmes = async (value: any) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('filmes', jsonValue)
            Alert.alert('Sucesso!', 'Filme cadastrado com sucesso!')
        } catch (e) {
            Alert.alert('Erro!', 'Não foi possível cadastrar o filme!')
        }
    }

    const onCancel = () => {
        setShowFilterModal(!showFilterModal)
    }

    const onConfirm = () => {
        let value: string [] = filmes

        value.push(novoFilme as string)
        storeFilmes(value)

        navigation.navigate('Home' as never)
    }

    const showFilter = () => {
        setShowFilterModal(!showFilterModal)
    }

    return(
        <SafeAreaView style={styles.container}>
            <Modal transparent={true} visible={showFilterModal} animationType='slide' onRequestClose={onCancel}>
                <TouchableWithoutFeedback onPress={onCancel}>
                    <View style={styles.filterModalBackground}>

                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.filterModalContainer}>
                    <View style={styles.filterModalTitleBar}>
                        <Text style={styles.filterModalTitle}>
                            Adicionar Filme
                        </Text>
                    </View>
                    <View style={styles.filterModalDataBar}>
                        <TextInput 
                            style={styles.inputName}
                            onChangeText={value => setNovoFilme(value)}
                            value={novoFilme}
                            placeholder='Digite o nome do filme'
                        /> 
                    </View>
                    <View style={styles.filterModalButtonBar}>
                        <TouchableOpacity style={styles.filterModalButton} onPress={onCancel}>
                            <Text style={styles.filterModalButtonText}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filterModalButton} onPress={onConfirm}>
                            <Text style={styles.filterModalButtonText}>
                                Confirmar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={onCancel}>
                    <View style={styles.filterModalBackground}>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <View style={styles.background}>
                <View style={styles.titleBar}>
                    <View style={styles.back}>
                        <BackButton back='Home' color='branco'/>
                    </View>
                    <View style={styles.titlePosition}>
                        <Text style={styles.title}>Lista de {'\n'} Filmes</Text>
                    </View>
                </View>
            </View>
            <View style={styles.filterBar}>
                <TouchableOpacity style={{marginLeft: 40}}>
                    <Text style={styles.removeFilter} onPress={showFilter}>
                        Adicionar Filme
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.menuBar}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    { 
                        filmes.map((item, index) => {
                            return(
                                <FilmeModel id={index} nome={item as any}/>
                            )
                        })

                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    background: {
        flex: 2,
        backgroundColor: colors.blue_custom,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    textInput: {
        fontFamily:fonts.text,
        fontSize: 12,
        marginLeft: 20,
        marginRight: 50,
        width: '32%',
        // borderWidth: 1,
    },
    title: {
        color: colors.white,
        fontSize: 27,
        fontFamily: fonts.heading,
        textAlign: 'center',
        marginBottom: 15,
    },
    titleBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    filterBar: {
        marginTop: 10,
        flex: 0.5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    companyFilterBar: {
        marginTop: 10,
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickerBar: {
        backgroundColor: colors.blue_custom,
        borderWidth: 1,
        flexDirection: 'row',
        width: '82%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    menuBar: {
        flex: 5,
        marginLeft: 35,
        marginTop: 30,
    },
    resumeBar: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    menu: {
        flex: 1,
        marginTop: 30,
    },
    search: {
        color: colors.white,
        marginBottom: 35,
        marginLeft: 10,
        marginRight: 30,
    },
    picker: {
        height: 50, 
        width: '100%',
        color: colors.white,
    },
    filterMonth: {
        height: 50, 
        width: '100%',
        color: colors.blue_custom,
    },
    iosPicker: {
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.blue_custom,
        height: 50,
        width: '100%',
    },
    textIosPicker: {
        fontFamily:fonts.text,
        fontSize: 12,
        color: colors.white,
    },
    back: {
        color: colors.white,
        marginBottom: 35,
        marginLeft: 30
    },
    titlePosition: {
        flex: 0.8
    },
    removeFilter: {
        fontFamily: fonts.text,
        fontSize: 16,
    },
    filterModalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    filterModalContainer: {
        flex: 3,
        backgroundColor: colors.white,
    },
    filterModalTitleBar: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
    },
    filterModalSelectionBar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    filterModalButtonBar: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    filterModalDataBar: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterModalDateBar: {
        borderWidth: 1,
        borderColor: colors.blue_custom,
        flexDirection: 'row',
        width: '82%',
        borderRadius: 12,
        alignItems: 'center',
        // justifyContent: 'center',
        height: 40,
    },
    filterModalTitle: {
        color: colors.blue_custom,
        fontSize: 27,
        fontFamily: fonts.heading,
        textAlign: 'center',
    },
    filterModalButton: {
        flex: 1,
        alignItems: 'center',
    },
    filterModalButtonText: {
        color: colors.blue_custom,
        fontFamily: fonts.text,
        fontSize: 16,
    },
    filterModalTextIosPicker: {
        fontFamily:fonts.text,
        fontSize: 12,
        color: colors.blue_custom,
    },
    filterModalIosPicker: {
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.white,
        height: 50,
        width: '100%',
    },
    inputName: {
        color: '#000',
        borderWidth: 1,
        borderRadius: 10,
        width: '80%',
        fontSize: 12,
        padding: 5,
        alignItems: 'flex-end',
        height: 50,
    },
})