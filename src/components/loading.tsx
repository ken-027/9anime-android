/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { View, Image, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const Loading: React.FC<unknown> = () => {
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

const styles = StyleSheet.create({
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
    // fontWeight: 'bold',
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

export default Loading