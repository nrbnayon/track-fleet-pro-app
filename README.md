# 🚚 TrackFleet Pro

[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**TrackFleet Pro** is a high-performance, real-time fleet management and delivery tracking mobile application. Built for efficiency, it empowers drivers and dispatchers with seamless parcel tracking, real-time location updates, and intuitive delivery management.

---

## ✨ Key Features

- **📍 Real-time Tracking**: Foreground and background location tracking for precise delivery updates.
- **📦 Parcel Management**: Comprehensive dashboard to view, track, and manage deliveries.
- **🛡️ Secure Authentication**: Robust auth flow including OTP verification and secure storage.
- **📱 Profile Management**: Personalized driver profiles with camera integration for uploads.
- **🔔 Instant Notifications**: Stay updated with real-time alerts for new assignments or status changes.
- **🎨 Modern UI/UX**: Clean, responsive design with support for Light and Dark modes.
- **📞 Support Integration**: Quick access to contact and support features.

---

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 54) / [React Native](https://reactnative.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React Native](https://lucide.dev/)
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) app on your physical device or an Android/iOS emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd track-fleet-pro-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Connect your device**
   - Scan the QR code with the Expo Go app (Android) or Camera app (iOS).
   - Or press `a` for Android Emulator or `i` for iOS Simulator.

---

## 📁 Project Structure

```text
├── app/                # Main application routes (Expo Router)
│   ├── (auth)          # Authentication flow (Login, SignUp, etc.)
│   ├── (tabs)          # Main tab navigation (Home, Deliveries, etc.)
│   ├── parcel/         # Parcel-specific screens
│   └── profile/        # Profile and settings
├── components/         # Reusable UI components
├── constants/          # App constants, theme, and styling
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and library wrappers
├── store/              # Zustand state stores
└── assets/             # Images, fonts, and icons
```

---

## 🎨 Styling System

The project uses a custom design system based on **NativeWind**. Key theme colors:

- **Primary**: `#1D92ED` (TrackFleet Blue)
- **Secondary**: `#414141` (Deep Gray)
- **Background**: Modern, clean palette optimized for mobile readability.

For more details, see [STYLING_GUIDE.md](./STYLING_GUIDE.md).

---

## 🏗️ Building for Production

To create a production build, you can use EAS Build:

```bash
# For Android
npm run build:android

# For iOS
npm run build:ios
```

---

## 📝 License

This project is private and proprietary. All rights reserved.

---

<p align="center">
  Built with ❤️ for TrackFleet Pro Drivers
</p>
