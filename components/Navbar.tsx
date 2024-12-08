import { View, Image, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { toTitleCase } from '@/utils/toTitleCase'
import { Button, IconButton, Text } from 'react-native-paper'
import { UserContext } from '@/contexts/UserContext';
import SideDrawer from './SideDrawer';
import { router } from 'expo-router';


const Navbar = () => {
    const { user } = useContext(UserContext)
    const [pos, setPos] = useState<'left' | 'right'>('left')
    const [showDrawer, setShowDrawer] = React.useState(false);

    return (
        <>
            <View style={style.navContainer}>
                <Button onPress={() => {
                    setShowDrawer(!showDrawer)
                    setPos('left')
                }}>
                    {user?.dp && user?.dp ? <Image source={{ uri: user?.dp }} style={style.picture} /> : <Text style={style.logotext}>{toTitleCase(user?.username.slice(0, 8) || "")}</Text>}
                </Button>

                <View style={style.iconView}>
                    <View>
                        <IconButton
                            icon="bell"
                            size={35}
                            iconColor='white'
                            onPress={() => router.push("/notifications")}
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
                        onPress={() => {
                            setShowDrawer(!showDrawer)
                            setPos('right')
                        }
                        }
                    />

                </View>
            </View>
            <SideDrawer visible={showDrawer} handleClose={() => setShowDrawer(!showDrawer)} position={pos} />

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
    logotext: {
        color: 'white',
        fontSize: 20,
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