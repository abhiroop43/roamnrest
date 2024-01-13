import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import {ClerkProvider, useAuth} from "@clerk/clerk-expo";
import {SafeAreaView} from "react-native";

const CLERK_PUBLISHABLE_KEY= process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key);
        } catch  {
        }
    },
    async saveToken(key: string, token: string) {
        try {
            return SecureStore.setItemAsync(key, token);
        } catch  {
        }
    },
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    cabin: require('@/assets/fonts/Cabin-Regular.ttf'),
    'cabin-bold': require('@/assets/fonts/Cabin-Bold.ttf'),
    'cabin-semibold': require('@/assets/fonts/Cabin-SemiBold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
          {/*<SafeAreaView>*/}
              <RootLayoutNav />
          {/*</SafeAreaView>*/}
      </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const {isLoaded, isSignedIn} = useAuth();

    useEffect(() => {
        if(isLoaded && !isSignedIn) {
            router.push('/(modals)/login');
        }
    }, [isLoaded]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          presentation: 'modal',
          title: 'Login or Sign up',
          animation: 'slide_from_bottom',
          headerTitleStyle: {
            fontFamily: 'cabin-semibold',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="ios-close" size={28} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="listing/[id]" options={{ headerTitle: '' }} />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: 'transparentModal',
          animation: 'simple_push',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="ios-close" size={28} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
    // </ThemeProvider>
  );
}
