import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

export function Filmes (){
    const navigation = useNavigation()

    

    function selectScreen(screen: string) {
        if(screen === 'ListaFilmes') {
            navigation.navigate('ListaFilmes' as never)
        }
        else if (screen === 'Back')
            navigation.navigate('Home' as never)
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <View style={styles.titleBar}>
                    <View style={styles.back}>
                        <BackButton back='Home' color='branco'/>
                    </View>
                    <View style={styles.titlePosition}>
                        <Text style={styles.title}>Filmes</Text>
                    </View>
                </View>
            </View>
            <View style={styles.menuBar}>
                <View style={styles.menu}>
                    <Button title='Adicionar Filme' icon={1} onPress={() => selectScreen('')}/>
                </View>
                <View style={styles.menu}>
                    {/* <Button title='Despesas' icon={3} onPress={() => selectScreen('Expenses')}/> */}
                    <Button title='Lista de Filmes' icon={1} onPress={() => selectScreen('ListaFilmes')}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    background: {
        flex: 3,
        backgroundColor: colors.blue_custom,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    title: {
        color: colors.white,
        fontSize: 32,
        fontFamily: fonts.heading,
        textAlign: 'center',
        marginBottom: (Platform.OS === 'android') ? 20 : 28,
    },
    titleBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    menuBar: {
        flex: 7,
        flexDirection: 'row',
    },
    menu: {
        flex: 1,
        marginTop: 30,
    },
    back: {
        color: colors.white,
        marginBottom: 30,
        marginLeft: 30
    },
    titlePosition: {
        flex: 0.8
    }
})