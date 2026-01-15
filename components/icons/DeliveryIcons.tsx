
// components/icons/DeliveryIcons.tsx
import React from 'react';
import { View } from 'react-native';
import { Check } from 'lucide-react-native';
import Svg, { Path, G, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';

export function TruckIcon() {
  return (
    <Svg width="30" height="34" viewBox="0 0 30 34" fill="none">
      <Defs>
        <Filter id="filter0_d_417_2892" x="0" y="0" width="30" height="33.25" filterUnits="userSpaceOnUse">
          <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
          <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <FeOffset dy="1"/>
          <FeGaussianBlur stdDeviation="1"/>
          <FeComposite in2="hardAlpha" operator="out"/>
          <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_417_2892"/>
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_417_2892" result="shape"/>
        </Filter>
      </Defs>
      <G filter="url(#filter0_d_417_2892)">
        <Path d="M28 21.4353C28 24.1704 25.7827 26.3877 23.0476 26.3877H21.3536C20.0613 26.3877 18.8201 26.8928 17.8951 27.7953L15.6494 29.9863C15.2887 30.3379 14.7131 30.3381 14.3525 29.9863L12.1079 27.7958C11.1828 26.893 9.94152 26.3877 8.64899 26.3877H6.95238C4.21726 26.3877 2 24.1704 2 21.4353V5.95238C2 3.21726 4.21726 1 6.95238 1H23.0476C25.7827 1 28 3.21726 28 5.95238V21.4353Z" fill="white"/>
        <Path d="M20.625 18.25C20.625 19.2855 19.7855 20.125 18.75 20.125C17.7145 20.125 16.875 19.2855 16.875 18.25C16.875 17.2145 17.7145 16.375 18.75 16.375C19.7855 16.375 20.625 17.2145 20.625 18.25Z" stroke="#1D92ED" strokeWidth="1.125"/>
        <Path d="M13.125 18.25C13.125 19.2855 12.2855 20.125 11.25 20.125C10.2145 20.125 9.375 19.2855 9.375 18.25C9.375 17.2145 10.2145 16.375 11.25 16.375C12.2855 16.375 13.125 17.2145 13.125 18.25Z" stroke="#1D92ED" strokeWidth="1.125"/>
        <Path d="M16.875 18.25H13.125M7.5 8.125H15C16.0606 8.125 16.591 8.125 16.9205 8.45451C17.25 8.78401 17.25 9.31434 17.25 10.375V16.75M17.625 10H18.976C19.5983 10 19.9094 10 20.1673 10.146C20.4252 10.292 20.5853 10.5588 20.9054 11.0924L22.1794 13.2156C22.3387 13.4811 22.4183 13.6139 22.4592 13.7613C22.5 13.9087 22.5 14.0635 22.5 14.3733V16.375C22.5 17.0759 22.5 17.4264 22.3492 17.6875C22.2505 17.8585 22.1085 18.0005 21.9375 18.0992C21.6764 18.25 21.3259 18.25 20.625 18.25M7.5 14.875V16.375C7.5 17.0759 7.5 17.4264 7.65072 17.6875C7.74946 17.8585 7.89148 18.0005 8.0625 18.0992C8.32356 18.25 8.67403 18.25 9.375 18.25" stroke="#1D92ED" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M7.5 10.375H12M7.5 12.625H10.5" stroke="#1D92ED" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
      </G>
    </Svg>
  );
}

export function ParcelBoxIcon() {
  return (
    <Svg width="30" height="34" viewBox="0 0 30 34" fill="none">
      <Defs>
        <Filter id="filter0_d_box" x="0" y="0" width="30" height="33.25" filterUnits="userSpaceOnUse">
          <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
          <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <FeOffset dy="1"/>
          <FeGaussianBlur stdDeviation="1"/>
          <FeComposite in2="hardAlpha" operator="out"/>
          <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_box"/>
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_box" result="shape"/>
        </Filter>
      </Defs>
      <G filter="url(#filter0_d_box)">
        <Path d="M28 21.4353C28 24.1704 25.7827 26.3877 23.0476 26.3877H21.3536C20.0613 26.3877 18.8201 26.8928 17.8951 27.7953L15.6494 29.9863C15.2887 30.3379 14.7131 30.3381 14.3525 29.9863L12.1079 27.7958C11.1828 26.893 9.94152 26.3877 8.64899 26.3877H6.95238C4.21726 26.3877 2 24.1704 2 21.4353V5.95238C2 3.21726 4.21726 1 6.95238 1H23.0476C25.7827 1 28 3.21726 28 5.95238V21.4353Z" fill="white"/>
        <Path d="M9.5 11.5L15 8.5L20.5 11.5M15 8.5V14.5M15 8.5L9.5 11.5V17.5L15 20.5L20.5 17.5V11.5L15 8.5Z" stroke="#FFA500" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
      </G>
    </Svg>
  );
}

export function DeliveredIcon() {
  return (
    <Svg width="30" height="34" viewBox="0 0 30 34" fill="none">
      <Defs>
        <Filter id="filter0_d_417_2918" x="0" y="0" width="30" height="33.25" filterUnits="userSpaceOnUse">
          <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
          <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <FeOffset dy="1"/>
          <FeGaussianBlur stdDeviation="1"/>
          <FeComposite in2="hardAlpha" operator="out"/>
          <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_417_2918"/>
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_417_2918" result="shape"/>
        </Filter>
      </Defs>
      <G filter="url(#filter0_d_417_2918)">
        <Path d="M28 21.4353C28 24.1704 25.7827 26.3877 23.0476 26.3877H21.3536C20.0613 26.3877 18.8201 26.8928 17.8951 27.7953L15.6494 29.9863C15.2887 30.3379 14.7131 30.3381 14.3525 29.9863L12.1079 27.7958C11.1828 26.893 9.94152 26.3877 8.64899 26.3877H6.95238C4.21726 26.3877 2 24.1704 2 21.4353V5.95238C2 3.21726 4.21726 1 6.95238 1H23.0476C25.7827 1 28 3.21726 28 5.95238V21.4353Z" fill="white"/>
        <Path d="M7.875 10.75V15.25C7.875 18.0784 7.875 19.4927 8.75368 20.3713C9.63236 21.25 11.0466 21.25 13.875 21.25H15M22.125 14.5V10.75" stroke="#1E972C" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M8.90182 9.11096L7.875 10.75H22.125L21.1859 9.18477C20.5456 8.11766 20.2255 7.5841 19.7096 7.29205C19.1938 7 18.5716 7 17.3272 7H12.7153C11.4975 7 10.8886 7 10.3801 7.28147C9.87161 7.56295 9.54835 8.07896 8.90182 9.11096Z" stroke="#1E972C" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M15 10.75V7" stroke="#1E972C" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M13.5 13H16.5" stroke="#1E972C" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M16.875 19.75C16.875 19.75 17.625 19.75 18.375 21.25C18.375 21.25 20.0074 17.5 22.125 16.75" stroke="#1E972C" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
      </G>
    </Svg>
  );
}

export function CheckCircleIcon() {
  return (
    <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
      <Check size={14} color="white" strokeWidth={3} />
    </View>
  );
}