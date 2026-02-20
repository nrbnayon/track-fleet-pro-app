import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { shadows } from '@/lib/shadows';

export const ParcelCardSkeleton = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 overflow-hidden" style={shadows.card}>
      {/* Tracking Number Skeleton */}
      <View className="mb-4">
        <View className="bg-gray-200 h-3 w-32 rounded" />
      </View>

      <View className="flex-row mb-6">
        {/* Timeline Skeleton */}
        <View className="mr-4 items-center">
          <View className="w-8 h-8 rounded-md bg-gray-200" />
          <View className="w-0.5 flex-1 bg-gray-200 my-1" />
          <View className="w-8 h-8 rounded-md bg-gray-200" />
        </View>

        {/* Content Skeleton */}
        <View className="flex-1 justify-between py-1">
          <View className="flex-row justify-between mb-6">
            <View>
              <View className="bg-gray-200 h-3 w-12 rounded mb-2" />
              <View className="bg-gray-200 h-4 w-24 rounded" />
            </View>
            <View className="items-end">
              <View className="bg-gray-200 h-3 w-24 rounded mb-2" />
              <View className="bg-gray-200 h-3 w-32 rounded" />
            </View>
          </View>

          <View className="flex-row justify-between">
            <View>
              <View className="bg-gray-200 h-3 w-16 rounded mb-2" />
              <View className="bg-gray-200 h-4 w-28 rounded" />
            </View>
            <View className="items-end">
              <View className="bg-gray-200 h-3 w-24 rounded mb-2" />
              <View className="bg-gray-200 h-3 w-32 rounded" />
            </View>
          </View>
        </View>
      </View>

      {/* Button Skeleton */}
      <View className="bg-gray-200 rounded-full py-3 h-12" />

      {/* Shimmer Effect */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: [{ translateX }],
        }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.4)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, width: 300 }}
        />
      </Animated.View>
    </View>
  );
};

export const DeliveryCardSkeleton = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return (
    <View className="bg-white rounded-2xl p-4 mb-5 overflow-hidden" style={shadows.card}>
      {/* Header Skeleton */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="bg-gray-200 h-4 w-40 rounded" />
        <View className="bg-gray-200 h-6 w-20 rounded-full" />
      </View>

      <View className="flex-row">
        {/* Timeline Skeleton */}
        <View className="mr-4 items-center">
          <View className="w-8 h-8 rounded-md bg-gray-200" />
          <View className="w-0.5 flex-1 bg-gray-200 my-1" />
          <View className="w-8 h-8 rounded-md bg-gray-200" />
        </View>

        {/* Content Skeleton */}
        <View className="flex-1 gap-4">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-2">
              <View className="bg-gray-200 h-3 w-12 rounded mb-2" />
              <View className="bg-gray-200 h-3 w-24 rounded" />
            </View>
            <View className="items-end">
              <View className="bg-gray-200 h-3 w-24 rounded mb-2" />
              <View className="bg-gray-200 h-3 w-32 rounded" />
            </View>
          </View>

          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-2">
              <View className="bg-gray-200 h-3 w-20 rounded mb-2" />
              <View className="bg-gray-200 h-3 w-28 rounded" />
            </View>
            <View className="items-end">
              <View className="bg-gray-200 h-3 w-28 rounded mb-2" />
              <View className="bg-gray-200 h-3 w-32 rounded" />
            </View>
          </View>
        </View>
      </View>

      {/* Shimmer Effect */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: [{ translateX }],
        }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.4)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, width: 300 }}
        />
      </Animated.View>
    </View>
  );
};

// ─── Detail page skeleton ─────────────────────────────────────────────────────
export const ParcelDetailSkeleton = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-350, 350],
  });

  const bg = '#E5E7EB'; // gray-200

  return (
    <View style={{ flex: 1, backgroundColor: 'white', overflow: 'hidden' }}>

      {/* ── Top bar ── */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: bg }} />
          <View style={{ height: 18, width: 140, borderRadius: 8, backgroundColor: bg }} />
        </View>
        <View style={{ height: 26, width: 74, borderRadius: 50, backgroundColor: bg }} />
      </View>

      {/* ── Tracking ID row ── */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 16 }}>
        <View style={{ height: 13, width: 60, borderRadius: 6, backgroundColor: bg }} />
        <View style={{ height: 18, width: 130, borderRadius: 6, backgroundColor: bg }} />
      </View>

      {/* ── Journey card ── */}
      <View
        style={{
          marginHorizontal: 20, marginBottom: 20,
          backgroundColor: 'white', borderRadius: 16, padding: 20,
          shadowColor: '#979393', shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.22, shadowRadius: 24, elevation: 6,
        }}
      >
        {/* Route header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <View>
            <View style={{ height: 11, width: 44, borderRadius: 4, backgroundColor: bg, marginBottom: 6 }} />
            <View style={{ height: 14, width: 100, borderRadius: 6, backgroundColor: bg }} />
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={{ height: 11, width: 70, borderRadius: 4, backgroundColor: bg, marginBottom: 6 }} />
            <View style={{ height: 14, width: 80, borderRadius: 6, backgroundColor: bg }} />
          </View>
        </View>

        {/* Progress line + dots */}
        <View style={{ marginBottom: 24, marginTop: 8, position: 'relative', height: 12 }}>
          <View style={{ position: 'absolute', left: 0, right: 0, top: 5, height: 2, backgroundColor: bg }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <View key={i} style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: bg }} />
            ))}
          </View>
        </View>

        {/* From section */}
        <View style={{ marginBottom: 20 }}>
          <View style={{ height: 11, width: 80, borderRadius: 4, backgroundColor: bg, marginBottom: 8 }} />
          <View style={{ height: 15, width: 160, borderRadius: 6, backgroundColor: bg, marginBottom: 10 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <View style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: bg }} />
            <View style={{ height: 12, flex: 1, borderRadius: 4, backgroundColor: bg }} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: bg }} />
            <View style={{ height: 12, width: 110, borderRadius: 4, backgroundColor: bg }} />
          </View>
        </View>

        {/* To section */}
        <View style={{ marginBottom: 20 }}>
          <View style={{ height: 11, width: 60, borderRadius: 4, backgroundColor: bg, marginBottom: 8 }} />
          <View style={{ height: 15, width: 140, borderRadius: 6, backgroundColor: bg, marginBottom: 10 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <View style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: bg }} />
            <View style={{ height: 12, flex: 1, borderRadius: 4, backgroundColor: bg }} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: bg }} />
            <View style={{ height: 12, width: 100, borderRadius: 4, backgroundColor: bg }} />
          </View>
        </View>

        {/* Meta: type | weight */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 14 }}>
          <View>
            <View style={{ height: 11, width: 70, borderRadius: 4, backgroundColor: bg, marginBottom: 6 }} />
            <View style={{ height: 14, width: 90, borderRadius: 6, backgroundColor: bg }} />
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={{ height: 11, width: 80, borderRadius: 4, backgroundColor: bg, marginBottom: 6 }} />
            <View style={{ height: 14, width: 60, borderRadius: 6, backgroundColor: bg }} />
          </View>
        </View>
      </View>

      {/* ── Shimmer sweep ── */}
      <Animated.View
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          transform: [{ translateX }],
        }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.45)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, width: 350 }}
        />
      </Animated.View>

      {/* ── Bottom action bar skeleton ── */}
      <View
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#F3F4F6', padding: 20,
        }}
      >
        <View style={{ height: 52, borderRadius: 12, backgroundColor: bg }} />
      </View>
    </View>
  );
};
