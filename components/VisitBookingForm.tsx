import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { getVineyardCalendarConfig } from "../lib";

export function VisitBookingForm({ vineyardId }: { vineyardId: number }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [visitors, setVisitors] = useState<{ name: string; email: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [calendar, setCalendar] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const includes = [
    "Recorrido por el viñedo",
    "Degustación de 3 vinos",
    "Charla con enólogo",
  ];

  const pricePerPerson = 30;
  const totalPersons = visitors.length + 1;

  useEffect(() => {
    const fetchCalendar = async () => {
      setLoading(true);
      const response = await getVineyardCalendarConfig({ vineyardId });

      if (response.status === 200 && response.data) {
        setCalendar(response.data);
      } else {
        setCalendar(null);
        setError("Este viñedo no tiene un calendario configurado actualmente.");
      }

      setLoading(false);
    };

    fetchCalendar();
  }, [vineyardId]);

  const addVisitor = () => {
    setVisitors((prev) => [...prev, { name: "", email: "" }]);
  };

  const removeVisitor = (index: number) => {
    setVisitors((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <View className="py-6 items-center">
        <ActivityIndicator />
        <Text className="mt-2 text-gray-300">Cargando disponibilidad...</Text>
      </View>
    );
  }

  const availableDates = calendar?.days || [];
  const availableTimes = calendar?.times || [];

  const isBlocked =
    !calendar || !availableDates.length || !availableTimes.length;

  return (
    <View>
      {error && (
        <View className="bg-red-800/40 border border-red-500 p-3 rounded-lg mb-4">
          <Text className="text-red-300 font-semibold">{error}</Text>
        </View>
      )}

      <View
        pointerEvents={isBlocked ? "none" : "auto"}
        style={{ opacity: isBlocked ? 0.4 : 1 }}
      >
        <Text className="text-white font-bold text-xl mb-4">
          Agendar una visita
        </Text>

        <Text className="text-gray-300 mb-1 font-semibold">
          * Fecha de visita
        </Text>

        <View className="border border-gray-600 rounded-lg px-4 py-3 mb-4 bg-[#111]">
          {availableDates.map((day: any) => (
            <Pressable
              key={`date-${day.dayId}`}
              onPress={() => setSelectedDate(day.date)}
              className={`py-2 ${
                selectedDate === day.date ? "opacity-100" : "opacity-60"
              }`}
            >
              <Text
                className={`text-gray-200 ${
                  selectedDate === day.date ? "text-[#CF9A3F] font-bold" : ""
                }`}
              >
                {day.date}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text className="text-gray-300 mb-1 font-semibold">* Hora</Text>

        <View className="border border-gray-600 rounded-lg px-4 py-3 mb-4 bg-[#111]">
          {availableTimes.map((time: any) => (
            <Pressable
              key={`time-${time.timeId}`}
              onPress={() => setSelectedTime(time.time)}
              className={`py-2 ${
                selectedTime === time.time ? "opacity-100" : "opacity-60"
              }`}
            >
              <Text
                className={`text-gray-200 ${
                  selectedTime === time.time ? "text-[#CF9A3F] font-bold" : ""
                }`}
              >
                {time.time}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text className="text-gray-300 mb-2 font-semibold">Incluye</Text>
        {includes.map((item, i) => (
          <View key={i} className="flex-row items-center mb-1">
            <Text className="text-[#CF9A3F] mr-2">✓</Text>
            <Text className="text-gray-200">{item}</Text>
          </View>
        ))}

        <View className="border-b border-gray-700 my-4" />

        <Text className="text-gray-300 font-semibold mb-2">
          Acompañantes (opcional)
        </Text>

        {visitors.map((v, index) => (
          <View key={index} className="mb-3">
            <View className="flex-row gap-2">
              <TextInput
                placeholder="Nombre"
                placeholderTextColor="#666"
                value={v.name}
                onChangeText={(txt) => {
                  const arr = [...visitors];
                  arr[index].name = txt;
                  setVisitors(arr);
                }}
                className="flex-1 border border-gray-600 bg-[#111] rounded-lg px-3 py-2 text-white"
              />

              <TextInput
                placeholder="Email"
                placeholderTextColor="#666"
                value={v.email}
                onChangeText={(txt) => {
                  const arr = [...visitors];
                  arr[index].email = txt;
                  setVisitors(arr);
                }}
                className="flex-1 border border-gray-600 bg-[#111] rounded-lg px-3 py-2 text-white"
              />

              <Pressable onPress={() => removeVisitor(index)}>
                <Text className="text-red-400 text-xl">−</Text>
              </Pressable>
            </View>
          </View>
        ))}

        <Pressable onPress={addVisitor} className="self-end mb-3">
          <Text className="text-[#CF9A3F] text-lg font-bold">+ Añadir</Text>
        </Pressable>

        <View className="border-b border-gray-700 my-4" />

        <Text className="text-gray-300 font-semibold">Precio por persona:</Text>
        <Text className="text-white font-bold mb-2">USD {pricePerPerson}</Text>

        <Text className="text-gray-300 font-semibold">
          Total ({totalPersons} {totalPersons === 1 ? "persona" : "personas"}):
        </Text>
        <Text className="text-[#CF9A3F] font-extrabold text-lg mb-4">
          USD {totalPersons * pricePerPerson}
        </Text>

        <Pressable
          onPress={() => alert("Visita registrada (demo)")}
          className="bg-[#CF9A3F] py-4 rounded-xl"
        >
          <Text className="text-black text-center font-bold text-base">
            Confirmar visita
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
