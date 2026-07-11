import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme';

type Variant = 'black' | 'accent' | 'navy';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
  variant?: Variant;
};

export function PrimaryButton({
  title,
  onPress,
  loading,
  disabled,
  style,
  testID,
  variant = 'black',
}: Props) {
  const isDisabled = disabled || loading;
  const bg =
    variant === 'accent'
      ? colors.accent
      : variant === 'navy'
        ? colors.navy
        : colors.black;

  return (
    <Pressable
      testID={testID}
      accessible
      accessibilityLabel={testID || title}
      accessibilityRole="button"
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: bg },
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  pressed: {
    opacity: 0.88,
  },
  disabled: {
    opacity: 0.45,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
