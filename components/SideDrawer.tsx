import { UserContext } from '@/contexts/UserContext';
import { Logout } from '@/services/UserServices';
import { Href, router } from 'expo-router';
import React, { useContext, useCallback } from 'react';
import { Modal, ScrollView, StyleSheet } from 'react-native';
import { Drawer, Icon } from 'react-native-paper';

type Props = {
    visible: boolean;
    handleClose: () => void;
    position: 'right' | 'left';
};

const SideDrawer = ({ visible, handleClose, position }: Props) => {
    const [active, setActive] = React.useState('');
    const {  setUser } = useContext(UserContext);

    // Use useCallback to memoize event handlers
    const navigateTo = useCallback(
        (route: Href, label: string) => {
            setActive(label);
            handleClose();
            router.push(route);
        },
        [handleClose]
    );

    const handleLogout = useCallback(async () => {
        try {
            await Logout();
            setUser(undefined);
            handleClose();
            router.replace('/login');
        } catch (err:any) {
            console.log(err);
        }
    }, [handleClose, setUser]);

    return (
        <Modal
            animationType="fade"
            transparent={visible}
            visible={visible}
            onRequestClose={handleClose}
        >
            <ScrollView
                contentContainerStyle={
                    position === 'right' ? styles.rightDrawer : styles.leftDrawer
                }
            >
                <Drawer.Item
                    label="Home"
                    icon="home"
                    active={active === 'home'}
                    onPress={() => navigateTo('/', 'home')}
                />
                <Drawer.Item
                    label="Explore"
                    icon="search"
                    active={active === 'explore'}
                    onPress={() => navigateTo('/explore', 'explore')}
                />
               
                <Drawer.Item
                    label="Logout"
                    icon={() => <Icon source="logout" size={25} />}
                    active={active === 'logout'}
                    onPress={handleLogout}
                />
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    rightDrawer: {
        paddingTop: 60,
        marginLeft: 100,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
});

export default SideDrawer;
