import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import colors from '../styles/colors'
import { Home } from '../screens/Home'
import { Musicas } from '../screens/menus/Musicas'
import { Filmes } from '../screens/menus/Filmes'
import { Cronometro } from '../screens/menus/Cronometro'
import { ListaFilmes } from '../screens/operations/ListaFilmes'
import { ListaMusicas } from '../screens/operations/ListaMusicas'
import { IniciarFilme } from '../screens/operations/IniciarFilme'
import { IniciarMusica } from '../screens/operations/IniciarMusica'

const stackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >
        <stackRoutes.Screen
            name="Home"
            component={Home}
        />
        <stackRoutes.Screen
            name="Musicas"
            component={Musicas}
        />
        <stackRoutes.Screen
            name="Filmes"
            component={Filmes}
        />
        <stackRoutes.Screen
            name="Cronometro"
            component={Cronometro}
        />
        <stackRoutes.Screen
            name="ListaFilmes"
            component={ListaFilmes}
        />
        <stackRoutes.Screen
            name="ListaMusicas"
            component={ListaMusicas}
        />
        <stackRoutes.Screen
            name="IniciarFilme"
            component={IniciarFilme}
        />
        <stackRoutes.Screen
            name="IniciarMusica"
            component={IniciarMusica}
        />
    </stackRoutes.Navigator>
)

export default AppRoutes