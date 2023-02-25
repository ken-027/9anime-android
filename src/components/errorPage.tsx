/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
// import { useState, useCallback } from 'react'
import {
  View,
  Text,
  // Pressable,
  StyleSheet,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

type props = {
  message: string
}

const ErrorPage: React.FC<props> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logo-text.png')} />
      <View style={styles.textWrapper}>
        <Icon name="ios-earth" size={30} color="#fff" />
        <Text style={styles.text}>{message || 'there something error'}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexBasis: '100%',
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
    alignItems: 'center',
    gap: 10,
  },
})

export default ErrorPage
