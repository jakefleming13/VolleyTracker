import { Stack, useRouter } from "expo-router";
import React from "react"
import { useEffect } from "react";
import { useSegments } from "expo-router";
import {AuthContextProvider, useAuth} from "../context/authContext"
import { Slot} from "expo-router";

const MainLayout = () => {
  const {isAuthenticated} = useAuth()
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {

    // check if user is authenticated or not
    
    if (typeof isAuthenticated == 'undefined') return;

    const inApp = segments[0] == '(app)'
    if(isAuthenticated && !inApp) {
      // redirect to home
      router.replace('home')

    } else if (isAuthenticated == false) {
      // redirect to sign in
      router.replace('signIn')
    }

  }, [isAuthenticated])

  return <Slot/>
}
export default function RootLayout() {
  return (
   <AuthContextProvider>

      <MainLayout/>

   </AuthContextProvider>
  );
}
