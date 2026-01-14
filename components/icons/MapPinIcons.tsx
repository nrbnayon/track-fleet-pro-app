// components/icons/MapPinIcons.tsx
import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export const PickupMapPin = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M15.3033 13.7501L10 19.0534L4.6967 13.7501C1.76777 10.8211 1.76777 6.07241 4.6967 3.14348C7.62563 0.214544 12.3743 0.214544 15.3033 3.14348C18.2323 6.07241 18.2323 10.8211 15.3033 13.7501ZM10 11.7801C11.8409 11.7801 13.3333 10.2877 13.3333 8.44678C13.3333 6.60583 11.8409 5.11344 10 5.11344C8.15905 5.11344 6.66667 6.60583 6.66667 8.44678C6.66667 10.2877 8.15905 11.7801 10 11.7801Z"
      fill="url(#paint0_linear_pickup)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_pickup"
        x1="5.35442"
        y1="-0.164816"
        x2="24.4192"
        y2="13.0648"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#5190FE" />
        <Stop offset="1" stopColor="#B8D2FF" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export const DestinationMapPin = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M15.3033 13.7501L10 19.0534L4.6967 13.7501C1.76777 10.8211 1.76777 6.07241 4.6967 3.14348C7.62563 0.214544 12.3743 0.214544 15.3033 3.14348C18.2323 6.07241 18.2323 10.8211 15.3033 13.7501ZM10 11.7801C11.8409 11.7801 13.3333 10.2877 13.3333 8.44678C13.3333 6.60583 11.8409 5.11344 10 5.11344C8.15905 5.11344 6.66667 6.60583 6.66667 8.44678C6.66667 10.2877 8.15905 11.7801 10 11.7801Z"
      fill="url(#paint0_linear_destination)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_destination"
        x1="9.9999"
        y1="0.489143"
        x2="9.97387"
        y2="19.907"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF4069" />
        <Stop offset="1" stopColor="#FFA8B6" />
      </LinearGradient>
    </Defs>
  </Svg>
);