import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';

import {
  Ionicons,
  Feather,
  FontAwesome5,
} from '@expo/vector-icons';

import themes from '@/src/themes';
import { useThemeStore } from '@/store/themeStore';

export default function AboutScreen() {
  const { currentTheme } = useThemeStore();
  const theme = themes[currentTheme];

  const appInfo = {
    name: 'BookQubit',
    version: '1.0.0',
    build: '2024.001',
    releaseDate: 'January 2024',
  };

  const developers = [
    {
      name: 'BookQubit Team',
      role: 'Development & Design',
      email: 'hello@bookqubit.com',
    },
  ];

  const features = [
    { icon: '📚', title: 'Digital Library', description: 'Access thousands of books' },
    { icon: '🎧', title: 'Audiobooks', description: 'Listen on the go' },
    { icon: '🔖', title: 'Bookmarks', description: 'Save your favorite moments' },
    { icon: '✨', title: 'Highlights', description: 'Mark important passages' },
    { icon: '📊', title: 'Reading Stats', description: 'Track your progress' },
    { icon: '🌙', title: 'Dark Mode', description: '5 beautiful themes' },
  ];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${appInfo.name} - The best reading companion app! 📚`,
        url: 'https://bookqubit.com',
        title: 'Share BookQubit',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@bookqubit.com');
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://bookqubit.com/privacy');
  };

  const handleTermsOfService = () => {
    Linking.openURL('https://bookqubit.com/terms');
  };

  const handleRateApp = () => {
    // For iOS: Linking.openURL('itms-apps://itunes.apple.com/app/idYOUR_APP_ID')
    // For Android: Linking.openURL('market://details?id=YOUR_PACKAGE_NAME')
    Linking.openURL('https://play.google.com/store/apps/details?id=com.bookqubit');
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View
          style={[
            styles.logoContainer,
            {
              backgroundColor: theme.colors.primary + '15',
            },
          ]}
        >
          <Text style={styles.logoText}>📚</Text>
        </View>
        
        <Text
          style={[
            styles.appName,
            { color: theme.colors.textPrimary },
          ]}
        >
          {appInfo.name}
        </Text>
        
        <Text
          style={[
            styles.version,
            { color: theme.colors.textSecondary },
          ]}
        >
          Version {appInfo.version} ({appInfo.build})
        </Text>
        
        <Text
          style={[
            styles.releaseDate,
            { color: theme.colors.textSecondary },
          ]}
        >
          Released {appInfo.releaseDate}
        </Text>
      </View>

      {/* SHARE BUTTON */}
      <TouchableOpacity
        style={[
          styles.shareButton,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
        onPress={handleShare}
      >
        <Feather
          name="share-2"
          size={20}
          color={theme.colors.primary}
        />
        <Text
          style={[
            styles.shareButtonText,
            { color: theme.colors.textPrimary },
          ]}
        >
          Share BookQubit
        </Text>
      </TouchableOpacity>

      {/* DESCRIPTION */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          About
        </Text>
        
        <Text
          style={[
            styles.description,
            { color: theme.colors.textSecondary },
          ]}
        >
          BookQubit is your ultimate reading companion, designed to help you 
          discover, track, and enjoy books like never before. Whether you're 
          into fiction, non-fiction, or audiobooks, we've got you covered.
        </Text>
      </View>

      {/* FEATURES */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          Features
        </Text>
        
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View
              key={index}
              style={[
                styles.featureCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <Text
                style={[
                  styles.featureTitle,
                  { color: theme.colors.textPrimary },
                ]}
              >
                {feature.title}
              </Text>
              <Text
                style={[
                  styles.featureDescription,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {feature.description}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* DEVELOPERS */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          Team
        </Text>
        
        {developers.map((dev, index) => (
          <View
            key={index}
            style={[
              styles.developerCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.developerIcon,
                { backgroundColor: theme.colors.primary + '20' },
              ]}
            >
              <FontAwesome5
                name="user-circle"
                size={32}
                color={theme.colors.primary}
              />
            </View>
            
            <View style={styles.developerInfo}>
              <Text
                style={[
                  styles.developerName,
                  { color: theme.colors.textPrimary },
                ]}
              >
                {dev.name}
              </Text>
              <Text
                style={[
                  styles.developerRole,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {dev.role}
              </Text>
              <Text
                style={[
                  styles.developerEmail,
                  { color: theme.colors.primary },
                ]}
              >
                {dev.email}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* LINKS */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          Links
        </Text>
        
        <TouchableOpacity
          style={[
            styles.linkButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={handleRateApp}
        >
          <Ionicons
            name="star"
            size={20}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.linkButtonText,
              { color: theme.colors.textPrimary },
            ]}
          >
            Rate us on App Store
          </Text>
          <Feather
            name="external-link"
            size={16}
            color={theme.colors.icon}
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.linkButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={handleEmailSupport}
        >
          <Ionicons
            name="mail"
            size={20}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.linkButtonText,
              { color: theme.colors.textPrimary },
            ]}
          >
            Email Support
          </Text>
          <Feather
            name="external-link"
            size={16}
            color={theme.colors.icon}
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.linkButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={handlePrivacyPolicy}
        >
          <Ionicons
            name="shield"
            size={20}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.linkButtonText,
              { color: theme.colors.textPrimary },
            ]}
          >
            Privacy Policy
          </Text>
          <Feather
            name="external-link"
            size={16}
            color={theme.colors.icon}
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.linkButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={handleTermsOfService}
        >
          <Ionicons
            name="document-text"
            size={20}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.linkButtonText,
              { color: theme.colors.textPrimary },
            ]}
          >
            Terms of Service
          </Text>
          <Feather
            name="external-link"
            size={16}
            color={theme.colors.icon}
          />
        </TouchableOpacity>
      </View>

      {/* COPYRIGHT */}
      <View style={styles.footer}>
        <Text
          style={[
            styles.copyright,
            { color: theme.colors.textSecondary },
          ]}
        >
          © 2024 BookQubit. All rights reserved.
        </Text>
        
        <Text
          style={[
            styles.madeWith,
            { color: theme.colors.textSecondary },
          ]}
        >
          Made with ❤️ for book lovers
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 40,
  },

  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },

  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  logoText: {
    fontSize: 50,
  },

  appName: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },

  version: {
    fontSize: 14,
    marginBottom: 4,
  },

  releaseDate: {
    fontSize: 12,
  },

  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 24,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
  },

  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  section: {
    marginBottom: 28,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
  },

  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  featureCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },

  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },

  featureDescription: {
    fontSize: 12,
    lineHeight: 16,
  },

  developerCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },

  developerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },

  developerInfo: {
    flex: 1,
  },

  developerName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },

  developerRole: {
    fontSize: 14,
    marginBottom: 4,
  },

  developerEmail: {
    fontSize: 13,
  },

  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    gap: 12,
  },

  linkButtonText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },

  footer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },

  copyright: {
    fontSize: 12,
    marginBottom: 8,
  },

  madeWith: {
    fontSize: 12,
  },
});