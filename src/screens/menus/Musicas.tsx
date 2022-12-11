import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

export function Musicas (){
    const navigation = useNavigation()

    function selectScreen(screen: string) {
        if (screen === 'Buy')
            navigation.navigate('Buy' as never)
        else if (screen === 'PaySupplier')
            navigation.navigate('PaySupplier' as never)
        else if (screen === 'Antecipation')
            navigation.navigate('Antecipation' as never)
        else if (screen === 'PurchaseReport')
            navigation.navigate('PurchaseReport' as never)
        else if (screen === 'Back')
            navigation.navigate('Home' as never)
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <View style={styles.titleBar}>
                    <View style={styles.back}>
                        <BackButton back='Home' color='branco' />
                    </View>
                    <View style={styles.titlePosition}>
                        <Text style={styles.title}>Compras</Text>
                    </View>
                </View>
            </View>
            <View style={styles.menuBar}>
                <View style={styles.menu}>
                    <Button title='Comprar' icon={1} onPress={() => selectScreen('Buy')}/>
                    <Button title='Antecipação' icon={1} onPress={() => selectScreen('Antecipation')}/>
                </View>
                <View style={styles.menu}>
                    <Button title='Pagar Fornecedor' icon={3} onPress={() => selectScreen('PaySupplier')}/>
                    <Button title='Relatório de Compras' icon={5} onPress={() => selectScreen('PurchaseReport')}/>
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