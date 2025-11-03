import { ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { auth } from "@/services/supabase"

/**
 * Google Sign-In Button (default/fallback)
 * Uses browser-based OAuth flow via Supabase
 */

export interface GoogleSignInButtonProps {
  onPress?: () => Promise<void>
  disabled?: boolean
}

export default function GoogleSignInButton({ onPress, disabled }: GoogleSignInButtonProps) {
  const handlePress = async () => {
    if (onPress) {
      await onPress()
    } else {
      // Use browser-based OAuth for unsupported platforms
      await auth.signInWithGoogle()
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
