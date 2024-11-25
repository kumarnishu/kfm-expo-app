import React, { useContext } from 'react';
import { ThemedView } from '@/components/elements/ThemedView';
import MainHeader from '@/components/headers/MainHeader';
import { ThemedText } from '@/components/elements/ThemedText';
import { ThemedButton } from '@/components/elements/ThemedButton';
import { UserContext } from '@/contexts/UserContext';

const Home = () => {
    const { user } = useContext(UserContext);

    console.log('Current user:', user);

    if (!user) {
        return (
            <ThemedView>
                <ThemedText darkColor="gray" lightColor="gray">
                    Loading user...
                </ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView>
            <MainHeader />
            <ThemedView>
                <ThemedText type="title">{user.username || 'Not found'}</ThemedText>
            </ThemedView>
            <ThemedButton label="logout" type="default" />
        </ThemedView>
    );
};

export default Home;
