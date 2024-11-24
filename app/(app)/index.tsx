import React from 'react'
import { ThemedView } from '@/components/elements/ThemedView'
import MainHeader from '@/components/headers/MainHeader';
import { ThemedText } from '@/components/elements/ThemedText';

const home = () => {
    return (
        <ThemedView style={{padding:5}}>
            <MainHeader />
            <ThemedView>
                <ThemedText>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta sit quod laboriosam, non rerum voluptate ullam omnis totam. Est voluptatum quisquam dolorem? Facilis beatae officia magnam accusantium quod ab eveniet?
                </ThemedText>
            </ThemedView>
        </ThemedView>
    )
}

export default home