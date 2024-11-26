import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'

const App = () => {
  const { user } = useContext(UserContext)
  return (
    <GestureHandlerRootView>
      <ScrollView contentContainerStyle={style.scrollView}>

        {user && !user.is_engineer && < Link key={1} style={style.card} href="/products/registered">
          <View style={style.cardContent}>
            <Text style={style.cardtext}>Registered Products</Text>
          </View>
        </Link>}



      </ScrollView>
    </GestureHandlerRootView >
  )
}

const style = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 2,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#82120a', // Semi-transparent black
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    height: 200,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardContent: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  cardtext: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
  noFeatures: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'grey',
  },
})

export default App
