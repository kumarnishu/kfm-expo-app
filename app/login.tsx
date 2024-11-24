import React from 'react'
import { ThemedView } from '@/components/elements/ThemedView'
import { ThemedText } from '@/components/elements/ThemedText'
import { Button } from 'react-native'
import {  useRouter } from 'expo-router'

const login = () => {
    const router=useRouter()
    return (
        <ThemedView>
            <ThemedText>Login page</ThemedText>
        </ThemedView>
    )
}

export default login