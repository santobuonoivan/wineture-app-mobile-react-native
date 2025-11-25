import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/Screen";
import {
  OrderCheckoutData,
  useCheckoutStore,
} from "../../store/useCheckoutStore";
import { useLanguage } from "../../hooks/useLanguage";

const initialOrderCheckoutData: OrderCheckoutData = {
  fullName: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "México",
  saveAddress: true,
};

export default function CheckoutShipping() {
  const { t } = useLanguage();
  const { shippingData, setShippingData } = useCheckoutStore();
  const [form, setForm] = useState<OrderCheckoutData>(
    shippingData ?? initialOrderCheckoutData
  );

  const handleChange = (
    field: keyof OrderCheckoutData,
    value: string | boolean
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    setShippingData(form);
    router.push("/cart/checkout-payment");
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
          {t("shipping.title")}
        </Text>
        <View className="w-10 h-10" />
      </View>

      {/* Stepper */}
      <View className="flex-row items-center justify-center gap-3 py-5 px-4">
        <View className="flex-1 flex-col items-center gap-2">
          <View className="h-2 w-full rounded-full bg-[#c20a29]" />
          <Text className="text-[#c20a29] text-xs font-semibold">
            {t("shipping.stepper.shipping")}
          </Text>
        </View>
        <View className="flex-1 flex-col items-center gap-2">
          <View className="h-2 w-full rounded-full bg-[#c20a29]/20" />
          <Text className="text-zinc-400 text-xs font-medium">
            {t("shipping.stepper.payment")}
          </Text>
        </View>
        <View className="flex-1 flex-col items-center gap-2">
          <View className="h-2 w-full rounded-full bg-[#c20a29]/20" />
          <Text className="text-zinc-400 text-xs font-medium">
            {t("shipping.stepper.summary")}
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="flex-col gap-4">
          {/* Nombre completo */}
          <View className="flex flex-col w-full">
            <Text className="text-white text-base font-medium pb-2">
              {t("shipping.form.fullName.label")}
            </Text>
            <TextInput
              className="w-full rounded-lg bg-white/5 border border-zinc-700 text-white h-14 px-4 text-base"
              placeholder={t("shipping.form.fullName.placeholder")}
              placeholderTextColor="#9ca3af"
              value={form.fullName}
              onChangeText={(text) => handleChange("fullName", text)}
            />
          </View>

          {/* Dirección */}
          <View className="flex flex-col w-full">
            <Text className="text-white text-base font-medium pb-2">
              {t("shipping.form.address.label")}
            </Text>
            <TextInput
              className="w-full rounded-lg bg-white/5 border border-zinc-700 text-white h-14 px-4 text-base"
              placeholder={t("shipping.form.address.placeholder")}
              placeholderTextColor="#9ca3af"
              value={form.address}
              onChangeText={(text) => handleChange("address", text)}
            />
          </View>

          {/* Ciudad y Estado */}
          <View className="flex-row w-full flex-wrap gap-4">
            <View className="flex-1 min-w-[40%]">
              <Text className="text-white text-base font-medium pb-2">
                {t("shipping.form.city.label")}
              </Text>
              <TextInput
                className="w-full rounded-lg bg_white/5 border border-zinc-700 text-white h-14 px-4 text-base"
                placeholder={t("shipping.form.city.placeholder")}
                placeholderTextColor="#9ca3af"
                value={form.city}
                onChangeText={(text) => handleChange("city", text)}
              />
            </View>
            <View className="flex-1 min-w-[40%]">
              <Text className="text-white text-base font-medium pb-2">
                {t("shipping.form.state.label")}
              </Text>
              <TextInput
                className="w-full rounded-lg bg-white/5 border border-zinc-700 text-white h-14 px-4 text-base"
                placeholder={t("shipping.form.state.placeholder")}
                placeholderTextColor="#9ca3af"
                value={form.state}
                onChangeText={(text) => handleChange("state", text)}
              />
            </View>
          </View>

          {/* Código Postal y País */}
          <View className="flex-row w-full flex-wrap gap-4">
            <View className="flex-1 min-w-[40%]">
              <Text className="text-white text-base font-medium pb-2">
                {t("shipping.form.postalCode.label")}
              </Text>
              <TextInput
                className="w-full rounded-lg bg-white/5 border border-zinc-700 text-white h-14 px-4 text-base"
                placeholder={t("shipping.form.postalCode.placeholder")}
                placeholderTextColor="#9ca3af"
                value={form.postalCode}
                onChangeText={(text) => handleChange("postalCode", text)}
              />
            </View>
            <View className="flex-1 min-w-[40%]">
              <Text className="text-white text-base font-medium pb-2">
                {t("shipping.form.country.label")}
              </Text>
              <TextInput
                className="w-full rounded-lg bg-white/5 border border-zinc-700 text-white h-14 px-4 text-base"
                value={form.country}
                editable={false}
              />
            </View>
          </View>

          {/* Guardar dirección */}
          <View className="flex-row items-center gap-3 py-6">
            <Pressable
              onPress={() => handleChange("saveAddress", !form.saveAddress)}
              className="h-5 w-5 rounded border border-zinc-500 items-center justify-center"
            >
              {form.saveAddress && (
                <View className="h-3 w-3 rounded bg-[#c20a29]" />
              )}
            </Pressable>
            <Text className="text-white text-base font-medium">
              {t("shipping.form.saveAddress")}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View className="w-full flex-row bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#221013] to-transparent">
        <Pressable
          className="h-14 w-full flex-row items-center justify-center gap-2 rounded-xl bg-[#c20a29] px-6"
          onPress={handleContinue}
        >
          <Text className="text-base font-bold text-white">
            {t("shipping.continueButton")}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="white" />
        </Pressable>
      </View>
    </Screen>
  );
}
