/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useCallback } from 'react'
import {
  View,
  Text,
  // Pressable,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

type props = {
  onReload: any
  message: string
}

const ErrorPage: React.FC<props> = ({ onReload, message }) => {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    onReload()
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing])

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          progressBackgroundColor={'#fff'}
          colors={['#5A2E98']}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/logo-text.png')}
        />
        <View style={styles.textWrapper}>
          <Icon name="ios-alert" size={30} color="#fff" />
          <Text style={styles.text}>{message || 'there something error'}</Text>
        </View>
        <Text style={styles.bottomText}>pull down to refresh</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E0E0E',
  },
  text: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    textTransform: 'lowercase',
    fontWeight: '400',
  },
  image: {
    // opacity: 0.5,
    height: 50,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ede9f2',
    paddingHorizontal: 10,
    paddingVertical: 8,
    // borderColor: '#8057ba',
    // borderWidth: 1,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bottomText: {
    marginTop: 20,
    color: '#fff',
  },
  textWrapper: {
    display: 'flex',
    paddingHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
  },
})

export default ErrorPage
