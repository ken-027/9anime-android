/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import { useRef, useEffect, useState } from 'react'
import { WebView } from 'react-native-webview'
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  BackHandler,
  Image,
} from 'react-native'
import Navigation from '../components/navigation'
import Icon from 'react-native-vector-icons/Ionicons'

type props = {
  setError: any
}

const Loading = () => {
  return (
    <View style={styles.loading}>
      <Image
        style={styles.loadingImage}
        source={require('../assets/logo-text.png')}
      />
      <View style={styles.loadingWrapper}>
        <Icon name="ios-rocket" size={30} color="#fff" />
        <Text style={styles.loadingText}>Loading</Text>
      </View>
    </View>
  )
}

const Home: React.FC<props> = ({ setError }) => {
  const [canBack, setcanBack] = useState<boolean>(true)
  const [canForward, setcanForward] = useState<boolean>(false)
  let lastBackButtonPress: any = null
  const webRef = useRef<any>()

  useEffect(() => {
    // webRef.current.injectJavaScript("window.alert('welcome to 9anime')")
    BackHandler.addEventListener('hardwareBackPress', backHandler)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const backHandler = () => {
    const currentTime = new Date().getTime()

    if (lastBackButtonPress && currentTime - lastBackButtonPress < 2000) {
      BackHandler.exitApp()
      return true
    }

    lastBackButtonPress = currentTime
    ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT)
    return true
  }

  const navStateChange = (navState) => {
    setcanBack(navState.canGoBack)
    setcanForward(navState.canGoForward)
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

  return (
    <View style={styles.container}>
      <WebView
        pullToRefreshEnabled
        ref={webRef}
        containerStyle={styles.webview}
        onError={(err) => setError(err)}
        // renderError={false}
        startInLoadingState
        renderLoading={() => <Loading />}
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        allowsBackForwardNavigationGestures
        source={{ uri: 'https://9animetv.to/' }}
        onNavigationStateChange={navStateChange}
        useWebView2
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
            toast("Can't go back")
          }
        }}
        onForward={() => {
          if (canForward) {
            webRef.current.goForward()
          } else {
            toast("Cant't go forward")
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
  loading: {
    backgroundColor: '#0E0E0E',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  loadingImage: {
    height: 50,
    resizeMode: 'contain',
  },
  loadingWrapper: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
})

export default Home
