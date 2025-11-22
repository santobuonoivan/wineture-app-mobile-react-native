import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/Screen";
import { PaymentData, useCheckoutStore } from "../../store/useCheckoutStore";
import { ConfirmModal } from "../../components/ui/ConfirmModal";

const initialPaymentData: PaymentData = {
  cardNumber: "",
  expiry: "",
  cvv: "",
  cardHolder: "",
  saveCard: false,
};

export default function CheckoutPayment() {
  const { paymentData, setPaymentData } = useCheckoutStore();
  const [form, setForm] = useState<PaymentData>(
    paymentData ?? initialPaymentData
  );
  const [showError, setShowError] = useState(false);

  const handleChange = (field: keyof PaymentData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePay = () => {
    setPaymentData(form);
    // Regla especial: si el nombre es "test", siempre pasa como exitoso
    if (form.cardHolder.trim().toLowerCase() === "test") {
      router.push("/cart/checkout-summary");
      return;
    }

    // Simulación de call: si falta algún dato, mostramos error
    if (!form.cardNumber || !form.expiry || !form.cvv || !form.cardHolder) {
      setShowError(true);
      return;
    }
    router.push("/cart/checkout-summary");
  };

  return (
    <Screen>
      {/* Top App Bar */}
      <View className="flex-row items-center justify-between p-4 pb-2 border-b border-white/10">
        <Pressable
          className="w-10 h-10 items-center justify-center rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text className="text-white text-lg font-bold flex-1 text-center">
          Método de Pago
        </Text>
        <View className="w-10 h-10" />
      </View>

      {/* Stepper */}
      <View className="flex-row items-center justify-center gap-3 py-5 px-4">
        <View className="flex-1 flex-col items-center gap-2">
          <View className="h-2 w-full rounded-full bg-[#c20a29]/20" />
          <Text className="text-zinc-400 text-xs font-medium">Envío</Text>
        </View>
        <View className="flex-1 flex-col items-center gap-2">
          <View className="h-2 w-full rounded-full bg-[#c20a29]" />
          <Text className="text-[#c20a29] text-xs font-semibold">Pago</Text>
        </View>
        <View className="flex-1 flex-col items-center gap-2">
          <View className="h-2 w-full rounded-full bg-[#c20a29]/20" />
          <Text className="text-zinc-400 text-xs font-medium">Resumen</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="flex-col gap-4">
          {/* Número de Tarjeta */}
          <View className="relative flex w-full flex-col">
            <Text className="text-white text-base font-medium pb-2">
              Número de Tarjeta
            </Text>
            <View className="absolute left-3 top-11">
              <Ionicons name="card-outline" size={20} color="#9ca3af" />
            </View>
            <TextInput
              className="w-full rounded-lg bg-white/5 border border-zinc-700 text-white h-14 pl-12 pr-4 text-base"
              placeholder="0000 0000 0000 0000"
              placeholderTextColor="#9ca3af"
              keyboardType="number-pad"
              value={form.cardNumber}
              onChangeText={(text) => handleChange("cardNumber", text)}
            />
          </View>

          {/* Fecha de Vencimiento y CVV */}
          <View className="flex-row w-full flex-wrap gap-4">
            <View className="relative flex-1 min-w-[40%]">
              <Text className="text-white text-base font-medium pb-2">
                Fecha de Vencimiento
              </Text>
              <View className="absolute left-3 top-11">
                <Ionicons name="calendar-outline" size={20} color="#9ca3af" />
              </View>
              <TextInput
                className="w-full rounded-lg bg-white/5 border border-zinc-700 text-white h-14 pl-12 pr-4 text-base"
                placeholder="MM/AA"
                placeholderTextColor="#9ca3af"
                value={form.expiry}
                onChangeText={(text) => handleChange("expiry", text)}
              />
            </View>

            <View className="relative flex-1 min-w-[40%]">
              <Text className="text-white text-base font-medium pb-2">CVV</Text>
              <View className="absolute left-3 top-11">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#9ca3af"
                />
              </View>
              <TextInput
                className="w-full rounded-lg bg-white/5 border border-zinc-700 text-white h-14 pl-12 pr-4 text-base"
                placeholder="123"
                placeholderTextColor="#9ca3af"
                keyboardType="number-pad"
                secureTextEntry
                value={form.cvv}
                onChangeText={(text) => handleChange("cvv", text)}
              />
            </View>
          </View>

          {/* Nombre del Titular */}
          <View className="relative flex w-full flex-col">
            <Text className="text-white text-base font-medium pb-2">
              Nombre del Titular
            </Text>
            <View className="absolute left-3 top-11">
              <Ionicons name="person-outline" size={20} color="#9ca3af" />
            </View>
            <TextInput
              className="w-full rounded-lg bg-white/5 border border-zinc-700 text-white h-14 pl-12 pr-4 text-base"
              placeholder="Nombre como aparece en la tarjeta"
              placeholderTextColor="#9ca3af"
              value={form.cardHolder}
              onChangeText={(text) => handleChange("cardHolder", text)}
            />
          </View>

          {/* Guardar tarjeta */}
          <View className="flex-row items-center gap-3 py-6">
            <Pressable
              onPress={() => handleChange("saveCard", !form.saveCard)}
              className="h-5 w-5 rounded border border-zinc-500 items-center justify-center"
            >
              {form.saveCard && (
                <View className="h-3 w-3 rounded bg-[#c20a29]" />
              )}
            </Pressable>
            <Text className="text-white text-base font-medium">
              Guardar esta tarjeta para futuras compras
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View className="w-full flex-row bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#221013] to-transparent">
        <Pressable
          className="h-14 w-full flex-row items-center justify-center gap-2 rounded-xl bg-[#c20a29] px-6"
          onPress={handlePay}
        >
          <Text className="text-base font-bold text-white">Pagar Ahora</Text>
          <Ionicons name="card-outline" size={18} color="white" />
        </Pressable>
      </View>

      <ConfirmModal
        visible={showError}
        isError
        title="Error al procesar el pago"
        body="No se pudo procesar el pago. Revisa los datos de tu tarjeta e inténtalo nuevamente."
        acceptLabel="Entendido"
        cancelLabel="Cerrar"
        onAccept={() => setShowError(false)}
        onClose={() => setShowError(false)}
      />
    </Screen>
  );
}
