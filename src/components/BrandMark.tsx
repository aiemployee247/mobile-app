import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { brand } from '../brand';
import { colors } from '../theme';

type Props = {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  testID?: string;
};

export function BrandMark({
  variant = 'dark',
  size = 'md',
  style,
  testID,
}: Props) {
  const light = variant === 'light';
  const markSize = size === 'lg' ? 44 : size === 'sm' ? 28 : 36;
  const wordSize = size === 'lg' ? 36 : size === 'sm' ? 20 : 28;

  return (
    <View style={[styles.row, style]} testID={testID}>
      <View
        style={[
          styles.mark,
          {
            width: markSize,
            height: markSize,
            borderRadius: markSize * 0.22,
          },
          light ? styles.markOnDark : styles.markOnLight,
        ]}
      >
        <Text
          style={[
            styles.markLetter,
            { fontSize: markSize * 0.48 },
            light ? styles.letterOnDark : styles.letterOnLight,
          ]}
        >
          {brand.name.charAt(0)}
        </Text>
      </View>
      <Text
        style={[
          styles.word,
          { fontSize: wordSize },
          light ? styles.wordLight : styles.wordDark,
        ]}
      >
        {brand.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  mark: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markOnDark: {
    backgroundColor: colors.accent,
  },
  markOnLight: {
    backgroundColor: colors.navy,
  },
  markLetter: {
    fontWeight: '800',
  },
  letterOnDark: {
    color: colors.white,
  },
  letterOnLight: {
    color: colors.white,
  },
  word: {
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  wordLight: {
    color: colors.white,
  },
  wordDark: {
    color: colors.navy,
  },
});
