import { Platform, View, ViewStyle } from "react-native"
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';

import { supabase } from "@/services/supabase"
import { SignInWithIdTokenCredentials } from "@supabase/supabase-js";

/**
 * Apple Sign-In Button for iOS
 * Uses expo-apple-authentication for native Apple authentication
 */

async function onAppleButtonPress() {
  try{
    const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    // Note: it appears putting FULL_NAME first is important, see issue #293
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });
  // Get the current authentication state for user
  // Note: This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
  if (credentialState === appleAuth.State.AUTHORIZED && appleAuthRequestResponse.identityToken && appleAuthRequestResponse.authorizationCode) {
    const signInWithIdTokenCredentials: SignInWithIdTokenCredentials = {
      provider: 'apple',
      token: appleAuthRequestResponse.identityToken,
      nonce: appleAuthRequestResponse.nonce,
      access_token: appleAuthRequestResponse.authorizationCode,
    };
    const { data, error } = await supabase.auth.signInWithIdToken(signInWithIdTokenCredentials);

    if (error) {
      console.error('Error signing in with Apple:', error);
    }
    if (data) {
      console.log('Apple sign in successful:', data);
    }
  }
  } catch (error) {
    console.error('Error signing in with Apple:', error);
  }
}

export interface AppleSignInButtonProps {
  onPress?: () => Promise<void>
  disabled?: boolean
}

export default function AppleSignInButton({ disabled }: AppleSignInButtonProps) {
  if (Platform.OS !== "ios") {
    return null
  }

  return (
    <View style={[$container, disabled && $disabled]} pointerEvents={disabled ? "none" : "auto"}>
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{ height: 50 }}
        onPress={() => onAppleButtonPress()}
      />
    </View>
  )
}

const $container: ViewStyle = {
  width: "100%",
}

const $disabled: ViewStyle = {
  opacity: 0.5,
}

const $button: ViewStyle = {
  width: "100%",
  height: 64,
}
