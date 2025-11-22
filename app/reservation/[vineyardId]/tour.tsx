import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "../../../components/Screen";
import { Ionicons } from "@expo/vector-icons";

interface Companion {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function VineyardBookingScreen() {
  const { vineyardId } = useLocalSearchParams<{ vineyardId: string }>();
  const router = useRouter();

  // Estados del formulario principal
  const [selectedDate, setSelectedDate] = useState("18 de Octubre, 2024");
  const [selectedTime, setSelectedTime] = useState("12:00 PM");
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Estados para acompañantes
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [showCompanionModal, setShowCompanionModal] = useState(false);
  const [companionForm, setCompanionForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleAddCompanion = () => {
    if (
      companionForm.name.trim() &&
      companionForm.email.trim() &&
      companionForm.phone.trim()
    ) {
      const newCompanion: Companion = {
        id: Date.now().toString(),
        ...companionForm,
      };
      setCompanions([...companions, newCompanion]);
      setCompanionForm({ name: "", email: "", phone: "" });
      setShowCompanionModal(false);
    }
  };

  const handleRemoveCompanion = (id: string) => {
    setCompanions(companions.filter((c) => c.id !== id));
  };

  const handleConfirmReservation = () => {
    // Aquí iría la lógica para enviar la reserva
    console.log({
      selectedDate,
      selectedTime,
      numberOfPeople,
      fullName,
      email,
      phone,
      companions,
    });
    // Navegar a pantalla de pago
    router.push(
      `/reservation/${vineyardId}/payment?date=${selectedDate}&time=${selectedTime}&people=${numberOfPeople}`
    );
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
          Reservar Tour
        </Text>
        <View className="w-12 h-12" />
      </View>

      <ScrollView className="flex-1 px-4 pb-32">
        {/* Título principal */}
        <Text className="text-white text-[32px] font-bold leading-tight pb-3 pt-6">
          Reserva tu Tour por el Viñedo
        </Text>

        {/* Sección: Fecha y Hora */}
        <View className="mt-6">
          <Text className="text-white text-lg font-bold leading-tight pb-2 pt-4">
            Selecciona Fecha y Hora
          </Text>
          <View className="flex-row flex-wrap gap-4 py-3">
            {/* Fecha */}
            <View className="flex-1 min-w-[160px]">
              <Text className="text-[#c9929b] text-base font-medium pb-2">
                Fecha
              </Text>
              <View className="flex-row items-center rounded-lg border border-[#67323b] bg-[#33191e] h-14">
                <TextInput
                  className="flex-1 text-white px-4 text-base"
                  placeholder="Selecciona una fecha"
                  placeholderTextColor="#c9929b"
                  value={selectedDate}
                  onChangeText={setSelectedDate}
                />
                <View className="pr-4">
                  <Ionicons name="calendar-outline" size={24} color="#c9929b" />
                </View>
              </View>
            </View>

            {/* Hora */}
            <View className="flex-1 min-w-[160px]">
              <Text className="text-[#c9929b] text-base font-medium pb-2">
                Hora
              </Text>
              <View className="flex-row items-center rounded-lg border border-[#67323b] bg-[#33191e] h-14">
                <TextInput
                  className="flex-1 text-white px-4 text-base"
                  placeholder="Selecciona hora"
                  placeholderTextColor="#c9929b"
                  value={selectedTime}
                  onChangeText={setSelectedTime}
                />
                <View className="pr-4">
                  <Ionicons
                    name="chevron-down-outline"
                    size={24}
                    color="#c9929b"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Sección: Detalles del Grupo */}
        <View className="mt-6">
          <Text className="text-white text-lg font-bold leading-tight pb-2 pt-4">
            Detalles del Grupo
          </Text>
          <View className="flex-row items-center justify-between bg-[#33191e] p-4 rounded-lg border border-[#67323b]">
            <Text className="text-[#c9929b] text-base font-medium">
              Número de Personas
            </Text>
            <View className="flex-row items-center gap-4">
              <TouchableOpacity
                className="w-8 h-8 rounded-full bg-[#482329] items-center justify-center"
                onPress={() =>
                  setNumberOfPeople(Math.max(1, numberOfPeople - 1))
                }
              >
                <Text className="text-white text-2xl font-light">-</Text>
              </TouchableOpacity>
              <Text className="text-white text-lg font-bold w-4 text-center">
                {numberOfPeople}
              </Text>
              <TouchableOpacity
                className="w-8 h-8 rounded-full bg-[#482329] items-center justify-center"
                onPress={() => setNumberOfPeople(numberOfPeople + 1)}
              >
                <Text className="text-white text-2xl font-light">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Sección: Información de Contacto */}
        <View className="mt-6">
          <Text className="text-white text-lg font-bold leading-tight pb-2 pt-4">
            Información de Contacto
          </Text>
          <View className="flex flex-col gap-4">
            <View>
              <Text className="text-[#c9929b] text-base font-medium pb-2">
                Nombre Completo
              </Text>
              <TextInput
                className="w-full rounded-lg border border-[#67323b] bg-[#33191e] h-14 px-4 text-white text-base"
                placeholder="Tu nombre completo"
                placeholderTextColor="#c9929b"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View>
              <Text className="text-[#c9929b] text-base font-medium pb-2">
                Email
              </Text>
              <TextInput
                className="w-full rounded-lg border border-[#67323b] bg-[#33191e] h-14 px-4 text-white text-base"
                placeholder="tu@email.com"
                placeholderTextColor="#c9929b"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View>
              <Text className="text-[#c9929b] text-base font-medium pb-2">
                Teléfono
              </Text>
              <TextInput
                className="w-full rounded-lg border border-[#67323b] bg-[#33191e] h-14 px-4 text-white text-base"
                placeholder="+1 (555) 123-4567"
                placeholderTextColor="#c9929b"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>
        </View>

