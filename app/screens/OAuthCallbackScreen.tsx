import { useEffect } from "react"
import { ActivityIndicator, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { Screen } from "@/components/Screen"
import { supabase } from "@/services/supabase"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

/**
 * OAuthCallbackScreen
 * This screen handles the OAuth callback from providers like Google and Apple.
 * It processes the URL and exchanges the code for a session.
 */
export const OAuthCallbackScreen = () => {
  const navigation = useNavigation()
  const { themed } = useAppTheme()

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Get the current session after OAuth redirect
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session after OAuth:", error)
          // Navigate back to login on error
          navigation.navigate("Login" as never)
          return
        }

        if (data.session) {
          // Session is available, user is authenticated
          // Navigate to the main app (Welcome screen)
          navigation.navigate("Welcome" as never)
        } else {
          // No session, navigate back to login
          navigation.navigate("Login" as never)
        }
      } catch (err) {
        console.error("OAuth callback error:", err)
        navigation.navigate("Login" as never)
      }
    }

    handleOAuthCallback()
  }, [navigation])

  return (
    <Screen preset="auto" contentContainerStyle={themed($container)}>
      <ActivityIndicator size="large" />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.lg,
})
