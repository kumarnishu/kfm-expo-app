import { router } from 'expo-router';
import React from 'react';
import { Modal, ScrollView, StyleSheet } from 'react-native';
import { Drawer } from 'react-native-paper';


type Props = {
    visible: boolean,
    handleClose: () => void,
    position: "right" | "left",
}


const SideDrawer = ({ visible, handleClose, position }: Props) => {
    const [active, setActive] = React.useState('');
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
                    label="Profile"
                    icon="account"
                    active={active === 'account'}
                    onPress={() => {
                        setActive('account')
                        handleClose()
                        router.push("/machines")
                    }}
                />
            </ScrollView>
        </Modal >

    );
};

const styles = StyleSheet.create({
    rightDrawer: {
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
    },
    leftDrawer: {
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