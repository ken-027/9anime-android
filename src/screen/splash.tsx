/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import { View, Text, StyleSheet, Image, Linking } from 'react-native'

const Splash: React.FC<unknown> = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/logo-text.png')}
        alt="Logo"
      />
      <Text style={styles.text}>Your Anime Videos</Text>
      <View style={styles.creditText}>
        <Text style={styles.poweredBy}>
          Powered by:{' '}
          <Text
            onPress={() => Linking.openURL('https://9animetv.to/')}
            style={styles.poweredValue}>
            9animetv.to
          </Text>
        </Text>
        <Text style={[styles.poweredBy, styles.small]}>
          created by: <Text style={styles.poweredValue}>@ken</Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E0E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 10,
    color: '#fff',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 30,
  },
  creditText: {
    position: 'absolute',
    bottom: 16,
    alignItems: 'center',
  },
  poweredBy: {
    fontSize: 16,
    color: '#fff',
    fontFamily: '',
  },
  small: {
    fontSize: 12,
    marginTop: 3,
  },
  poweredValue: {
    color: '#b99de0',
    fontWeight: 'bold',
  },
})

export default Splash
