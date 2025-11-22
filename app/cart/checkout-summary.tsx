import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/Screen";
import { useCheckoutStore } from "../../store/useCheckoutStore";
import { useCartStore } from "../../store/useCartStore";

export default function CheckoutSummary() {
  const { shippingData } = useCheckoutStore();
  const { total } = useCartStore();

  const orderId = "#VIN-2024-0715";
  const orderDate = "15 Jul, 2024";

  return (
    <Screen>
      <View className="flex flex-1 flex-col p-4">
        <View className="flex flex-1 flex-col items-center justify-center text-center">
          <View className="flex h-24 w-24 items-center justify-center rounded-full bg-[#c20a29]/10 mb-6">
            <Ionicons name="checkmark-circle" size={64} color="#c20a29" />
          </View>
          <Text className="text-3xl font-bold tracking-tight mb-2 text-white">
            ¡Pago Exitoso!
          </Text>
          <Text className="text-zinc-400 max-w-sm text-center">
            Tu pedido ha sido confirmado. Recibirás un correo electrónico con
            los detalles de tu compra.
          </Text>

          <View className="mt-8 w-full max-w-sm rounded-xl border border-zinc-700 bg-white/5 p-4">
            <Text className="text-lg font-semibold mb-3 text-left text-white">
              Resumen del Pedido
            </Text>
            <View className="flex justify-between items-center text-sm mb-2 flex-row">
              <Text className="text-zinc-400">Pedido N°:</Text>
              <Text className="font-medium text-white">{orderId}</Text>
            </View>
            <View className="flex justify-between items-center text-sm mb-2 flex-row">
              <Text className="text-zinc-400">Fecha:</Text>
              <Text className="font-medium text-white">{orderDate}</Text>
            </View>
            <View className="h-px bg-zinc-700 my-3" />
            <View className="flex justify-between items-center text-base flex-row">
              <Text className="text-zinc-400">Total:</Text>
              <Text className="font-bold text-[#c20a29]">
                ${total.toFixed(2)} MXN
              </Text>
            </View>
          </View>
        </View>

        <View className="w-full pt-4 space-y-3">
          <Pressable
            className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#c20a29] px-6"
            onPress={() => router.push("/order/id")}
          >
            <Text className="text-base font-bold text-white">
              Ver Detalle del Pedido
            </Text>
          </Pressable>
          <Pressable
            className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-transparent px-6"
            onPress={() => router.push("/")}
          >
            <Text className="text-base font-bold text-[#c20a29]">
              Volver al Inicio
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
