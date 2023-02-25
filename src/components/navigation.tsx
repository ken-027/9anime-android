/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

type props = {
  onBack: any
  onHome: any
  onForward: any
}

const Navigation: React.FC<props> = ({ onBack, onHome, onForward }) => {
  return (
    <View style={styles.container}>
      <Icon
        style={styles.button}
        name="ios-chevron-back"
        size={28}
        color={'#fff'}
        onPress={onBack}
      />
      <Icon
        style={styles.button}
        name="ios-planet-outline"
        size={28}
        color={'#fff'}
        onPress={onHome}
      />
      <Icon
        style={styles.button}
        name="ios-chevron-forward"
        size={28}
        color={'#fff'}
        onPress={onForward}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#5A2E98',
    padding: 8,
  },
  button: {
    paddingHorizontal: 10,
    borderRadius: 10,
    // backgroundColor: '#fff',
  },
})

export default Navigation
