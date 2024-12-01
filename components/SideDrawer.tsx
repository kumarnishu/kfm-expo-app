import { UserContext } from '@/contexts/UserContext';
import { Logout } from '@/services/UserServices';
import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Modal, ScrollView, StyleSheet } from 'react-native';
import { Button, Divider, Drawer, Icon, MD3Colors } from 'react-native-paper';
import { BackendError } from '..';


type Props = {
    visible: boolean,
    handleClose: () => void,
    position: "right" | "left",
}


const SideDrawer = ({ visible, handleClose, position }: Props) => {
    const [active, setActive] = React.useState('');
    const { user, setUser } = useContext(UserContext)
    const [error, setError] = useState<BackendError>()
    return (
        <Modal
            animationType="fade"
            transparent={visible ? visible : false}
            visible={visible}
            onRequestClose={handleClose}>
            <ScrollView contentContainerStyle={position === "right" ? styles.rightDrawer : styles.leftDrawer}>
                <Drawer.Item
                    label="Home"
                    icon="home"
                    active={active === 'home'}
                    onPress={() => {
                        setActive('home')
                        handleClose()
                        router.push("/")
                    }}
                />
                <Drawer.Item
                    label="Explore"
                    icon="store"
                    active={active === 'explore'}
                    onPress={() => {
                        setActive('explore')
                        handleClose()
                        router.push("/main/explore")
                    }}
                />
                <Drawer.Item
                    label="Products"
                    icon="microwave"
                    active={active === 'products'}
                    onPress={() => {
                        setActive('products')
                        handleClose()
                        router.push("/main/products")
                    }}
                />

                <Divider />

                <Drawer.Item
                    label="Logout"
                    icon={() => <Icon
                        source="logout"
                        size={25}
                    />}
                    active={active === 'logout'}
                    onPress={async () => {
                        await Logout().then(() => {
                            setUser(undefined)
                            handleClose()
                            router.replace("/login")
                        }).catch((err) => setError(err))
                    }}
                />



            </ScrollView>
        </Modal >

    );
};

const styles = StyleSheet.create({
    rightDrawer: {
        paddingTop:60,
        marginLeft: 100,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
        height: '100%',
    },
    leftDrawer: {
        paddingTop: 60,
        marginRight: 100,
        backgroundColor: 'white',
        flex: 1,
        height: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    }
});

export default SideDrawer;