        {/* Sección: Acompañantes */}
        {numberOfPeople > 1 && (
          <View className="mt-6 pb-10">
            <View className="flex-row items-center justify-between pb-2 pt-4">
              <Text className="text-white text-lg font-bold leading-tight">
                Acompañantes ({companions.length}/{numberOfPeople - 1})
              </Text>
              <TouchableOpacity
                className="bg-[#d41132] px-4 py-2 rounded-lg"
                onPress={() => setShowCompanionModal(true)}
                disabled={companions.length >= numberOfPeople - 1}
              >
                <Text className="text-white font-bold text-sm">+ Agregar</Text>
              </TouchableOpacity>
            </View>

            {/* Lista de acompañantes */}
            {companions.map((companion) => (
              <View
                key={companion.id}
                className="bg-[#33191e] border border-[#67323b] rounded-lg p-4 mt-3"
              >
                <View className="flex-row items-start justify-between">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-base">
                      {companion.name}
                    </Text>
                    <Text className="text-[#c9929b] text-sm mt-1">
                      {companion.email}
                    </Text>
                    <Text className="text-[#c9929b] text-sm">
                      {companion.phone}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveCompanion(companion.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#d41132" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
        <View className="h-24" />
      </ScrollView>

      {/* Footer fijo con botón */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#221013] via-[#221013]/90 to-transparent">
        <TouchableOpacity
          className="w-full bg-[#d41132] h-14 rounded-xl items-center justify-center"
          onPress={handleConfirmReservation}
        >
          <Text className="text-white text-lg font-bold">Reservar Visita</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para agregar acompañante */}
      <Modal
        visible={showCompanionModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCompanionModal(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 items-center justify-center px-6"
          onPress={() => setShowCompanionModal(false)}
        >
          <Pressable
            className="w-full max-w-md bg-[#2b1518] border border-[#67323b] rounded-xl p-6"
            onPress={(e) => e.stopPropagation()}
          >
            <Text className="text-white text-xl font-bold mb-4">
              Agregar Acompañante
            </Text>

            <View className="mb-4">
              <Text className="text-[#c9929b] text-base font-medium pb-2">
                Nombre Completo
              </Text>
              <TextInput
                className="w-full rounded-lg border border-[#67323b] bg-[#33191e] h-12 px-4 text-white text-base"
                placeholder="Nombre del acompañante"
                placeholderTextColor="#c9929b"
                value={companionForm.name}
                onChangeText={(text) =>
                  setCompanionForm({ ...companionForm, name: text })
                }
              />
            </View>

            <View className="mb-4">
              <Text className="text-[#c9929b] text-base font-medium pb-2">
                Email
              </Text>
              <TextInput
                className="w-full rounded-lg border border-[#67323b] bg-[#33191e] h-12 px-4 text-white text-base"
                placeholder="email@ejemplo.com"
                placeholderTextColor="#c9929b"
                keyboardType="email-address"
                value={companionForm.email}
                onChangeText={(text) =>
                  setCompanionForm({ ...companionForm, email: text })
                }
              />
            </View>

            <View className="mb-6">
              <Text className="text-[#c9929b] text-base font-medium pb-2">
                Teléfono
              </Text>
              <TextInput
                className="w-full rounded-lg border border-[#67323b] bg-[#33191e] h-12 px-4 text-white text-base"
                placeholder="+1 (555) 000-0000"
                placeholderTextColor="#c9929b"
                keyboardType="phone-pad"
                value={companionForm.phone}
                onChangeText={(text) =>
                  setCompanionForm({ ...companionForm, phone: text })
                }
              />
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 h-12 rounded-lg border border-[#67323b] items-center justify-center"
                onPress={() => setShowCompanionModal(false)}
              >
                <Text className="text-white font-bold">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 h-12 rounded-lg bg-[#d41132] items-center justify-center"
                onPress={handleAddCompanion}
              >
                <Text className="text-white font-bold">Agregar</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}
