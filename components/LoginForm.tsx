import { useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type LoginFormProps = {
  onLogin?: (credentials: { email: string; password: string }) => void;
};

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onLogin?.({ email, password });
  };

  return (
    <LinearGradient
      colors={["#6B0F1A", "#9A031E"]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <View
          className="w-full max-w-[400px] bg-white rounded-2xl p-6"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 6,
          }}
        >
          <View className="items-center mb-6">
            <Image
              source={require("../assets/logo.webp")}
              style={{ height: 80, width: 80, resizeMode: "contain" }}
            />
          </View>

          <Text className="text-center text-[14px] text-black/70 tracking-widest mb-6">
            INICIA SESIÓN EN TU CUENTA
          </Text>

          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.85}
            className="bg-[#800020] py-3 rounded-lg flex-row justify-center items-center"
          >
            <Text className="text-white text-[16px] font-semibold">
              Entra con SSO
            </Text>
          </TouchableOpacity>

          <View className="my-6 border-b border-gray-300" />

          <TouchableOpacity onPress={() => {}}>
            <Text className="text-center text-black/60">
              Si eres nuevo regístrate
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
