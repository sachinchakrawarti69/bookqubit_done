import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function FadeIn({
  children,
  delay = 0,
}: any) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Animated.View style={{ opacity }}>
      {children}
    </Animated.View>
  );
}