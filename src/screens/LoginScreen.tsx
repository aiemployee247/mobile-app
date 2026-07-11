import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../auth/AuthContext';
import { AuthTextInput } from '../components/AuthTextInput';
import { BrandMark } from '../components/BrandMark';
import { PrimaryButton } from '../components/PrimaryButton';
import { brand } from '../brand';
import { colors } from '../theme';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = email.trim().length > 0 && password.length > 0;

  const onSubmit = async () => {
    setError(null);
    setLoading(true);
    const message = await login(email, password);
    setLoading(false);
    if (message) setError(message);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        testID="login-screen"
        accessibilityLabel="login-screen"
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brandWrap}>
            <BrandMark variant="dark" size="md" testID="login-brand" />
          </View>

          <Text style={styles.heading}>Sign in to your account</Text>

          <View style={styles.form}>
            <AuthTextInput
              testID="login-email"
              label="Email Address"
              value={email}
              onChangeText={(v) => {
                setEmail(v);
                setError(null);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              returnKeyType="next"
            />
            <AuthTextInput
              testID="login-password"
              label="Password"
              value={password}
              onChangeText={(v) => {
                setPassword(v);
                setError(null);
              }}
              isPassword
              passwordVisible={passwordVisible}
              onTogglePassword={() => setPasswordVisible((v) => !v)}
              textContentType="password"
              returnKeyType="done"
              onSubmitEditing={onSubmit}
            />

            {error ? (
              <Text style={styles.error} testID="login-error">
                {error}
              </Text>
            ) : null}

            <PrimaryButton
              testID="login-submit"
              title="Continue"
              onPress={onSubmit}
              loading={loading}
              disabled={!canSubmit}
              style={styles.submit}
            />
          </View>

          <View style={styles.links}>
            <Pressable
              testID="login-goto-signup"
              accessible
              accessibilityRole="link"
              accessibilityLabel="login-goto-signup"
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.muted}>
                New to {brand.name}? <Text style={styles.link}>Sign Up</Text>
              </Text>
            </Pressable>
            <Text style={styles.help}>Need Help?</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.legal}>
              By logging in, I understand and agree to be bound by the {brand.name}{' '}
              <Text style={styles.link}>Terms of Use</Text> and{' '}
              <Text style={styles.link}>Privacy Policy</Text>.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  flex: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
  },
  brandWrap: {
    alignItems: 'center',
    marginBottom: 28,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  submit: {
    marginTop: 8,
  },
  error: {
    color: colors.error,
    fontSize: 14,
  },
  links: {
    marginTop: 28,
    alignItems: 'center',
    gap: 14,
  },
  muted: {
    fontSize: 15,
    color: colors.ink,
  },
  link: {
    color: colors.link,
    fontWeight: '600',
  },
  help: {
    color: colors.link,
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 36,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  legal: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.muted,
    textAlign: 'center',
  },
});
