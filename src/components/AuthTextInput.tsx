import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  Pressable,
} from 'react-native';
import { colors } from '../theme';

type Props = TextInputProps & {
  label: string;
  testID?: string;
  isPassword?: boolean;
  passwordVisible?: boolean;
  onTogglePassword?: () => void;
};

export function AuthTextInput({
  label,
  testID,
  isPassword,
  passwordVisible,
  onTogglePassword,
  style,
  ...rest
}: Props) {
  return (
    <View style={styles.wrap} testID={testID ? `${testID}-wrap` : undefined}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          testID={testID}
          accessibilityLabel={testID || label}
          accessible
          style={[styles.input, style]}
          placeholderTextColor={colors.soft}
          secureTextEntry={isPassword && !passwordVisible}
          autoCapitalize={isPassword ? 'none' : rest.autoCapitalize}
          {...rest}
        />
        {isPassword && onTogglePassword ? (
          <Pressable
            onPress={onTogglePassword}
            hitSlop={8}
            testID={testID ? `${testID}-toggle` : undefined}
            accessible
            accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
          >
            <Text style={styles.toggle}>
              {passwordVisible ? 'Hide' : 'Show'}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.ink,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.ink,
  },
  toggle: {
    color: colors.link,
    fontWeight: '600',
    fontSize: 14,
    paddingLeft: 8,
  },
});
