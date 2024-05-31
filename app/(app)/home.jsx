import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '../../context/authContext'
import { Pressable } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Home = () => {

  const router = useRouter()
  const {logout, user} = useAuth()

  console.log('User Data:', user)
  const handleLogout = async () => {

    await logout()
    router.push("signIn")
  
  }

  return (
    <View>
      <View>
        <Text>Home</Text>
      </View>

      <View View>
       

        <Pressable onPress = {handleLogout}>
        <Text style = {{fontSize: hp(1.8), color: 'blue'}}>Sign Out</Text>
        </Pressable>
      </View>

    </View>
  )
}

export default Home