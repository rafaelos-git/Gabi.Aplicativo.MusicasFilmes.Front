import React, { useEffect, useState } from 'react'
import { Alert, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import { BackButton } from '../../components/BackButton'
import { RefreshControl, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome5, FontAwesome, AntDesign, Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function IniciarMusica() {
    const navigation = useNavigation()
    
    const [initialSecondTime, setInitialSecondTime] = useState(0)
    const [initialMinuteTime, setInitialMinuteTime] = useState(0)
    const [endTime, setEndTime] = useState(false)
    const [seconds, setSeconds] = useState(initialSecondTime)
    const [minutes, setMinutes] = useState(initialMinuteTime)
    const [customInterval, setCustomInterval] = useState<NodeJS.Timer>()
    const [musica, setMusica] = useState<string>('')

    useEffect(() => {
        getData()
        selectMusic()
    }, [])

    useEffect(() => {
        skip()
        setEndTime(false)
    }, [endTime])

    const selectMusic = async () => {
        try {
            
            const jsonValue = await AsyncStorage.getItem('musicas')

            const parseJasonValue = JSON.parse(jsonValue as string)

            let values: string[] = []

            parseJasonValue.map((item: string, index: any) => {
                values.push(item)
            })

            setMusica(values[Math.floor(Math.random() * values.length)])
        } catch(e) {
          // error reading value
        }
    }
    
    const startTimer = () => {
        try {
            setCustomInterval(
                setInterval(() => {
                    changeTime()
                }, 1000)
            )
        } catch(e) {
            console.log(e)
        }
    }

    const stopTimer = () => {
        try {
            if (customInterval) {
                clearInterval(customInterval)
            }
        } catch(e) {
            console.log(e)
        }
    }

    const clear = () => {
        try {
            stopTimer()
            setSeconds(initialSecondTime)
            setMinutes(initialMinuteTime)
        } catch(e) {
            console.log(e)
        }
    }

    const changeTime = () => {
        try{
            let min = false

            setSeconds((prevState) => {
                if (prevState - 1 === -1) {
                    setMinutes((prevMin) => {
                        if (prevMin - 1 === -1) {
                            min = true

                            setEndTime((prevEndTime) => {
                                Alert.alert('Fim do tempo!', 'O seu tempo acabou!')
                                return true
                            })

                            return 0
                        }
                        return prevMin - 1
                    })

                    if (!min) {
                        return 59
                    } else {
                        return 0
                    }
                }
                return prevState - 1
            })
        } catch(e) {
            console.log(e)
        }
    }

    const skip = () => {
        clear()
        selectMusic()
    }

    const getData = async () => {
        try {
            const min = await AsyncStorage.getItem('minutos')
            const sec = await AsyncStorage.getItem('segundos')

            if(min !== null) {
               setMinutes(parseInt(min))
               setInitialMinuteTime(parseInt(min))
            }

            if(sec !== null) {
                setSeconds(parseInt(sec))
                setInitialSecondTime(parseInt(sec))
            }
        } catch(e) {
          // error reading value
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <View style={styles.titleBar}>
                    <View style={styles.back}>
                        <BackButton back='Back' color='branco'/>
                    </View>
                    <View style={styles.titlePosition}>
                        <Text style={styles.title}>Mimicando {'\n'} Musicas</Text>
                    </View>
                </View>
            </View>
            <View style={styles.filmeContainer}>
                <Text style={styles.textMusica}>
                    {musica}
                </Text>
            </View>
            <View style={styles.menuBar}>
                <Text style={styles.textTimer}>
                    {minutes < 10 ? '0' + minutes : minutes}:
                    {seconds < 10 ? '0' + seconds : seconds}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => startTimer()}>
                    <AntDesign name="play" size={52} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => stopTimer()}>
                    <FontAwesome name="stop-circle" size={64} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => skip()}>
                    <MaterialCommunityIcons name="skip-next-circle" size={64} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => clear()}>
                    <Feather name="repeat" size={52} color="black" />
                </TouchableOpacity>
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
    menuBar: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
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
    back: {
        color: colors.white,
        marginBottom: 30,
        marginLeft: 30
    },
    titlePosition: {
        flex: 0.8
    },
    textTimer: {
        fontFamily: fonts.heading,
        fontSize: 100
    },
    buttonContainer: {
        flex: 2,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 30
    },
    filmeContainer: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    textMusica: {
        fontFamily: fonts.heading,
        fontSize: 24,
        textAlign: 'center'
    }
})