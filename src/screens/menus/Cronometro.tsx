import React, { useEffect, useState } from 'react'
import { Alert, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import { BackButton } from '../../components/BackButton'
import { RefreshControl, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome5, FontAwesome, AntDesign, Entypo } from '@expo/vector-icons'

export function Cronometro() {
    const navigation = useNavigation()
    
    const [initialSecondTime, setInitialSecondTime] = useState(0)
    const [initialMinuteTime, setInitialMinuteTime] = useState(0)
    const [endTime, setEndTime] = useState(false)
    const [seconds, setSeconds] = useState(initialSecondTime)
    const [minutes, setMinutes] = useState(initialMinuteTime)
    const [customInterval, setCustomInterval] = useState<NodeJS.Timer>()

    useEffect(() => {
        clear()
    }, [endTime])
    
    const startTimer = () => {
        setCustomInterval(
            setInterval(() => {
                changeTime()
            }, 1000)
        )
    }

    const stopTimer = () => {
        if (customInterval) {
            clearInterval(customInterval)
        }
    }

    const clear = () => {
        stopTimer()
        setSeconds(initialSecondTime)
        setMinutes(initialMinuteTime)
    }

    const changeTime = () => {
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
    }

    const changeInitialTime = (field: string) => {
        clear()

        if (field === 'Second') {
            setInitialSecondTime((prevState) => {
                if (prevState + 10 === 60) {
                    setSeconds(0)
                    return 0
                }
                setSeconds(prevState + 10)

                return prevState + 10
            })
        } else {
            
            setInitialMinuteTime((prevState) => {
                if (prevState + 1 === 60) {
                    setMinutes(0)
                    return 0
                }

                setMinutes(prevState + 1)

                return prevState + 1
            })
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <View style={styles.titleBar}>
                    <View style={styles.back}>
                        <BackButton back='Home' color='branco'/>
                    </View>
                    <View style={styles.titlePosition}>
                        <Text style={styles.title}>Cronômetro</Text>
                    </View>
                </View>
            </View>
            <View style={styles.initialTimeContainer}>
                <View>
                    <TouchableOpacity style={{marginRight: 40}} onPress={() => changeInitialTime('Minute')}>
                        <Entypo name="circle-with-plus" size={82} color="black" />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{marginLeft: 40}} onPress={() => changeInitialTime('Second')}>
                        <Entypo name="circle-with-plus" size={82} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.menuBar}>
                <Text style={styles.textTimer}>
                    {minutes < 10 ? '0' + minutes : minutes}:
                    {seconds < 10 ? '0' + seconds : seconds}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => startTimer()}>
                    <AntDesign name="play" size={82} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => stopTimer()}>
                    <FontAwesome name="stop-circle" size={94} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => clear()}>
                    <Entypo name="back-in-time" size={90} color="black" />
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
    initialTimeContainer: {
        flex: 2,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginTop: 20,
    }
})