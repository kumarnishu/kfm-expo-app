import { View, Platform, Image, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { toTitleCase } from '@/utils/toTitleCase'
import { Appbar, Button, Divider, Icon, IconButton, MD3Colors, Text } from 'react-native-paper'
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

    const [showDrawer, setShowDrawer] = React.useState(false);

    return (
        <>
            <View style={style.navContainer}>
                <Button onPress={() => { setShowDrawer(!showDrawer) }}>
                    {user?.dp && user?.dp ? <Image source={{ uri: user?.dp }} style={style.picture} /> : <Text style={style.text}>{toTitleCase(user?.username.slice(0, 8) || "")}</Text>}
                </Button>

                <View style={style.iconView}>
                    <View>
                        <IconButton
                            icon="bell"
                            size={35}
                            iconColor='white'
                            onPress={() => console.log('Notification pressed')}
                        />
                        {1 > 0 && (
                            <View style={style.badge}>
                                <Text style={style.badgeText}>{1}</Text>
                            </View>
                        )}
                    </View>

                    <IconButton
                        icon="menu"
                        size={35}
                        iconColor='white'
                        onPress={() => setShowDrawer(!showDrawer)}
                    />

                </View>
            </View>
            <SideDrawer visible={showDrawer} handleClose={() => setShowDrawer(!showDrawer)} position='left' />

        </>
    )
}

const style = StyleSheet.create({

    navContainer: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 65, borderBottomWidth: 1, backgroundColor: 'red'
    },
    iconView: {
        flexDirection: 'row', justifyContent: 'space-between',
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
    },
    badge: {
        position: 'absolute',
        top: 10,
        right: 13,
        backgroundColor: 'yellow',
        borderRadius: 10,
        minWidth: 15,
        minHeight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    badgeText: {
        color: 'black',
        fontSize: 10,
        fontWeight: 'bold',
    },
})

export default Navbar