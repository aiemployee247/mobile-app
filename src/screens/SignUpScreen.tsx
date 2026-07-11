import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export function SignUpScreen({ navigation }: Props) {
  const { signUp } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [optInBrand, setOptInBrand] = useState(false);
  const [optInPartners, setOptInPartners] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit =
    firstName.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0;

  const onSubmit = async () => {
    setError(null);
    if (!canSubmit) {
      setError('Please fill in first name, email, and password');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ');
    setLoading(true);
    const message = await signUp(fullName, email, password);
    setLoading(false);
    if (message) setError(message);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        testID="signup-screen"
        accessibilityLabel="signup-screen"
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brandWrap}>
            <BrandMark variant="dark" size="sm" testID="signup-brand" />
          </View>

          <Text style={styles.heading}>Create an Account</Text>

        <View style={styles.form}>
          <AuthTextInput
            testID="signup-name"
            label="First Name"
            value={firstName}
            onChangeText={(v) => {
              setFirstName(v);
              setError(null);
            }}
            autoCapitalize="words"
            textContentType="givenName"
            returnKeyType="next"
          />
          <AuthTextInput
            testID="signup-last-name"
            label="Last Name"
            value={lastName}
            onChangeText={(v) => {
              setLastName(v);
              setError(null);
            }}
            autoCapitalize="words"
            textContentType="familyName"
            returnKeyType="next"
          />
          <AuthTextInput
            testID="signup-email"
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
            testID="signup-password"
            label="Password"
            value={password}
            onChangeText={(v) => {
              setPassword(v);
              setError(null);
            }}
            isPassword
            passwordVisible={passwordVisible}
            onTogglePassword={() => setPasswordVisible((v) => !v)}
            textContentType="newPassword"
            returnKeyType="next"
          />
          <AuthTextInput
            testID="signup-confirm-password"
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(v) => {
              setConfirmPassword(v);
              setError(null);
            }}
            isPassword
            passwordVisible={passwordVisible}
            onTogglePassword={() => setPasswordVisible((v) => !v)}
            textContentType="newPassword"
            // Do not submit on Done — birthdate / opt-ins / Register follow.
            // Appium key input was firing onSubmitEditing and skipping Register.
            returnKeyType="next"
          />

          <View style={styles.birthBlock}>
            <Text style={styles.label}>Birthdate</Text>
            <View style={styles.birthRow}>
              <TextInput
                testID="signup-birth-mm"
                accessibilityLabel="signup-birth-mm"
                style={styles.birthInput}
                placeholder="MM"
                placeholderTextColor={colors.soft}
                keyboardType="number-pad"
                maxLength={2}
                value={birthMonth}
                onChangeText={setBirthMonth}
              />
              <TextInput
                testID="signup-birth-dd"
                accessibilityLabel="signup-birth-dd"
                style={styles.birthInput}
                placeholder="DD"
                placeholderTextColor={colors.soft}
                keyboardType="number-pad"
                maxLength={2}
                value={birthDay}
                onChangeText={setBirthDay}
              />
              <TextInput
                testID="signup-birth-yyyy"
                accessibilityLabel="signup-birth-yyyy"
                style={[styles.birthInput, styles.birthYear]}
                placeholder="YYYY"
                placeholderTextColor={colors.soft}
                keyboardType="number-pad"
                maxLength={4}
                value={birthYear}
                onChangeText={setBirthYear}
              />
            </View>
          </View>

          <Pressable
            style={styles.checkRow}
            onPress={() => setOptInBrand((v) => !v)}
            testID="signup-optin-brand"
            accessibilityRole="checkbox"
            accessibilityState={{ checked: optInBrand }}
          >
            <View style={[styles.checkbox, optInBrand && styles.checkboxOn]}>
              {optInBrand ? <Text style={styles.checkMark}>✓</Text> : null}
            </View>
            <Text style={styles.checkText}>
              I would like to receive commercial e-mails from{' '}
              <Text style={styles.link}>{brand.name}</Text> and their partners.
            </Text>
          </Pressable>

          <Pressable
            style={styles.checkRow}
            onPress={() => setOptInPartners((v) => !v)}
            testID="signup-optin-partners"
            accessibilityRole="checkbox"
            accessibilityState={{ checked: optInPartners }}
          >
            <View style={[styles.checkbox, optInPartners && styles.checkboxOn]}>
              {optInPartners ? <Text style={styles.checkMark}>✓</Text> : null}
            </View>
            <Text style={styles.checkText}>
              I would like to receive commercial e-mails from{' '}
              <Text style={styles.link}>{brand.name} Partners</Text> and their
              partners.
            </Text>
          </Pressable>

          {error ? (
            <Text style={styles.error} testID="signup-error">
              {error}
            </Text>
          ) : null}

          <PrimaryButton
            testID="signup-submit"
            title="Register"
            variant="navy"
            onPress={onSubmit}
            loading={loading}
            disabled={loading}
            style={styles.submit}
          />
        </View>

          <Pressable
            testID="signup-goto-login"
            accessible
            accessibilityRole="link"
            accessibilityLabel="signup-goto-login"
            onPress={() => navigation.goBack()}
            style={styles.footerWrap}
          >
            <Text style={styles.footerLine}>
              Already have an account? <Text style={styles.link}>Log In</Text>
            </Text>
          </Pressable>
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
    paddingTop: 20,
    paddingBottom: 40,
  },
  brandWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 20,
  },
  form: {
    gap: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 8,
  },
  birthBlock: {
    marginTop: 4,
  },
  birthRow: {
    flexDirection: 'row',
    gap: 10,
  },
  birthInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.ink,
    textAlign: 'center',
  },
  birthYear: {
    flex: 1.35,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingTop: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 3,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  checkboxOn: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  checkMark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  checkText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: colors.ink,
  },
  link: {
    color: colors.link,
    fontWeight: '600',
  },
  error: {
    color: colors.error,
    fontSize: 14,
  },
  submit: {
    marginTop: 8,
  },
  footerWrap: {
    marginTop: 22,
    alignItems: 'center',
  },
  footerLine: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.ink,
  },
});
