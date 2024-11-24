import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { Button } from 'react-native'
import { useRouter } from 'expo-router'

const signup = () => {
    const router = useRouter()
    return (
        <ThemedView>
            <ThemedText>signup page</ThemedText>
            <Button title='signup' onPress={() => router.replace("/login")} />
        </ThemedView>
    )
}

export default signup