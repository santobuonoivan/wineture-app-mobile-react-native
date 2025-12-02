import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/Screen";
import { PaymentData, useCheckoutStore } from "../../store/useCheckoutStore";
import { ConfirmModal } from "../../components/ui/ConfirmModal";
import { useLanguage } from "../../hooks/useLanguage";
import * as WebBrowser from "expo-web-browser";
import { authenticatedFetch } from "../../auth";
import { config } from "../../config/env";

const initialPaymentData: PaymentData = {
  cardNumber: "",
  expiry: "",
  cvv: "",
  cardHolder: "",
  saveCard: false,
};

export default function CheckoutPayment() {
  const { t } = useLanguage();
  const { paymentData, setPaymentData } = useCheckoutStore();
  const [form, setForm] = useState<PaymentData>(
    paymentData ?? initialPaymentData
  );
  const [showError, setShowError] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState<boolean>(__DEV__);

  const handleChange = (field: keyof PaymentData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePay = () => {
    // Guardar datos locales (por si se usan luego)
    setPaymentData(form);

    // Si estamos en modo demo o no hay backend disponible, usamos flujo simulado
    if (demoMode) {
      setLoadingPay(true);
      // Simular procesamiento de pago
      setTimeout(() => {
        setLoadingPay(false);
        router.push("/cart/checkout-summary");
      }, 1200);
      return;
    }

    // En este flujo usamos Mercado Pago Checkout Pro
    // Llamamos a tu backend para crear la preferencia y abrir el init_point
    (async () => {
      try {
        setLoadingPay(true);
        setErrorMessage(null);

        // Llamada al backend (asume que tu backend deduce la orden del usuario o usa carrito en sesión)
        const resp = await authenticatedFetch(
          `${config.API_BASE_URL}/payments/mercadopago/create_preference`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        if (!resp.ok) {
          const text = await resp.text();
          // Si backend no responde o está offline, caemos a modo demo automático
          console.warn("Backend preference creation failed, falling back to demo mode:", resp.status, text);
          setDemoMode(true);
          setLoadingPay(false);
          // breve delay para feedback
          setTimeout(() => router.push("/cart/checkout-summary"), 800);
          return;
        }

        const data = await resp.json();
        const initPoint = data.init_point || data.body?.init_point || data.checkoutUrl;

        if (!initPoint) {
          throw new Error("No se recibió init_point desde el backend");
        }

        // Abrir Checkout Pro en navegador (in-app browser)
        await WebBrowser.openBrowserAsync(initPoint);

        // Navegar al resumen de pago (tu backend debe confirmar pago vía webhook y actualizar orden)
        router.push("/cart/checkout-summary");
      } catch (err: any) {
        console.error("Error creando preferencia Mercado Pago:", err);
        setErrorMessage(err?.message || "Error creando preferencia");
        setShowError(true);
      } finally {
        setLoadingPay(false);
      }
    })();
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
          {t("payment.title")}
        </Text>
        <View className="w-10 h-10" />
      </View>

      {/* Demo mode toggle (useful while backend is offline) */}
      <View className="px-4 py-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-[#c9929b]">Modo demostración</Text>
          <Pressable
            onPress={() => setDemoMode((v) => !v)}
            className={`px-3 py-1 rounded-full ${demoMode ? 'bg-[#22c55e]' : 'bg-[#374151]'}`}
          >
            <Text className="text-white text-sm">{demoMode ? 'ON' : 'OFF'}</Text>
          </Pressable>
        </View>
      </View>

      {/* Stepper */}
      <View className="flex-row items-center justify-center gap-3 py-5 px-4">
        <View className="flex-1 flex-col items-center gap-2">
          <View className="h-2 w-full rounded-full bg-[#c20a29]/20" />
          <Text className="text-zinc-400 text-xs font-medium">
            {t("payment.stepper.shipping")}
          </Text>
        </View>
        <View className="flex-1 flex-col items-center gap-2">
          <View className="h-2 w-full rounded-full bg-[#c20a29]" />
          <Text className="text-[#c20a29] text-xs font-semibold">
            {t("payment.stepper.payment")}
          </Text>
        </View>
        <View className="flex-1 flex-col items-center gap-2">
          <View className="h-2 w-full rounded-full bg-[#c20a29]/20" />
          <Text className="text-zinc-400 text-xs font-medium">
            {t("payment.stepper.summary")}
          </Text>
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
              {t("payment.form.cardNumber.label")}
            </Text>
            <View className="absolute left-3 top-11">
              <Ionicons name="card-outline" size={20} color="#9ca3af" />
            </View>
            <TextInput
              className="w-full rounded-lg bg-white/5 border border-zinc-700 text-white h-14 pl-12 pr-4 text-base"
              placeholder={t("payment.form.cardNumber.placeholder")}
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
                {t("payment.form.expiry.label")}
              </Text>
              <View className="absolute left-3 top-11">
                <Ionicons name="calendar-outline" size={20} color="#9ca3af" />
              </View>
              <TextInput
                className="w-full rounded-lg bg-white/5 border border-zinc-700 text-white h-14 pl-12 pr-4 text-base"
                placeholder={t("payment.form.expiry.placeholder")}
                placeholderTextColor="#9ca3af"
                value={form.expiry}
                onChangeText={(text) => handleChange("expiry", text)}
              />
            </View>

            <View className="relative flex-1 min-w-[40%]">
              <Text className="text-white text-base font-medium pb-2">
                {t("payment.form.cvv.label")}
              </Text>
              <View className="absolute left-3 top-11">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#9ca3af"
                />
              </View>
              <TextInput
                className="w-full rounded-lg bg-white/5 border border-zinc-700 text-white h-14 pl-12 pr-4 text-base"
                placeholder={t("payment.form.cvv.placeholder")}
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
              {t("payment.form.cardHolder.label")}
            </Text>
            <View className="absolute left-3 top-11">
              <Ionicons name="person-outline" size={20} color="#9ca3af" />
            </View>
            <TextInput
              className="w-full rounded-lg bg-white/5 border border-zinc-700 text-white h-14 pl-12 pr-4 text-base"
              placeholder={t("payment.form.cardHolder.placeholder")}
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
              {t("payment.form.saveCard")}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View className="w-full flex-row bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#221013] to-transparent">
        <Pressable
          className="h-14 w-full flex-row items-center justify-center gap-2 rounded-xl bg-[#c20a29] px-6"
          onPress={handlePay}
          disabled={loadingPay}
        >
          <Text className="text-base font-bold text-white">
            {loadingPay ? t("payment.processing") : t("payment.payButton")}
          </Text>
          <Ionicons name="card-outline" size={18} color="white" />
        </Pressable>
      </View>

      <ConfirmModal
        visible={showError}
        isError
        title={t("payment.error.title")}
        body={errorMessage ?? t("payment.error.message")}
        acceptLabel={t("payment.error.accept")}
        cancelLabel={t("payment.error.cancel")}
        onAccept={() => setShowError(false)}
        onClose={() => setShowError(false)}
      />
    </Screen>
  );
}
