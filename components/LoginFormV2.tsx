import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";

export function LoginFormV2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forceLogin, setForceLogin] = useState(true);
  const { signIn, isLoading } = useAuth();
  const { t } = useLanguage();

  const handleLogin = async () => {
    if (!forceLogin) {
      if (!email || !password) {
        Alert.alert(t("common.error"), t("auth.fillFields"));
        return;
      }
    } else {
      setEmail("joseJ@example.com");
      setPassword("password123");
    }

    await signIn(email, password);
  };

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
              {/* Logo y título */}
              <View className="mb-8 items-center">
                <Ionicons
                  name="wine"
                  size={48}
                  color="#d41132"
                  className="mb-2"
                />
                <Text className="text-white font-bold text-2xl tracking-tight">
                  Wineture
                </Text>
              </View>

              {/* Título principal */}
              <Text className="text-white text-3xl font-bold text-center mb-6 mt-2">
                {t("auth.welcome")}
              </Text>

              {/* Formulario */}
              <View className="space-y-4">
                {/* Campo Email */}
                <View className="flex-col">
                  <Text className="text-white text-base font-medium mb-2">
                    {t("auth.email")}
                  </Text>
                  <View className="relative">
                    <View className="absolute left-4 top-0 h-14 justify-center z-10">
                      <Ionicons
                        name="mail-outline"
                        size={20}
                        color="rgba(255,255,255,0.5)"
                      />
                    </View>
                    <TextInput
                      className="w-full h-14 bg-white/10 border border-white/20 rounded-lg text-white pl-12 pr-4 text-base"
                      placeholder={t("auth.emailPlaceholder")}
                      placeholderTextColor="rgba(255,255,255,0.4)"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* Campo Contraseña */}
                <View className="flex-col">
                  <Text className="text-white text-base font-medium mb-2">
                    {t("auth.password")}
                  </Text>
                  <View className="relative">
                    <View className="absolute left-4 top-0 h-14 justify-center z-10">
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="rgba(255,255,255,0.5)"
                      />
                    </View>
                    <TextInput
                      className="w-full h-14 bg-white/10 border border-white/20 rounded-lg text-white pl-12 pr-12 text-base"
                      placeholder={t("auth.passwordPlaceholder")}
                      placeholderTextColor="rgba(255,255,255,0.4)"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      className="absolute right-4 top-0 h-14 justify-center"
                      onPress={() => setShowPassword(!showPassword)}
                      accessibilityLabel="Mostrar u ocultar contraseña"
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="rgba(255,255,255,0.5)"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* ¿Olvidaste tu contraseña? */}
                <View className="items-end pt-1">
                  <Pressable>
                    <Text className="text-white/60 text-sm underline">
                      {t("auth.forgotPassword")}
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* Botón de inicio de sesión */}
              <View className="w-full pt-6 pb-8">
                <TouchableOpacity
                  className={`w-full h-14 rounded-lg items-center justify-center flex-row ${
                    isLoading
                      ? "bg-[#d41132]/50"
                      : "bg-[#d41132] active:bg-[#d41132]/90"
                  }`}
                  onPress={handleLogin}
                  disabled={isLoading}
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
                      {t("auth.signIn")}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* Registro */}
              <View className="items-center">
                <Text className="text-white/60 text-sm">
                  {t("auth.noAccount")}{" "}
                  <Text className="font-bold text-white underline">
                    {t("auth.signUp")}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
