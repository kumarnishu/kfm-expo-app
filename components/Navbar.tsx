import { View, Platform, Image, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { toTitleCase } from '@/utils/toTitleCase'
import { Appbar, Button, Divider, Text } from 'react-native-paper'
import { Menu } from 'react-native-paper';
import { Logout } from '@/services/UserServices';
import { BackendError } from '@/index';
import { UserContext } from '@/contexts/UserContext';
import { router } from 'expo-router';
import SideDrawer from './SideDrawer';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';


const Navbar = () => {
    const { user, setUser } = useContext(UserContext)
    const [error, setError] = useState<BackendError>()
    const [showMenu, setShowMenu] = React.useState(false);
    const [showDrawer, setShowDrawer] = React.useState(false);

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 65, borderBottomWidth: 1, backgroundColor: 'red' }}>
                <Button onPress={() => { setShowDrawer(!showDrawer) }}>
                    {user?.dp && user?.dp ? <Image source={{ uri: user?.dp }} style={style.picture} /> : <Text style={style.text}>{toTitleCase(user?.username.slice(0, 8) || "")}</Text>}
                </Button>
                <Menu
                    anchorPosition='bottom'
                    visible={showMenu}
                    onDismiss={() => setShowMenu(!showMenu)}
                    anchor={<Appbar.Action icon={MORE_ICON} color='white' onPress={() => { setShowMenu(!showMenu) }} />}>

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
                        title="Logout" />
                </Menu>
            </View>
            <SideDrawer visible={showDrawer} handleClose={() => setShowDrawer(!showDrawer)} position='left' />

        </>
    )
}

const style = StyleSheet.create({

    spaceBetween: {
        flex: 1, flexDirection: 'row', gap: 1, justifyContent: 'space-between', alignItems: 'center'
    },
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

export default Navbar