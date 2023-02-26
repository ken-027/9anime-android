/* eslint-disable semi */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react'
// import type { PropsWithChildren } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import Home from './screen/home'
import Splash from './screen/splash'
import AsyncStorage from '@react-native-async-storage/async-storage'

const App = () => {
  const [showSplash, setshowSplash] = useState<boolean>(true)

  const checkStorage = async () => {
    const currentUrl = await AsyncStorage.getItem('currentUrl')

    if (!currentUrl) {
      await AsyncStorage.setItem('currentUrl', 'https://9animetv.to/home')
    }
  }

  useEffect(() => {
    setTimeout(() => setshowSplash(false), 3000)
    checkStorage()
  }, [showSplash])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#0E0E0E" barStyle="light-content" />
      {showSplash ? <Splash /> : <Home />}
    </SafeAreaView>
  )
}

export default App
