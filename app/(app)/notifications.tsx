import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const notifications = () => {
  return (
    <View>
          <Link key={1} style={{width:300}} href={"/notifications/notification"}>
            <Text style={{fontSize:30}}>Notifcations</Text>
          </Link>
          <Link key={2} style={{width:300}} href="/notifications/reminders">
              <Text style={{fontSize:30}}>Reminders</Text>
          </Link>
    </View>
  )
}

export default notifications