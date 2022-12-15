import React, { useEffect, useState } from 'react'
import { Alert, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import { BackButton } from '../../components/BackButton'
import { RefreshControl, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome5, FontAwesome, AntDesign, Entypo } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function Cronometro() {
    const navigation = useNavigation()
    
    const [initialSecondTime, setInitialSecondTime] = useState(0)
    const [initialMinuteTime, setInitialMinuteTime] = useState(0)
    const [endTime, setEndTime] = useState(false)
    const [seconds, setSeconds] = useState(initialSecondTime)
    const [minutes, setMinutes] = useState(initialMinuteTime)
    const [customInterval, setCustomInterval] = useState<NodeJS.Timer>()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        clear()
    }, [endTime])
    
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

    const reset = () => {
        try {
            stopTimer()
            setSeconds(0)
            setMinutes(0)
            setInitialSecondTime(0)
            setInitialMinuteTime(0)
            storeData(0, 'Minutos')
            storeData(0, 'Segundos')
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

    const changeInitialTime = (field: string, operation: string) => {
        try{
            clear()

            if (operation === 'Mais') {
                if (field === 'Second') {
                    setInitialSecondTime((prevState) => {
                        if (prevState + 10 === 60) {
                            setSeconds(0)
                            storeData(0, 'Segundos')
                            return 0
                        }
                        setSeconds(prevState + 10)
                        storeData(prevState + 10, 'Segundos')

                        return prevState + 10
                    })
                } else {
                    setInitialMinuteTime((prevState) => {
                        if (prevState + 1 === 60) {
                            setMinutes(0)
                            storeData(0, 'Minutos')
                            return 0
                        }

                        setMinutes(prevState + 1)
                        storeData(prevState + 1, 'Minutos')

                        return prevState + 1
                    })
                }
            } else {
                if (field === 'Second') {
                    setInitialSecondTime((prevState) => {
                        if (prevState - 10 === -10) {
                            setSeconds(50)
                            storeData(50, 'Segundos')
                            return 50
                        }
                        setSeconds(prevState - 10)
                        storeData(prevState - 10, 'Segundos')

                        return prevState - 10
                    })
                } else {
                    setInitialMinuteTime((prevState) => {
                        if (prevState - 1 === -1) {
                            setMinutes(59)
                            storeData(59, 'Minutos')
                            return 59
                        }

                        setMinutes(prevState - 1)
                        storeData(prevState - 1, 'Minutos')

                        return prevState - 1
                    })
                }
            }
        } catch (e) {
            console.log(e)
        }
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

    const storeData = async (value: number, field: string) => {
        try {
            if(field === 'Minutos') {
                await AsyncStorage.setItem('minutos', value.toString())
            } else {
                await AsyncStorage.setItem('segundos', value.toString())
            }
        } catch (e) {
            console.log(e)
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
                        <Text style={styles.title}>Cronômetro</Text>
                    </View>
                </View>
            </View>
            <View style={styles.initialTimeContainer}>
                <View>
                    <TouchableOpacity style={{marginRight: 20}} onPress={() => changeInitialTime('Minute', 'Menos')}>
                    <Entypo name="circle-with-minus" size={32} color="black" />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{marginRight: 40}} onPress={() => changeInitialTime('Minute', 'Mais')}>
                        <Entypo name="circle-with-plus" size={32} color="black" />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{marginLeft: 40}} onPress={() => changeInitialTime('Second', 'Menos')}>
                    <Entypo name="circle-with-minus" size={32} color="black" />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{marginLeft: 20}} onPress={() => changeInitialTime('Second', 'Mais')}>
                        <Entypo name="circle-with-plus" size={32} color="black" />
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
                    <AntDesign name="play" size={62} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => stopTimer()}>
                    <FontAwesome name="stop-circle" size={74} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => reset()}>
                    <Entypo name="back-in-time" size={70} color="black" />
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