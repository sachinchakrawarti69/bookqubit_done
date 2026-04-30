import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { useState } from 'react';

import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import ScalePress from '@/components/animations/ScalePress';

const themes = {
  light: {
    primary: '#ffffff',
    secondary: '#f5f5f5',
    text: '#333333',
    accent: '#6200ee',
    border: '#e0e0e0',
    card: '#ffffff',
    shadow: '#000000',
  },

  dark: {
    primary: '#121212',
    secondary: '#1e1e1e',
    text: '#ffffff',
    accent: '#bb86fc',
    border: '#2c2c2c',
    card: '#1e1e1e',
    shadow: '#000000',
  },

  ocean: {
    primary: '#1a535c',
    secondary: '#4ecdc4',
    text: '#f7fff7',
    accent: '#ffe66d',
    border: '#4ecdc4',
    card: '#2a6b74',
    shadow: '#000000',
  },

  sunset: {
    primary: '#ff6b6b',
    secondary: '#feca57',
    text: '#2c3e50',
    accent: '#ff9f43',
    border: '#ff6b6b',
    card: '#ff9f43',
    shadow: '#000000',
  },

  forest: {
    primary: '#2d6a4f',
    secondary: '#52b788',
    text: '#f8f9fa',
    accent: '#ffb703',
    border: '#52b788',
    card: '#40916c',
    shadow: '#000000',
  },
};

