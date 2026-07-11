import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../auth/AuthContext';
import { AuthTextInput } from '../components/AuthTextInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { brand } from '../brand';
import { colors } from '../theme';

export function ProfileScreen() {
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [favoriteTeam, setFavoriteTeam] = useState(user?.favoriteTeam ?? '');
  const [notifyGames, setNotifyGames] = useState(user?.notifyGames ?? true);
  const [notifyNews, setNotifyNews] = useState(user?.notifyNews ?? false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    setName(user?.name ?? '');
    setBio(user?.bio ?? '');
    setFavoriteTeam(user?.favoriteTeam ?? '');
    setNotifyGames(user?.notifyGames ?? true);
    setNotifyNews(user?.notifyNews ?? false);
  }, [user]);

  const initials = (user?.name || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');

  const onSave = async () => {
    setError(null);
    setSaved(false);
    setSaving(true);
    const message = await updateProfile({
      name,
      bio,
      favoriteTeam,
      notifyGames,
      notifyNews,
    });
    setSaving(false);
    if (message) {
      setError(message);
      return;
    }
    setSaved(true);
  };

  const onLogout = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
  };

  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top']}
      testID="profile-screen"
      accessibilityLabel="profile-screen"
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading} testID="profile-heading">
          Profile
        </Text>
        <Text style={styles.subheading}>
          Manage how you show up in {brand.name}.
        </Text>

        <View style={styles.avatarBlock}>
          <View style={styles.avatar} testID="profile-avatar">
            <Text style={styles.avatarText}>{initials || '?'}</Text>
          </View>
          <Text style={styles.avatarName} testID="profile-display-name">
            {user?.name}
          </Text>
          <Text style={styles.avatarEmail} testID="profile-email">
            {user?.email}
          </Text>
        </View>

        <View style={styles.form}>
          <AuthTextInput
            testID="profile-name"
            label="Display Name"
            value={name}
            onChangeText={(v) => {
              setName(v);
              setSaved(false);
              setError(null);
            }}
            autoCapitalize="words"
            textContentType="name"
          />
          <AuthTextInput
            testID="profile-bio"
            label="Bio"
            value={bio}
            onChangeText={(v) => {
              setBio(v);
              setSaved(false);
            }}
            placeholder="Short intro for your fan profile"
            multiline
            style={styles.bioInput}
          />
          <AuthTextInput
            testID="profile-favorite-team"
            label="Favorite Team"
            value={favoriteTeam}
            onChangeText={(v) => {
              setFavoriteTeam(v);
              setSaved(false);
            }}
            placeholder="e.g. New York Yankees"
            autoCapitalize="words"
          />

          <View style={styles.toggleRow} testID="profile-notify-games-row">
            <View style={styles.toggleCopy}>
              <Text style={styles.toggleTitle}>Game alerts</Text>
              <Text style={styles.toggleHint}>
                Score updates for your favorites
              </Text>
            </View>
            <Switch
              testID="profile-notify-games"
              value={notifyGames}
              onValueChange={(v) => {
                setNotifyGames(v);
                setSaved(false);
              }}
              trackColor={{ false: '#3A4A66', true: colors.accent }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.toggleRow} testID="profile-notify-news-row">
            <View style={styles.toggleCopy}>
              <Text style={styles.toggleTitle}>News & highlights</Text>
              <Text style={styles.toggleHint}>Daily digest emails</Text>
            </View>
            <Switch
              testID="profile-notify-news"
              value={notifyNews}
              onValueChange={(v) => {
                setNotifyNews(v);
                setSaved(false);
              }}
              trackColor={{ false: '#3A4A66', true: colors.accent }}
              thumbColor={colors.white}
            />
          </View>

          {error ? (
            <Text style={styles.error} testID="profile-error">
              {error}
            </Text>
          ) : null}
          {saved ? (
            <Text style={styles.saved} testID="profile-saved">
              Profile saved
            </Text>
          ) : null}

          <PrimaryButton
            testID="profile-save"
            title="Save Profile"
            variant="accent"
            onPress={onSave}
            loading={saving}
            disabled={name.trim().length === 0}
          />

          <Pressable
            testID="profile-logout"
            accessible
            accessibilityRole="button"
            accessibilityLabel="profile-logout"
            onPress={onLogout}
            disabled={loggingOut}
            style={styles.logoutLink}
          >
            <Text style={styles.logoutText}>
              {loggingOut ? 'Signing out…' : 'Sign out of this device'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  heading: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
  },
  subheading: {
    marginTop: 6,
    marginBottom: 20,
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
  },
  avatarBlock: {
    alignItems: 'center',
    marginBottom: 24,
    gap: 6,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '800',
  },
  avatarName: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  avatarEmail: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  bioInput: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 4,
  },
  toggleCopy: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.ink,
  },
  toggleHint: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 2,
  },
  error: {
    color: colors.error,
    fontSize: 14,
  },
  saved: {
    color: '#0B7A3B',
    fontSize: 14,
    fontWeight: '600',
  },
  logoutLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  logoutText: {
    color: colors.link,
    fontSize: 15,
    fontWeight: '600',
  },
});
