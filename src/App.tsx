/* eslint-disable semi */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react'
// import type { PropsWithChildren } from 'react'
import ErrorPage from './screen/errorPage'
import Home from './screen/home'

const App = () => {
  const [error, setError] = useState<any>()

  useEffect(() => {}, [error])

  const onReload = () => {
    setError(null)
  }

  return (
    <>
      {error ? (
        <ErrorPage message={error?.nativeEvent.title} onReload={onReload} />
      ) : (
        <Home setError={setError} />
      )}
    </>
  )
}

export default App
