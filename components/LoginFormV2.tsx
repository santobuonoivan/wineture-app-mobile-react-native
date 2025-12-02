import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";
import { useLanguage } from "../hooks/useLanguage";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

export function LoginFormV2() {
  const { signIn, isLoading, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [checkingToken, setCheckingToken] = useState(true);

  const handleLogin = async () => {
    const result = await signIn();
    if (result && (result as any).success) {
      router.replace("/");
    }
  };

  useEffect(() => {
    (async () => {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const idToken = await SecureStore.getItemAsync("idToken");

      if (accessToken && idToken) {
        router.replace("/");
      } else {
        setCheckingToken(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated]);

  const handleForceLogin = () => {
    if (__DEV__) {
      useAuthStore.getState().login({
        id: "dev",
        email: "dev@example.com",
        name: "Dev User",
        avatar: "",
        lang: "es",
      });
      router.replace("/");
    }
  };

  if (checkingToken) {
    return (
      <View className="flex-1 justify-center items-center bg-[#221013]">
        <ActivityIndicator size="large" color="#d41132" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#221013]">
      <ImageBackground
        source={{
          uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXwrEVXze-8TwTu7IPSHmb3MXdz9zJkEZGBkQwVarfxxrCQWYSqrJ_JOjx4L9AmVTl6bHvdOMRBhhoaKbiX84Mmwjq1fx5G0CzvGJXsWfwVXuIqrRzS5Dbaqhas-dSmYglmhtIoLGQ7GtZnMl3dQUtAX5oQowkeEhuFaB_IOIQx5GlPQ37CzQ1nPUV0dIROUBLm8XZ7V-4KCeybqSx80U-YOdjBxtP1fhfXndS1TfBmc1a1YmOO8OJJuxwc_pDRMw5sABlLSMGXTQ",
        }}
        className="flex-1"
        style={{ opacity: 0.9 }}
      >
        <LinearGradient
          colors={["transparent", "#221013cc", "#221013"]}
          className="flex-1"
        >
          <View className="flex-1 justify-center items-center px-4">
            <View className="w-full max-w-sm">
              <View className="mb-10 items-center">
                <Ionicons name="wine" size={48} color="#d41132" />
                <Text className="text-white font-bold text-2xl mt-2">
                  Wineture
                </Text>
              </View>

              <Text className="text-white text-3xl font-bold text-center mb-10">
                {t("auth.welcome")}
              </Text>

              <View className="w-full">
                <TouchableOpacity
                  onPress={handleLogin}
                  disabled={isLoading}
                  className={`w-full h-14 rounded-lg items-center justify-center flex-row ${
                    isLoading ? "bg-[#d41132]/60" : "bg-[#d41132]"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <ActivityIndicator
                        color="white"
                        size="small"
                        className="mr-2"
                      />
                      <Text className="text-white text-base font-bold">
                        {t("auth.signingIn")}
                      </Text>
                    </>
                  ) : (
                    <Text className="text-white text-base font-bold">
                      {t("auth.signInWithKeycloak")}
                    </Text>
                  )}
                </TouchableOpacity>
                {__DEV__ && (
                  <TouchableOpacity
                    onPress={handleForceLogin}
                    className="w-full h-12 rounded-lg items-center justify-center mt-3 bg-gray-600"
                  >
                    <Text className="text-white font-medium">Force login (dev)</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
