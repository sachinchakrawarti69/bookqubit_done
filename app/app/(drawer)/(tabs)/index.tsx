import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  Ionicons,
  Feather,
} from '@expo/vector-icons';

import themes from '@/src/themes';

import { useThemeStore } from '@/store/themeStore';

export default function HomeScreen() {
  const { currentTheme } =
    useThemeStore();

  const theme =
    themes[currentTheme];

  const categories = [
    'Technology',
    'Philosophy',
    'Science',
    'History',
    'AI',
    'Psychology',
  ];

  const books = [
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      rating: '4.9',
    },

    {
      title: 'Deep Work',
      author: 'Cal Newport',
      rating: '4.8',
    },

    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      rating: '4.7',
    },

    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      rating: '4.9',
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          theme.colors.background,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* HERO */}
      <View
        style={[
          styles.heroSection,
          {
            backgroundColor:
              theme.colors.surface,
          },
        ]}
      >
        <Text
          style={[
            styles.heroTitle,
            {
              color:
                theme.colors.textPrimary,
            },
          ]}
        >
          Discover Your Next Book
        </Text>

        <Text
          style={[
            styles.heroSubtitle,
            {
              color:
                theme.colors.textSecondary,
            },
          ]}
        >
          Read smarter, learn faster,
          explore infinitely.
        </Text>

        <TouchableOpacity
          style={[
            styles.heroButton,
            {
              backgroundColor:
                theme.colors.primary,
            },
          ]}
        >
          <Text style={styles.heroButtonText}>
            Explore Library
          </Text>
        </TouchableOpacity>
      </View>

      {/* STATS */}
      <View style={styles.statsContainer}>
        {[
          {
            icon: 'book-outline',
            value: '12K+',
            label: 'Books',
          },

          {
            icon: 'people-outline',
            value: '8K+',
            label: 'Readers',
          },

          {
            icon: 'star-outline',
            value: '4.9',
            label: 'Rating',
          },
        ].map((item, index) => (
          <View
            key={index}
            style={[
              styles.statCard,
              {
                backgroundColor:
                  theme.colors.surface,
              },
            ]}
          >
            <Ionicons
              name={item.icon as any}
              size={24}
              color={theme.colors.primary}
            />

            <Text
              style={[
                styles.statValue,
                {
                  color:
                    theme.colors.textPrimary,
                },
              ]}
            >
              {item.value}
            </Text>

            <Text
              style={{
                color:
                  theme.colors.textSecondary,
              }}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      {/* CATEGORIES */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color:
                theme.colors.textPrimary,
            },
          ]}
        >
          Categories
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
        >
          {categories.map(
            (category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryCard,
                  {
                    backgroundColor:
                      theme.colors.surface,

                    borderColor:
                      theme.colors.border,
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      theme.colors.textPrimary,
                  }}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>

      {/* TRENDING BOOKS */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color:
                theme.colors.textPrimary,
            },
          ]}
        >
          Trending Books
        </Text>

        {books.map((book, index) => (
          <View
            key={index}
            style={[
              styles.bookCard,
              {
                backgroundColor:
                  theme.colors.surface,
              },
            ]}
          >
            <View
              style={[
                styles.bookIcon,
                {
                  backgroundColor:
                    theme.colors.background,
                },
              ]}
            >
              <Ionicons
                name="book"
                size={28}
                color={theme.colors.primary}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.bookTitle,
                  {
                    color:
                      theme.colors.textPrimary,
                  },
                ]}
              >
                {book.title}
              </Text>

              <Text
                style={{
                  color:
                    theme.colors.textSecondary,
                }}
              >
                {book.author}
              </Text>

              <View
                style={styles.ratingRow}
              >
                <Feather
                  name="star"
                  size={16}
                  color="#F59E0B"
                />

                <Text
                  style={{
                    marginLeft: 6,
                    color:
                      theme.colors.textSecondary,
                  }}
                >
                  {book.rating}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text
          style={{
            color:
              theme.colors.textSecondary,
          }}
        >
          BookQubit © 2026
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    margin: 16,
    padding: 24,

    borderRadius: 24,
  },

  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 38,
  },

  heroSubtitle: {
    fontSize: 16,
    marginTop: 12,
    lineHeight: 24,
  },

  heroButton: {
    marginTop: 20,

    paddingVertical: 14,

    borderRadius: 14,

    alignItems: 'center',
  },

  heroButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  statsContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    paddingHorizontal: 16,
  },

  statCard: {
    width: '31%',

    padding: 18,

    borderRadius: 20,

    alignItems: 'center',
  },

  statValue: {
    fontSize: 20,
    fontWeight: '800',

    marginTop: 8,
  },

  section: {
    marginTop: 30,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',

    marginBottom: 18,
  },

  categoryCard: {
    paddingVertical: 12,
    paddingHorizontal: 18,

    borderRadius: 999,

    marginRight: 12,

    borderWidth: 1,
  },

  bookCard: {
    flexDirection: 'row',

    padding: 18,

    borderRadius: 20,

    marginBottom: 16,
  },

  bookIcon: {
    width: 70,
    height: 70,

    borderRadius: 18,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 16,
  },

  bookTitle: {
    fontSize: 18,
    fontWeight: '700',

    marginBottom: 6,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 10,
  },

  footer: {
    alignItems: 'center',

    paddingVertical: 40,
  },
});