export default function HomeScreen() {
  const [currentTheme, setCurrentTheme] =
    useState('light');

  const theme =
    themes[currentTheme];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme.primary,
        },
      ]}
    >
      {/* HEADER */}
      <FadeIn>
        <View
          style={[
            styles.header,
            {
              borderBottomColor:
                theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              {
                color: theme.text,
              },
            ]}
          >
            BookQubit 📚
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.text,
                opacity: 0.8,
              },
            ]}
          >
            Your Digital Reading
            Companion
          </Text>
        </View>
      </FadeIn>

      {/* THEMES */}
      <FadeIn>
        <View
          style={styles.themeContainer}
        >
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.text,
              },
            ]}
          >
            Choose Your Theme
          </Text>

          <View
            style={styles.themeButtons}
          >
            <ScalePress
              style={[
                styles.themeButton,
                {
                  backgroundColor:
                    themes.light.accent,
                },
                currentTheme ===
                  'light' &&
                  styles.activeButton,
              ]}
              onPress={() =>
                setCurrentTheme(
                  'light'
                )
              }
            >
              <Text
                style={
                  styles.buttonText
                }
              >
                Light
              </Text>
            </ScalePress>

            <ScalePress
              style={[
                styles.themeButton,
                {
                  backgroundColor:
                    themes.dark.accent,
                },
                currentTheme ===
                  'dark' &&
                  styles.activeButton,
              ]}
              onPress={() =>
                setCurrentTheme(
                  'dark'
                )
              }
            >
              <Text
                style={
                  styles.buttonText
                }
              >
                Dark
              </Text>
            </ScalePress>

            <ScalePress
              style={[
                styles.themeButton,
                {
                  backgroundColor:
                    themes.ocean.accent,
                },
                currentTheme ===
                  'ocean' &&
                  styles.activeButton,
              ]}
              onPress={() =>
                setCurrentTheme(
                  'ocean'
                )
              }
            >
              <Text
                style={
                  styles.buttonText
                }
              >
                Ocean
              </Text>
            </ScalePress>

            <ScalePress
              style={[
                styles.themeButton,
                {
                  backgroundColor:
                    themes.sunset
                      .accent,
                },
                currentTheme ===
                  'sunset' &&
                  styles.activeButton,
              ]}
              onPress={() =>
                setCurrentTheme(
                  'sunset'
                )
              }
            >
              <Text
                style={
                  styles.buttonText
                }
              >
                Sunset
              </Text>
            </ScalePress>

            <ScalePress
              style={[
                styles.themeButton,
                {
                  backgroundColor:
                    themes.forest
                      .accent,
                },
                currentTheme ===
                  'forest' &&
                  styles.activeButton,
              ]}
              onPress={() =>
                setCurrentTheme(
                  'forest'
                )
              }
            >
              <Text
                style={
                  styles.buttonText
                }
              >
                Forest
              </Text>
            </ScalePress>
          </View>
        </View>
      </FadeIn>

      {/* FEATURED CARD */}
      <SlideUp delay={200}>
        <View
          style={[
            styles.card,
            {
              backgroundColor:
                theme.card,

              borderColor:
                theme.border,

              shadowColor:
                theme.shadow,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              {
                color:
                  theme.text,
              },
            ]}
          >
            Featured Book
          </Text>

          <Text
            style={[
              styles.cardText,
              {
                color:
                  theme.text,

                opacity: 0.9,
              },
            ]}
          >
            "The Great Gatsby"
            by F. Scott Fitzgerald
          </Text>

          <ScalePress
            style={[
              styles.readButton,
              {
                backgroundColor:
                  theme.accent,
              },
            ]}
          >
            <Text
              style={
                styles.readButtonText
              }
            >
              Start Reading
            </Text>
          </ScalePress>
        </View>
      </SlideUp>

      {/* STATS */}
      <View
        style={styles.statsContainer}
      >
        <SlideUp delay={400}>
          <View
            style={[
              styles.statItem,
              {
                backgroundColor:
                  theme.secondary,

                borderColor:
                  theme.border,
              },
            ]}
          >
            <Text
              style={[
                styles.statNumber,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              24
            </Text>

            <Text
              style={[
                styles.statLabel,
                {
                  color:
                    theme.text,

                  opacity: 0.7,
                },
              ]}
            >
              Books Read
            </Text>
          </View>
        </SlideUp>

        <SlideUp delay={500}>
          <View
            style={[
              styles.statItem,
              {
                backgroundColor:
                  theme.secondary,

                borderColor:
                  theme.border,
              },
            ]}
          >
            <Text
              style={[
                styles.statNumber,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              156
            </Text>

            <Text
              style={[
                styles.statLabel,
                {
                  color:
                    theme.text,

                  opacity: 0.7,
                },
              ]}
            >
              Pages Today
            </Text>
          </View>
        </SlideUp>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    alignItems: 'center',

    marginTop: 40,
    marginBottom: 30,

    paddingBottom: 20,

    borderBottomWidth: 2,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',

    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
  },

  themeContainer: {
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',

    marginBottom: 15,

    textAlign: 'center',
  },

  themeButtons: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'center',

    gap: 10,
  },

  themeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,

    borderRadius: 25,

    minWidth: 80,

    alignItems: 'center',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.3,
    shadowRadius: 4,

    elevation: 3,
  },

  activeButton: {
    transform: [
      {
        scale: 1.05,
      },
    ],

    borderWidth: 2,

    borderColor: '#ffffff',
  },

  buttonText: {
    color: '#ffffff',

    fontWeight: '600',

    fontSize: 14,
  },

  card: {
    padding: 20,

    borderRadius: 15,

    marginBottom: 20,

    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.3,
    shadowRadius: 6,

    elevation: 5,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',

    marginBottom: 8,
  },

  cardText: {
    fontSize: 14,

    marginBottom: 15,
  },

  readButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,

    borderRadius: 10,

    alignItems: 'center',

    alignSelf: 'flex-start',
  },

  readButtonText: {
    color: '#ffffff',

    fontWeight: '600',
  },

  statsContainer: {
    flexDirection: 'row',

    justifyContent:
      'space-around',

    gap: 15,
  },

  statItem: {
    flex: 1,

    padding: 15,

    borderRadius: 12,

    alignItems: 'center',

    borderWidth: 1,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 3,
  },

  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',

    marginBottom: 5,
  },

  statLabel: {
    fontSize: 12,
  },
});