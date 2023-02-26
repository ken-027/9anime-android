/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
// cSpell:ignore setcan
import { useRef, useEffect, useState, useCallback } from 'react'
import { WebView } from 'react-native-webview'
import {
  View,
  StyleSheet,
  ToastAndroid,
  BackHandler,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native'
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
  const [onTop, setonTop] = useState<boolean>(true)
  const [error, setError] = useState<any>()
  let lastBackButtonPress: any = null
  const webRef = useRef<any>()

  useEffect(() => {
    getUrl()
  }, [currentUrl])

  useEffect(() => {
    // webRef.current.injectJavaScript("window.alert('welcome to 9anime')")
    BackHandler.addEventListener('hardwareBackPress', backHandler)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canBack])

  const onRefresh = useCallback(() => {
    webRef.current.reload()
  }, [])

  const getUrl = async () => {
    const url = (await AsyncStorage.getItem('currentUrl')) as string
    setcurrentUrl(url)
  }

  const urlStore = async (url: string) => {
    try {
      await AsyncStorage.setItem('currentUrl', url)
      setcurrentUrl(url)
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
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={false}
          enabled={onTop}
          onRefresh={onRefresh}
        />
      }
      contentContainerStyle={styles.container}>
      <View style={styles.titleBar}>
        <Image
          style={styles.headerLogo}
          source={require('../assets/logo-text.png')}
        />
        {/* <Text numberOfLines={1} ellipsizeMode="head" style={styles.barText}>
          Anime name
        </Text> */}
      </View>
      <WebView
        onScroll={(event) => {
          const { contentOffset } = event.nativeEvent
          if (contentOffset.y > 0) {
            setonTop(false)
          } else {
            setonTop(true)
          }
        }}
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
        onHome={async () => {
          const home = 'https://9animetv.to/home'
          await AsyncStorage.setItem('currentUrl', home)
          await getUrl()
        }}
      />
      {/* <Text style={styles.bottomText}>9anime</Text> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    paddingTop: 10,
    backgroundColor: '#0E0E0E',
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
  titleBar: {
    backgroundColor: '#0E0E0E',
  },
  barText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    paddingBottom: 15,
    fontWeight: 'bold',
  },
  headerLogo: {
    height: 30,
    width: 'auto',
    resizeMode: 'contain',
  },
})

export default Home
