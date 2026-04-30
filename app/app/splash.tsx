import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function SplashScreenPage() {
  const router = useRouter();

  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    let isMounted = true;

    const start = async () => {
      try {
        // hide native splash safely
        await SplashScreen.hideAsync();

        // run animation
        Animated.parallel([
          Animated.timing(fade, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]).start();

        // navigation AFTER animation
        setTimeout(() => {
          if (isMounted) {
            // 🔥 FIX: avoid /intro if it doesn't exist
            router.replace("/(drawer)/(tabs)");
          }
        }, 1500);
      } catch (e) {
        console.log("Splash error:", e);
      }
    };

    start();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            opacity: fade,
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={styles.logo}>📚 BookQubit</Text>
        <Text style={styles.tagline}>Read • Learn • Grow</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    alignItems: "center",
  },
  logo: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#38bdf8",
  },
  tagline: {
    marginTop: 10,
    fontSize: 14,
    color: "#cbd5e1",
  },
});