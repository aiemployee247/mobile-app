import React from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandMark } from '../components/BrandMark';
import { PrimaryButton } from '../components/PrimaryButton';
import { brand } from '../brand';
import { colors } from '../theme';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  const goLogin = () => navigation.replace('Login');

  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top', 'bottom']}
      testID="welcome-screen"
      accessibilityLabel="welcome-screen"
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.topBar}>
        <Pressable
          testID="welcome-skip"
          accessible
          accessibilityRole="button"
          accessibilityLabel="welcome-skip"
          onPress={goLogin}
          hitSlop={12}
        >
          <Text style={styles.skip}>SKIP</Text>
        </Pressable>
      </View>

      <View style={styles.center}>
        <BrandMark variant="light" size="lg" testID="welcome-brand" />
        <Text style={styles.copy}>
          Welcome to the Official app of {brand.name}. Help us customize your
          experience.
        </Text>
      </View>

      <View style={styles.bottom}>
        <PrimaryButton
          testID="welcome-get-started"
          title="Get Started"
          variant="accent"
          onPress={goLogin}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.navy,
    paddingHorizontal: 24,
  },
  topBar: {
    alignItems: 'flex-end',
    paddingTop: 8,
  },
  skip: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    gap: 28,
  },
  copy: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 300,
  },
  bottom: {
    paddingBottom: 16,
  },
});
