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
