import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  Ionicons,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';

import themes from '@/src/themes';
import { useThemeStore } from '@/store/themeStore';

export default function LibraryScreen() {
  const { currentTheme } = useThemeStore();
  const theme = themes[currentTheme];

  // Sample library data
  const myBooks = [
    {
      id: 1,
      title: 'Atomic Habits',
      author: 'James Clear',
      progress: 75,
      coverColor: '#FF6B6B',
      category: 'Self Development',
    },
    {
      id: 2,
      title: 'Deep Work',
      author: 'Cal Newport',
      progress: 45,
      coverColor: '#4ECDC4',
      category: 'Productivity',
    },
    {
      id: 3,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      progress: 30,
      coverColor: '#FFE66D',
      category: 'Finance',
    },
    {
      id: 4,
      title: 'The Art of War',
      author: 'Sun Tzu',
      progress: 90,
      coverColor: '#95E77C',
      category: 'Philosophy',
    },
  ];

  const continueListening = [
    {
      id: 1,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      duration: '3h 24m left',
      coverColor: '#A78BFA',
    },
    {
      id: 2,
      title: 'Becoming',
      author: 'Michelle Obama',
      duration: '5h 12m left',
      coverColor: '#F687B3',
    },
  ];

  const readingStats = {
    totalBooks: 24,
    pagesRead: 3456,
    avgRating: 4.5,
    readingStreak: 12,
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.textPrimary,
            },
          ]}
        >
          My Library
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: theme.colors.textSecondary,
            },
          ]}
        >
          Your personal reading sanctuary
        </Text>
      </View>

      {/* STATS CARDS */}
      <View style={styles.statsContainer}>
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Ionicons
            name="book"
            size={24}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.statNumber,
              { color: theme.colors.textPrimary },
            ]}
          >
            {readingStats.totalBooks}
          </Text>
          <Text
            style={[
              styles.statLabel,
              { color: theme.colors.textSecondary },
            ]}
          >
            Total Books
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Feather
            name="book-open"
            size={24}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.statNumber,
              { color: theme.colors.textPrimary },
            ]}
          >
            {readingStats.pagesRead}
          </Text>
          <Text
            style={[
              styles.statLabel,
              { color: theme.colors.textSecondary },
            ]}
          >
            Pages Read
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <MaterialIcons
            name="local-fire-department"
            size={24}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.statNumber,
              { color: theme.colors.textPrimary },
            ]}
          >
            {readingStats.readingStreak}
          </Text>
          <Text
            style={[
              styles.statLabel,
              { color: theme.colors.textSecondary },
            ]}
          >
            Day Streak
          </Text>
        </View>
      </View>

      {/* CURRENTLY READING */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.textPrimary,
            },
          ]}
        >
          Currently Reading
        </Text>

        {myBooks.map((book) => (
          <View
            key={book.id}
            style={[
              styles.bookCard,
              {
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <View
              style={[
                styles.bookIcon,
                {
                  backgroundColor: book.coverColor + '20',
                },
              ]}
            >
              <Ionicons
                name="book"
                size={32}
                color={book.coverColor}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.bookTitle,
                  {
                    color: theme.colors.textPrimary,
                  },
                ]}
              >
                {book.title}
              </Text>

              <Text
                style={{
                  color: theme.colors.textSecondary,
                  marginBottom: 8,
                }}
              >
                {book.author}
              </Text>

              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      backgroundColor: theme.colors.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${book.progress}%`,
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.progressText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {book.progress}% complete
                </Text>
              </View>

              <View style={styles.categoryRow}>
                <Feather
                  name="tag"
                  size={14}
                  color={theme.colors.icon}
                />
                <Text
                  style={{
                    marginLeft: 6,
                    color: theme.colors.textSecondary,
                  }}
                >
                  {book.category}
                </Text>
              </View>
            </View>

            <TouchableOpacity>
              <Feather
                name="more-vertical"
                size={20}
                color={theme.colors.icon}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* CONTINUE LISTENING (AUDIOBOOKS) */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.textPrimary,
            },
          ]}
        >
          Continue Listening
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {continueListening.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={[
                styles.audioCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.audioIcon,
                  {
                    backgroundColor: book.coverColor + '20',
                  },
                ]}
              >
                <Ionicons
                  name="headset"
                  size={32}
                  color={book.coverColor}
                />
              </View>
              <Text
                style={[
                  styles.audioTitle,
                  { color: theme.colors.textPrimary },
                ]}
              >
                {book.title}
              </Text>
              <Text
                style={[
                  styles.audioDuration,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {book.duration}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* RECENTLY FINISHED */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.textPrimary,
            },
          ]}
        >
          Recently Finished
        </Text>

        <View
          style={[
            styles.finishedCard,
            {
              backgroundColor: theme.colors.surface,
            },
          ]}
        >
          <Ionicons
            name="checkmark-circle"
            size={48}
            color={theme.colors.primary}
          />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text
              style={[
                styles.finishedTitle,
                { color: theme.colors.textPrimary },
              ]}
            >
              The Midnight Library
            </Text>
            <Text
              style={{
                color: theme.colors.textSecondary,
              }}
            >
              Matt Haig
            </Text>
            <Text
              style={[
                styles.ratingText,
                { color: theme.colors.textSecondary },
              ]}
            >
              ★★★★☆ 4.5 • Finished 2 days ago
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.reviewButton,
              {
                backgroundColor: theme.colors.primary + '20',
              },
            ]}
          >
            <Text
              style={{
                color: theme.colors.primary,
                fontWeight: '600',
              }}
            >
              Review
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ADD BOOK BUTTON */}
      <TouchableOpacity
        style={[
          styles.addButton,
          {
            backgroundColor: theme.colors.primary,
          },
        ]}
      >
        <Ionicons
          name="add"
          size={24}
          color="#fff"
        />
        <Text
          style={{
            color: '#fff',
            fontWeight: '600',
            marginLeft: 8,
          }}
        >
          Add New Book
        </Text>
      </TouchableOpacity>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text
          style={{
            color: theme.colors.textSecondary,
          }}
        >
          Keep reading, keep growing 🌱
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 15,
    marginTop: 6,
    lineHeight: 22,
  },

  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },

  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 8,
  },

  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },

  section: {
    marginTop: 16,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 18,
  },

  bookCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 22,
    marginBottom: 14,
    alignItems: 'center',
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
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },

  progressContainer: {
    marginTop: 8,
    marginBottom: 8,
  },

  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },

  progressFill: {
    height: '100%',
    borderRadius: 3,
  },

  progressText: {
    fontSize: 12,
  },

  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  audioCard: {
    width: 160,
    padding: 16,
    borderRadius: 18,
    marginRight: 12,
    borderWidth: 1,
    alignItems: 'center',
  },

  audioIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  audioTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },

  audioDuration: {
    fontSize: 12,
  },

  finishedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 22,
    marginBottom: 24,
  },

  finishedTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },

  ratingText: {
    fontSize: 12,
    marginTop: 6,
  },

  reviewButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },

  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 16,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
});