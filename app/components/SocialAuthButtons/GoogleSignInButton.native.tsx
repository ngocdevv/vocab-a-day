import { GoogleSignin } from "@react-native-google-signin/google-signin"
import type { SignInWithIdTokenCredentials } from "@supabase/supabase-js"
import { ViewStyle } from "react-native"
import "react-native-get-random-values"

import { Button } from "@/components/Button"
import Config from "@/config"
import { supabase } from "@/services/supabase"

/**
 * Google Sign-In Button for iOS and Android
 * Uses @react-native-google-signin/google-signin for native Google authentication
 */

export interface GoogleSignInButtonProps {
  onPress?: () => Promise<void>
  disabled?: boolean
}

export default function GoogleSignInButton({ onPress, disabled }: GoogleSignInButtonProps) {
  const handlePress = async () => {
    try {
      if (onPress) {
        await onPress()
      } else {

        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()

        if (userInfo.data?.idToken) {
          const signInWithIdTokenCredentials: SignInWithIdTokenCredentials = {
            provider: "google",
            token: userInfo.data.idToken,
          }

          const { data, error } = await supabase.auth.signInWithIdToken(
            signInWithIdTokenCredentials,
          )

          if (error) {
            console.error("Error signing in with Google:", error)
            throw error
          }

          console.log("Google sign-in successful:", data)
        } else {
          throw new Error("No ID token returned from Google Sign-In")
        }
      }
    } catch (error) {
      console.error("Google sign in error:", error)
    }
  }

  return (
    <Button
      testID="google-sign-in-button"
      tx="loginScreen:signInWithGoogle"
      onPress={handlePress}
      disabled={disabled}
      style={$button}
    />
  )
}

const $button: ViewStyle = {
  width: "100%",
}
