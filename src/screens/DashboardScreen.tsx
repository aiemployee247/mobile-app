import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../auth/AuthContext';
import { BrandMark } from '../components/BrandMark';
import { PrimaryButton } from '../components/PrimaryButton';
import { brand } from '../brand';
import { colors } from '../theme';

const FEATURED = [
  {
    id: 'live',
    title: 'Live Now',
    subtitle: 'Yankees vs Red Sox · Top 4',
    badge: 'LIVE',
  },
  {
    id: 'tonight',
    title: "Tonight's Slate",
    subtitle: '8 games starting after 7 PM ET',
    badge: 'TODAY',
  },
  {
    id: 'highlights',
    title: 'Top Highlights',
    subtitle: 'Walk-offs, homers, and diving catches',
    badge: 'NEW',
  },
];

export function DashboardScreen() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const firstName = user?.name?.split(' ')[0] || 'Fan';

  const onLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top']}
      testID="home-screen"
      accessibilityLabel="home-screen"
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <BrandMark variant="light" size="sm" testID="home-brand" />
          <PrimaryButton
            testID="home-logout"
            title="Log out"
            variant="accent"
            onPress={onLogout}
            loading={loading}
            style={styles.logoutBtn}
          />
        </View>

        <Text style={styles.greeting}>Hey, {firstName}</Text>
        <Text style={styles.heading} testID="home-heading">
          Your {brand.name} Dashboard
        </Text>

        <View style={styles.identity} testID="home-user-card">
          <Text style={styles.name} testID="home-user-name">
            {user?.name}
          </Text>
          <Text style={styles.email} testID="home-user-email">
            {user?.email}
          </Text>
        </View>

        <View style={styles.statsRow} testID="dashboard-stats">
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Watching</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Alerts</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>For you</Text>
        {FEATURED.map((item) => (
          <Pressable
            key={item.id}
            style={styles.featureCard}
            testID={`dashboard-card-${item.id}`}
            accessibilityRole="button"
          >
            <View style={styles.featureTop}>
              <Text style={styles.badge}>{item.badge}</Text>
            </View>
            <Text style={styles.featureTitle}>{item.title}</Text>
            <Text style={styles.featureSubtitle}>{item.subtitle}</Text>
          </Pressable>
        ))}

        <View style={styles.quickRow} testID="dashboard-quick-actions">
          <Pressable style={styles.quickAction} testID="dashboard-action-scores">
            <Text style={styles.quickTitle}>Scores</Text>
            <Text style={styles.quickHint}>All games</Text>
          </Pressable>
          <Pressable style={styles.quickAction} testID="dashboard-action-schedule">
            <Text style={styles.quickTitle}>Schedule</Text>
            <Text style={styles.quickHint}>This week</Text>
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
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 4,
  },
  logoutBtn: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 96,
  },
  greeting: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
    marginBottom: 4,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 16,
  },
  identity: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    gap: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  email: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(0,90,238,0.22)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,90,238,0.35)',
  },
  statValue: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  featureCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  featureTop: {
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    color: colors.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    overflow: 'hidden',
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },
  quickRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  quickAction: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  quickTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  quickHint: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 13,
    marginTop: 4,
  },
});
