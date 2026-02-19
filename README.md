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



{
    "success": true,
    "status": 200,
    "message": "Assigned parcels retrieved.",
    "data": {
        "success": true,
        "status": 200,
        "message": "Data retrieved successfully",
        "count": 2,
        "total_pages": 2,
        "current_page": 1,
        "next": "http://localhost:8002/api/parcel/driver/all-parcels/?page=2&page_size=1&status=DELIVERED",
        "previous": null,
        "data": [
            {
                "id": 67,
                "tracking_id": "TRK305761509",
                "title": "Docs 1",
                "status": "DELIVERED",
                "estimated_delivary_date": "2026-02-24T00:00:00Z",
                "customer_name": "Mahedi 2",
                "customer_phone": "0193436656",
                "customer_email": "mahedijvai950@gmail.com",
                "vehicle_number": "dhaka-121215",
                "pickup_location": "48 Bir Uttam AK Khandakar Road, Dhaka 1212, Bangladesh",
                "delivery_location": "Mirpur, Bangladesh",
                "parcel_weight": 20.0,
                "parcel_type": "Docs 1",
                "special_instructions": "Deliver carefully",
                "appoximate_distance": "15.2 km",
                "pickup_coordinates": {
                    "lat": 23.780664,
                    "lng": 90.407492
                },
                "delivery_coordinates": {
                    "lat": 23.797911,
                    "lng": 90.449581
                },
                "driver": {
                    "id": "54f934e4-05b3-4738-94d3-7af5a274c1bc",
                    "full_name": "Rahim Store",
                    "phone_number": "018935052***",
                    "vehicle_number": "dhaka-121215",
                    "profile_image": "/profiles-images/360_F_539775570_UHCPOMEjIV0xnwkaMRyHoy6pbFJ78IsY.jpg",
                    "lat": 23.7808,
                    "lng": 94.4068,
                    "current_location": "Mohakhali, Dhaka"
                },
                "seller": {
                    "Full_name": "Rahim Store 2",
                    "phone_number": "01711223341"
                }
            }
        ]
    }
}


1.Driver home page get all parcel:
For assigned tabs:get: {{base_url}}/api/parcel/driver/all-parcels/?page=1&page_size=10&status=PENDING&ACCEPTED 

Header with bearer token

Get response: 
{
    "success": true,
    "status": 200,
    "message": "Accepted/Pending requests retrieved.",
    "data": {
        "success": true,
        "status": 200,
        "message": "Data retrieved successfully",
        "count": 3,
        "total_pages": 1,
        "current_page": 1,
        "next": null,
        "previous": null,
        "data": [
            {
                "id": 68,
                "tracking_id": "TRK984698980",
                "title": "Documant",
                "status": "PENDING",
                "estimated_delivary_date": null,
                "customer_name": "mahedi hasan",
                "customer_phone": "52451210",
                "customer_email": "mahedi.dev2002@gmail.com",
                "vehicle_number": "Not Updated vehicle number",
                "pickup_location": "Dhaka,Bangladesh",
                "delivery_location": "Jamalpur,Bangladesh",
                "parcel_weight": 5.0,
                "parcel_type": "Documants",
                "special_instructions": "Carefully deliver",
                "appoximate_distance": null,
                "pickup_coordinates": {
                    "lat": 24.1245,
                    "lng": 90.3654
                },
                "delivery_coordinates": {
                    "lat": 24.2278,
                    "lng": 90.4578
                },
                "driver": null,
                "seller": {
                    "Full_name": "Mahedi Hasan Noyon",
                    "phone_number": "015254541122"
                }
            },
            {
                "id": 66,
                "tracking_id": "TRK146152363",
                "title": "Docs 1",
                "status": "ASSIGNED",
                "estimated_delivary_date": "2026-02-24T00:00:00Z",
                "customer_name": "Mahedi",
                "customer_phone": "0193436656",
                "customer_email": "mahedijvai950@gmail.com",
                "vehicle_number": "dhaka-121215",
                "pickup_location": "48 Bir Uttam AK Khandakar Road, Dhaka 1212, Bangladesh",
                "delivery_location": "QCXX+5V2, Dhaka, Bangladesh",
                "parcel_weight": 20.0,
                "parcel_type": "Docs 1",
                "special_instructions": "Deliver carefully",
                "appoximate_distance": "15.2 km",
                "pickup_coordinates": {
                    "lat": 23.780664,
                    "lng": 90.407492
                },
                "delivery_coordinates": {
                    "lat": 23.797911,
                    "lng": 90.449581
                },
                "driver": {
                    "id": "54f934e4-05b3-4738-94d3-7af5a274c1bc",
                    "full_name": "Rahim Store",
                    "phone_number": "018935052***",
                    "vehicle_number": "dhaka-121215",
                    "profile_image": "/profiles-images/360_F_539775570_UHCPOMEjIV0xnwkaMRyHoy6pbFJ78IsY.jpg",
                    "lat": 23.7808,
                    "lng": 94.4068,
                    "current_location": "Mohakhali, Dhaka"
                },
                "seller": {
                    "Full_name": "Rahim Store 2",
                    "phone_number": "01711223341"
                }
            },
            {
                "id": 65,
                "tracking_id": "TRK943880142",
                "title": "Docs 1",
                "status": "ASSIGNED",
                "estimated_delivary_date": "2026-02-24T00:00:00Z",
                "customer_name": "Mahedi",
                "customer_phone": "0193436656",
                "customer_email": "mahedijvai950@gmail.com",
                "vehicle_number": "dhaka-121215",
                "pickup_location": "48 Bir Uttam AK Khandakar Road, Dhaka 1212, Bangladesh",
                "delivery_location": "QCXX+5V2, Dhaka, Bangladesh",
                "parcel_weight": 20.0,
                "parcel_type": "Docs 1",
                "special_instructions": "Deliver carefully",
                "appoximate_distance": "15.2 km",
                "pickup_coordinates": {
                    "lat": 23.780664,
                    "lng": 90.407492
                },
                "delivery_coordinates": {
                    "lat": 23.797911,
                    "lng": 90.449581
                },
                "driver": {
                    "id": "54f934e4-05b3-4738-94d3-7af5a274c1bc",
                    "full_name": "Rahim Store",
                    "phone_number": "018935052***",
                    "vehicle_number": "dhaka-121215",
                    "profile_image": "/profiles-images/360_F_539775570_UHCPOMEjIV0xnwkaMRyHoy6pbFJ78IsY.jpg",
                    "lat": 23.7808,
                    "lng": 94.4068,
                    "current_location": "Mohakhali, Dhaka"
                },
                "seller": {
                    "Full_name": "Rahim Store 2",
                    "phone_number": "01711223341"
                }
            }
        ]
    }
}

Here will come both status data PENDING and ASSIGNED (accepted) 
Now here need to show dynamic button in home page ParcelCard.tsx When Status pending show two button Reject and Accept when Assigned then show Start Trip 
when click the targeted button it api action will be done and go to the its details page, Reject with confirmation modal

---------------
For Ongoing Tab api get: {{base_url}}/api/parcel/driver/all-parcels/?page=1&page_size=10&status=ONGOING

response data structure same as above

For Completed: {{base_url}}/api/parcel/driver/all-parcels/?page=1&page_size=10&status=DELIVERED
response data structure same as above

------------------------
Getting a single parcel details by by parcel id


------------------------------------




