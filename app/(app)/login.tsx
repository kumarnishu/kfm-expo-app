import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { Button } from 'react-native'
import {  useRouter } from 'expo-router'

const login = () => {
    const router=useRouter()
    return (
        <ThemedView>
            <ThemedText>Login page</ThemedText>
            <Button title='signup' onPress={() => router.replace("/signup")}/>
        </ThemedView>
    )
}

export default login