import { useState } from "react";
import { Alert, TextInput, View, Text, TouchableOpacity } from "react-native";

type LoginFormProps = {
  onLogin?: (credentials: { email: string; password: string }) => void;
};

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    Alert.alert("Login", `Intentando ingresar con ${email}`);
    onLogin?.({ email, password });
  };

  return (
    <View className="w-full gap-4">
      <View className="gap-2">
        <Text className="text-sm font-semibold text-white">Correo</Text>
        <TextInput
          className="rounded-xl border border-white/30 px-4 py-3 text-white"
          placeholder="tu@correo.com"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View className="gap-2">
        <Text className="text-sm font-semibold text-white">Contraseña</Text>
        <TextInput
          className="rounded-xl border border-white/30 px-4 py-3 text-white"
          placeholder="••••••••"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        className="mt-2 rounded-xl bg-emerald-500 py-3"
        activeOpacity={0.85}
        onPress={handleSubmit}
      >
        <Text className="text-center text-base font-semibold text-black">
          Iniciar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}
