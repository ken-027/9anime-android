/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
// cSpell:ignore setcan
import { useRef, useEffect, useState } from 'react'
import { WebView } from 'react-native-webview'
import { View, StyleSheet, ToastAndroid, BackHandler } from 'react-native'
import Orientation from 'react-native-orientation-locker'
import AsyncStorage from '@react-native-async-storage/async-storage'

import KeepAwake from 'react-native-keep-awake'
import Navigation from '../components/navigation'
import ErrorPage from '../components/errorPage'
import Loading from '../components/loading'

type props = {
  // setError: any
}

const Home: React.FC<props> = () => {
  const [canBack, setcanBack] = useState<boolean>(true)
  const [currentUrl, setcurrentUrl] = useState<string>('')
  const [canForward, setcanForward] = useState<boolean>(false)
  const [error, setError] = useState<any>()
  let lastBackButtonPress: any = null
  const webRef = useRef<any>()

  useEffect(() => {
    getUrl()
  }, [])

  useEffect(() => {
    // webRef.current.injectJavaScript("window.alert('welcome to 9anime')")
    BackHandler.addEventListener('hardwareBackPress', backHandler)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canBack])

  const getUrl = async () => {
    const url = (await AsyncStorage.getItem('currentUrl')) as string
    setcurrentUrl(url)
  }

  const urlStore = async (url: string) => {
    try {
      await AsyncStorage.setItem('currentUrl', url)
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {}
  }

  const backHandler = () => {
    if (canBack) {
      webRef.current.goBack()
      return true
    }

    const currentTime = new Date().getTime()

    if (lastBackButtonPress && currentTime - lastBackButtonPress < 2000) {
      BackHandler.exitApp()
      return true
    }

    lastBackButtonPress = currentTime
    ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT)
    return true
  }

  const navStateChange = async (navState: any) => {
    setcanBack(navState.canGoBack)
    setcanForward(navState.canGoForward)

    await urlStore(navState.url)

    const isMediaPlaying =
      navState.title === 'Media playing' || navState.title === 'playing'

    if (isMediaPlaying) {
      Orientation.lockToLandscape()
      KeepAwake.activate()
    } else {
      Orientation.unlockAllOrientations()
      KeepAwake.deactivate()
    }
  }

  const toast = (title: string = '') => {
    ToastAndroid.showWithGravityAndOffset(
      title,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      120,
    )
  }

  // TODO: injection script for redirecting
  return (
    <View style={styles.container}>
      <WebView
        pullToRefreshEnabled
        ref={webRef}
        containerStyle={styles.webview}
        onError={(err) => setError(err)}
        startInLoadingState
        renderLoading={() => <Loading />}
        allowsFullscreenVideo
        // allowsInlineMediaPlayback
        allowsBackForwardNavigationGestures
        mediaPlaybackRequiresUserAction={false}
        source={{
          uri: currentUrl,
        }}
        onNavigationStateChange={navStateChange}
        useWebView2
        // contentMode="desktop"
        renderError={() => <ErrorPage message={error.nativeEvent.title} />}
        // onShouldStartLoadWithRequest={(request) => {
        //   console.log(request)
        //   return request.url.startsWith('https://9animetv.to/')
        // }}
      />
      <Navigation
        onBack={() => {
          if (canBack) {
            webRef.current.goBack()
          } else {
            toast('No back')
          }
        }}
        onForward={() => {
          if (canForward) {
            webRef.current.goForward()
          } else {
            toast('No next')
          }
        }}
        onHome={() => {
          webRef.current.reload()
        }}
      />
      {/* <Text style={styles.bottomText}>9anime</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    backgroundColor: '#5A2E98',
  },
  bottomText: {
    backgroundColor: '#5A2E98',
    textAlign: 'center',
    color: '#fff',
    padding: 5,
    fontWeight: 'bold',
    fontSize: 9,
  },
  errContainer: {
    flex: 1,
  },
})

export default Home
