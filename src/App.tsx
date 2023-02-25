/* eslint-disable semi */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react'
// import type { PropsWithChildren } from 'react'
import Home from './screen/home'
import Splash from './screen/splash'

const App = () => {
  const [showSplash, setshowSplash] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setshowSplash(false), 3000)
  }, [showSplash])

  return <>{showSplash ? <Splash /> : <Home />}</>
}

export default App
