import { View, Platform, Image, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Button, Divider, Text } from 'react-native-paper'
import { Menu } from 'react-native-paper';
import { Logout } from '@/services/UserServices';
import { BackendError } from '@/index';
import { UserContext } from '@/contexts/UserContext';
import { router } from 'expo-router';
import { toTitleCase } from '@/utils/toTitleCase';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';


const index = () => {
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = useState<BackendError>()
  const { user, setUser } = useContext(UserContext)
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 65, borderBottomWidth: 1, backgroundColor: 'red' }}>
        {user?.dp && user?.dp ? <Image source={{ uri: user?.dp }} style={style.picture} /> : <Text style={style.text}>{toTitleCase(user?.username.slice(0, 8) || "")}</Text>}
        <Menu
          anchorPosition='bottom'
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon={MORE_ICON} color='white' onPress={() => { setVisible(!visible) }} />}>

          <Menu.Item onPress={() => { }} title="Profile" />
          <Menu.Item onPress={() => { }} title="Settings" />
          <Divider />
          <Menu.Item onPress={() => { }} title="" />
          <Menu.Item onPress={async () => {
            await Logout().then(() => {
              setUser(undefined)
              router.replace("/login")
            }).catch((err) => setError(err))
          }}
            title={
              <Button mode='contained'           >
                Logout
              </Button>} />

        </Menu>
      </View>

    </SafeAreaView>
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
export default index