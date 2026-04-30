import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {
  Ionicons,
  Feather,
} from '@expo/vector-icons';

import themes from '@/src/themes';

import { useThemeStore } from '@/store/themeStore';

export default function ExploreScreen() {
  const { currentTheme } =
    useThemeStore();

  const theme =
    themes[currentTheme];

  const trendingTopics = [
    'Artificial Intelligence',
    'Psychology',
    'Productivity',
    'Philosophy',
    'Startups',
    'History',
  ];

  const recommendations = [
    {
      title: 'Zero to One',
      author: 'Peter Thiel',
      category: 'Startup',
    },

    {
      title: 'Meditations',
      author: 'Marcus Aurelius',
      category: 'Philosophy',
    },

    {
      title: 'Thinking Fast and Slow',
      author: 'Daniel Kahneman',
      category: 'Psychology',
    },

    {
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      category: 'History',
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
      {/* HEADER */}
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color:
                theme.colors.textPrimary,
            },
          ]}
        >
          Explore Books
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color:
                theme.colors.textSecondary,
            },
          ]}
        >
          Discover trending knowledge &
          best reads.
        </Text>
      </View>

      {/* SEARCH */}
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor:
              theme.colors.surface,

            borderColor:
              theme.colors.border,
          },
        ]}
      >
        <Ionicons
          name="search"
          size={20}
          color={theme.colors.icon}
        />

        <TextInput
          placeholder="Search books..."
          placeholderTextColor={
            theme.colors.textSecondary
          }
          style={[
            styles.searchInput,
            {
              color:
                theme.colors.textPrimary,
            },
          ]}
        />
      </View>

      {/* TRENDING */}
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
          Trending Topics
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
        >
          {trendingTopics.map(
            (topic, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.topicCard,
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
                  {topic}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>

      {/* RECOMMENDED */}
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
          Recommended Reads
        </Text>

        {recommendations.map(
          (book, index) => (
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
                  color={
                    theme.colors.primary
                  }
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
                  style={styles.categoryRow}
                >
                  <Feather
                    name="tag"
                    size={14}
                    color={
                      theme.colors.icon
                    }
                  />

                  <Text
                    style={{
                      marginLeft: 6,
                      color:
                        theme.colors.textSecondary,
                    }}
                  >
                    {book.category}
                  </Text>
                </View>
              </View>
            </View>
          )
        )}
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text
          style={{
            color:
              theme.colors.textSecondary,
          }}
        >
          Explore infinite knowledge 📚
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 24,
  },

  searchContainer: {
    margin: 20,

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,

    borderRadius: 18,

    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,

    fontSize: 16,
  },

  section: {
    marginTop: 12,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',

    marginBottom: 18,
  },

  topicCard: {
    paddingVertical: 12,
    paddingHorizontal: 18,

    borderRadius: 999,

    marginRight: 12,

    borderWidth: 1,
  },

  bookCard: {
    flexDirection: 'row',

    padding: 18,

    borderRadius: 22,

    marginBottom: 16,
  },

  bookIcon: {
    width: 72,
    height: 72,

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

  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 10,
  },

  footer: {
    alignItems: 'center',

    paddingVertical: 40,
  },
});