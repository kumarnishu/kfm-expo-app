import React from 'react'
import { ThemedView } from '@/components/elements/ThemedView'
import MainHeader from '@/components/headers/MainHeader';
import { ThemedText } from '@/components/elements/ThemedText';
import { ThemedButton } from '@/components/elements/ThemedButton';

const home = () => {
    return (
        <ThemedView>
            <MainHeader />
            <ThemedView>
                <ThemedText darkColor='red' lightColor='blue'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta sit quod laboriosam, non rerum voluptate ullam omnis totam. Est voluptatum quisquam dolorem? Facilis beatae officia magnam accusantium quod ab eveniet?
                </ThemedText>
            </ThemedView>
            <ThemedButton label='logout' type='default'/>
        </ThemedView>
    )
}

export default home