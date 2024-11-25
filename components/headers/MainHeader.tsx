import { Pressable, Image, Text, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '@/contexts/UserContext';
import { BackendError } from '@/index';
import { Logout } from '@/services/UserServices';
import { ThemedView } from '../elements/ThemedView';
import { ThemedText } from '../elements/ThemedText';
import { ThemedButton } from '../elements/ThemedButton';

const MainHeader = () => {
  const { user } = useContext(UserContext)
  const { setUser } = useContext(UserContext)
  const [error, setError] = useState<BackendError>()
  if (error)
    alert(error.response.data.message)
  return (
    <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, height: 50 }}>
      {user?.dp && user?.dp ? <Image source={{ uri: user?.dp }} style={style.picture} /> : <ThemedText>{user?.username.slice(0, 8).toUpperCase()}</ThemedText>}

      <MaterialIcons onPress={async () => {
        await Logout().then(() => {
          setUser(undefined)
        }).catch((err) => setError(err))
      }} name="notification-important" size={30} />
    </ThemedView>
  )
}
const style = StyleSheet.create({
  picture: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2
  },
  text: {
    color: 'white',
    fontSize: 30,
    paddingLeft: 10,
    fontWeight: 'bold'
  }
})

export default MainHeader