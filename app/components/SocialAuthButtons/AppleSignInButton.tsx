import { ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { auth } from "@/services/supabase"

/**
 * Apple Sign-In Button for Web and other platforms
 * Uses browser-based OAuth flow via Supabase
 */

export interface AppleSignInButtonProps {
  onPress?: () => Promise<void>
  disabled?: boolean
}

export default function AppleSignInButton({ onPress, disabled }: AppleSignInButtonProps) {
  const handlePress = async () => {
    if (onPress) {
      await onPress()
    } else {
      // Use browser-based OAuth for web and unsupported platforms
      await auth.signInWithApple()
    }
  }

  return (
    <Button
      testID="apple-sign-in-button"
      tx="loginScreen:signInWithApple"
      onPress={handlePress}
      disabled={disabled}
      style={$button}
    />
  )
}

const $button: ViewStyle = {
  width: "100%",
}
