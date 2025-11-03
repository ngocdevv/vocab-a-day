import { ComponentType, FC, useMemo, useRef, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { Alert, TextInput, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { PressableIcon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { AppleSignInButton, GoogleSignInButton } from "@/components/SocialAuthButtons"
import { Text } from "@/components/Text"
import { TextField, type TextFieldAccessoryProps } from "@/components/TextField"
import { useAuth } from "@/context/AuthContext"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = ({ navigation }) => {
  const authPasswordInput = useRef<TextInput>(null)
  const authConfirmPasswordInput = useRef<TextInput>(null)

  const [authEmail, setAuthEmail] = useState("")
  const [authPassword, setAuthPassword] = useState("")
  const [authConfirmPassword, setAuthConfirmPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isAuthConfirmPasswordHidden, setIsAuthConfirmPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { signUpWithEmail, loading: authLoading } = useAuth()

  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  const validationError = useMemo(() => {
    if (!authEmail || authEmail.length === 0) return "registerScreen:errors.emailRequired"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authEmail))
      return "registerScreen:errors.emailInvalid"
    if (!authPassword || authPassword.length === 0) return "registerScreen:errors.passwordRequired"
    if (authPassword.length < 6) return "registerScreen:errors.passwordTooShort"
    if (!authConfirmPassword || authConfirmPassword.length === 0)
      return "registerScreen:errors.confirmPasswordRequired"
    if (authPassword !== authConfirmPassword) return "registerScreen:errors.passwordsDoNotMatch"
    return ""
  }, [authEmail, authPassword, authConfirmPassword])

  const error = isSubmitted ? validationError : ""

  async function register() {
    setIsSubmitted(true)

    const validation = validationError
    if (validation) return

    setLoading(true)
    const { error } = await signUpWithEmail(authEmail, authPassword)
    setLoading(false)

    if (error) {
      Alert.alert("Registration Failed", error.message || "An error occurred during registration")
    } else {
      // Auth state will update automatically via AuthContext
      setIsSubmitted(false)
      setAuthPassword("")
      setAuthConfirmPassword("")
      Alert.alert(
        "Registration Successful",
        "Your account has been created successfully. Please check your email to verify your account.",
      )
    }
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <PressableIcon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden, colors.palette.neutral800],
  )

  const ConfirmPasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function ConfirmPasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <PressableIcon
            icon={isAuthConfirmPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthConfirmPasswordHidden(!isAuthConfirmPasswordHidden)}
          />
        )
      },
    [isAuthConfirmPasswordHidden, colors.palette.neutral800],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text
        testID="register-heading"
        tx="registerScreen:createAccount"
        preset="heading"
        style={themed($heading)}
      />
      <Text tx="registerScreen:enterDetails" preset="subheading" style={themed($subheading)} />

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="registerScreen:emailFieldLabel"
        placeholderTx="registerScreen:emailFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="registerScreen:passwordFieldLabel"
        placeholderTx="registerScreen:passwordFieldPlaceholder"
        onSubmitEditing={() => authConfirmPasswordInput.current?.focus()}
        RightAccessory={PasswordRightAccessory}
      />

      <TextField
        ref={authConfirmPasswordInput}
        value={authConfirmPassword}
        onChangeText={setAuthConfirmPassword}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthConfirmPasswordHidden}
        labelTx="registerScreen:confirmPasswordFieldLabel"
        placeholderTx="registerScreen:confirmPasswordFieldPlaceholder"
        onSubmitEditing={register}
        RightAccessory={ConfirmPasswordRightAccessory}
      />

      <Button
        testID="register-button"
        tx="registerScreen:tapToRegister"
        style={themed($registerButton)}
        preset="reversed"
        onPress={register}
        disabled={loading || authLoading}
      />

      <View style={themed($oauthButtonsContainer)}>
        <Text style={themed($dividerText)} tx="registerScreen:orContinueWith" />

        <View style={themed($googleButton)}>
          <GoogleSignInButton disabled={loading || authLoading} />
        </View>

        <View style={themed($appleButton)}>
          <AppleSignInButton disabled={loading || authLoading} />
        </View>
      </View>

      <View style={themed($loginLinkContainer)}>
        <Text tx="registerScreen:alreadyHaveAccount" style={themed($loginLinkText)} />
        <Button
          testID="login-link"
          tx="registerScreen:logIn"
          preset="default"
          onPress={() => navigation.navigate("Login")}
          style={themed($loginLinkButton)}
          textStyle={themed($loginLinkButtonText)}
        />
      </View>
    </Screen>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})

const $heading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $subheading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $registerButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
  marginBottom: spacing.lg,
})

const $oauthButtonsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xl,
})

const $dividerText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  textAlign: "center",
  color: colors.textDim,
  marginBottom: spacing.md,
})

const $googleButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $appleButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $loginLinkContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: spacing.xs,
})

const $loginLinkText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $loginLinkButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: 0,
  paddingHorizontal: spacing.xs,
  minHeight: 0,
})

const $loginLinkButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
  textDecorationLine: "underline",
})

