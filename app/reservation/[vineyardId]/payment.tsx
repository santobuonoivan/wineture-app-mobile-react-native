import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "../../../components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { ConfirmModal } from "../../../components/ui/ConfirmModal";

export default function PaymentScreen() {
  const { vineyardId, date, time, people } = useLocalSearchParams<{
    vineyardId: string;
    date?: string;
    time?: string;
    people?: string;
  }>();
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handlePayment = async () => {
    // Validar campos
    if (
      !cardNumber.trim() ||
      !expiryDate.trim() ||
      !cvv.trim() ||
      !cardholderName.trim()
    ) {
      setShowErrorModal(true);
      return;
    }

    try {
      // Aquí iría la lógica de pago (llamada a API)
      console.log({
        cardNumber,
        expiryDate,
        cvv,
        cardholderName,
        saveCard,
      });

      // Simular procesamiento: siempre exitoso para testing
      const paymentSuccess = true;

      if (paymentSuccess) {
        // Navegar a pantalla de resumen exitoso
        router.push(`/reservation/${vineyardId}/summary?success=true`);
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error en el pago:", error);
      setShowErrorModal(true);
    }
  };

  return (
    <Screen>
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 pb-2">
        <TouchableOpacity
          className="w-12 h-12 items-center justify-center"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold flex-1 text-center">
          Método de Pago
        </Text>
        <View className="w-12 h-12" />
      </View>

      {/* Stepper */}
      <View className="flex-row items-center gap-3 py-5 px-4">
        <View className="flex-1 items-center gap-2">
          <View className="h-2 w-full rounded-full bg-[#c20a29]/20" />
          <Text className="text-zinc-400 text-xs font-medium">Visita</Text>
        </View>
        <View className="flex-1 items-center gap-2">
          <View className="h-2 w-full rounded-full bg-[#c20a29]" />
          <Text className="text-[#c20a29] text-xs font-semibold">Pago</Text>
        </View>
        <View className="flex-1 items-center gap-2">
          <View className="h-2 w-full rounded-full bg-[#c20a29]/20" />
          <Text className="text-zinc-400 text-xs font-medium">Resumen</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pb-32">
        {/* Número de Tarjeta */}
        <View className="mb-4">
          <Text className="text-white text-base font-medium pb-2">
            Número de Tarjeta
          </Text>
          <View className="relative">
            <TextInput
              className="w-full rounded-lg border border-zinc-700 bg-white/5 h-14 pl-12 pr-4 text-white text-base"
              placeholder="0000 0000 0000 0000"
              placeholderTextColor="#9ca3af"
              keyboardType="number-pad"
              maxLength={19}
              value={cardNumber}
              onChangeText={(text) => {
                // Auto-formatear con espacios cada 4 dígitos
                const cleaned = text.replace(/\s/g, "");
                const formatted =
                  cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
                setCardNumber(formatted);
              }}
            />
            <View className="absolute left-3 top-4">
              <Ionicons name="card-outline" size={24} color="#9ca3af" />
            </View>
          </View>
        </View>

        {/* Fecha de Vencimiento y CVV */}
        <View className="flex-row gap-4 mb-4">
          <View className="flex-1">
            <Text className="text-white text-base font-medium pb-2">
              Fecha de Vencimiento
            </Text>
            <View className="relative">
              <TextInput
                className="w-full rounded-lg border border-zinc-700 bg-white/5 h-14 pl-12 pr-4 text-white text-base"
                placeholder="MM/AA"
                placeholderTextColor="#9ca3af"
                keyboardType="number-pad"
                maxLength={5}
                value={expiryDate}
                onChangeText={(text) => {
                  // Auto-formatear MM/AA
                  const cleaned = text.replace(/\//g, "");
                  if (cleaned.length >= 2) {
                    setExpiryDate(
                      `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
                    );
                  } else {
                    setExpiryDate(cleaned);
                  }
                }}
              />
              <View className="absolute left-3 top-4">
                <Ionicons name="calendar-outline" size={24} color="#9ca3af" />
              </View>
            </View>
          </View>

          <View className="flex-1">
            <Text className="text-white text-base font-medium pb-2">CVV</Text>
            <View className="relative">
              <TextInput
                className="w-full rounded-lg border border-zinc-700 bg-white/5 h-14 pl-12 pr-4 text-white text-base"
                placeholder="123"
                placeholderTextColor="#9ca3af"
                keyboardType="number-pad"
                maxLength={3}
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
              />
              <View className="absolute left-3 top-4">
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color="#9ca3af"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Nombre del Titular */}
        <View className="mb-4">
          <Text className="text-white text-base font-medium pb-2">
            Nombre del Titular
          </Text>
          <View className="relative">
            <TextInput
              className="w-full rounded-lg border border-zinc-700 bg-white/5 h-14 pl-12 pr-4 text-white text-base"
              placeholder="Nombre como aparece en la tarjeta"
              placeholderTextColor="#9ca3af"
              value={cardholderName}
              onChangeText={setCardholderName}
            />
            <View className="absolute left-3 top-4">
              <Ionicons name="person-outline" size={24} color="#9ca3af" />
            </View>
          </View>
        </View>

        {/* Checkbox: Guardar tarjeta */}
        <TouchableOpacity
          className="flex-row items-center gap-3 py-6"
          onPress={() => setSaveCard(!saveCard)}
          activeOpacity={0.7}
        >
          <View
            className={`h-5 w-5 rounded border-2 items-center justify-center ${
              saveCard
                ? "bg-[#c20a29] border-[#c20a29]"
                : "bg-transparent border-zinc-600"
            }`}
          >
            {saveCard && <Ionicons name="checkmark" size={16} color="white" />}
          </View>
          <Text className="text-white text-base font-medium flex-1">
            Guardar esta tarjeta para futuras compras
          </Text>
        </TouchableOpacity>

        <View className="h-24" />
      </ScrollView>

      {/* Footer fijo con botón */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#221013] via-[#221013]/90 to-transparent">
        <TouchableOpacity
          className="w-full bg-[#c20a29] h-14 rounded-xl items-center justify-center flex-row gap-2"
          onPress={handlePayment}
        >
          <Text className="text-white text-base font-bold">Pagar Ahora</Text>
          <Ionicons name="card" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Modal de error */}
      <ConfirmModal
        isError
        visible={showErrorModal}
        title="Error en el pago"
        body="No se pudo procesar el pago. Por favor, verifica los datos de tu tarjeta e intenta nuevamente."
        acceptLabel="Entendido"
        onAccept={() => setShowErrorModal(false)}
        onClose={() => setShowErrorModal(false)}
      />
    </Screen>
  );
}
