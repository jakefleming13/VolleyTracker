import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '../../context/authContext'
import { Pressable } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Loading from '../../components/Loading'


const Home = () => {
  const router = useRouter();
  const { logout, user} = useAuth();

  console.log('User Data:', user);

  const handleLogout = async () => {
      await logout();
      router.push("signIn");
  };


  return (
      <View style={{ padding: 20 }}>
          <Text style={{ fontSize: hp(2.5) }}>Home</Text>
          {user ? (
              <Text>Welcome, {user.coachName || 'Guest'}!</Text> // Display user data if available
          ) : (
            <Loading size = {hp(7)} />
          )}
          <Pressable onPress={handleLogout}>
              <Text style={{ fontSize: hp(1.8), color: 'blue' }}>Sign Out</Text>
          </Pressable>
      </View>
  );
};

export default Home