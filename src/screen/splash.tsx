/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import { View, Text, StyleSheet, Image } from 'react-native'

const Splash: React.FC<unknown> = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/logo-text.png')}
        alt="Logo"
      />
      <Text style={styles.text}>Your Anime Videos</Text>
      <Text style={styles.creditText}>@ken</Text>
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
    color: '#b99de0',
    position: 'absolute',
    bottom: 16,
    fontSize: 16,
  },
})

export default Splash
