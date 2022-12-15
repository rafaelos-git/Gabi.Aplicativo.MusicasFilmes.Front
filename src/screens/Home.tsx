import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Button } from '../components/Button'
import imbraxLogo from '../assets/logo.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Home (){
    const navigation = useNavigation()
    const route = useRoute()

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Início</Text>
                </View>
            </View>
            <View style={styles.menuBar}>
                <View style={styles.menu}>
                    <Button title='Filmes' icon={1} onPress={() => navigation.navigate('Filmes' as never)}/>
                    <Button title='Cronometro' icon={3} onPress={() => navigation.navigate('Cronometro' as never)}/>
                </View>
                <View style={styles.menu}>
                    <Button title='Musicas' icon={2} onPress={() => navigation.navigate('Musicas' as never)}/>
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
        alignItems:'center'
    },
    logo: {
        flex: 2,
        justifyContent: 'center'
    },
    image: {
        marginTop: 40,
        width: 250,
        height: 250,
    },
    title: {
        color: colors.white,
        fontSize: 38,
        fontFamily: fonts.heading,
        textAlign: 'center',
        marginBottom: 10,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    menuBar: {
        flex: 7,
        flexDirection: 'row',
    },
    menu: {
        flex: 1,
        marginTop: 30,
    }
})