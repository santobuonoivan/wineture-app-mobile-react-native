import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "../hooks/useLanguage";
import { Language } from "../store/languageStore";

export function LanguageSelector() {
  const {
    currentLanguage,
    availableLanguages,
    switchLanguage,
    getLanguageNames,
    t,
  } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languageNames = getLanguageNames();

  const getFlag = (lang: Language) => {
    const flags = {
      es: "🇪🇸",
      en: "🇺🇸",
      pt: "🇧🇷",
    };
    return flags[lang];
  };

  const handleSelectLanguage = (lang: Language) => {
    switchLanguage(lang);
    setIsOpen(false);
  };

  const renderLanguageOption = ({ item }: { item: Language }) => (
    <TouchableOpacity
      className="flex-row items-center p-3 border-b border-white/10"
      onPress={() => handleSelectLanguage(item)}
    >
      <Text className="text-2xl mr-3">{getFlag(item)}</Text>
      <Text className="text-white flex-1">{languageNames[item]}</Text>
      {currentLanguage === item && (
        <Ionicons name="checkmark" size={20} color="#d41132" />
      )}
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity
        className="bg-white/10 border border-white/20 rounded-lg p-3 flex-row items-center justify-between"
        onPress={() => setIsOpen(true)}
      >
        <View className="flex-row items-center">
          <Text className="text-2xl mr-3">{getFlag(currentLanguage)}</Text>
          <Text className="text-white">{languageNames[currentLanguage]}</Text>
        </View>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="white"
        />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-center items-center"
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View className="bg-[#221013] border border-white/20 rounded-lg mx-8 w-80 max-w-full">
            <Text className="text-white font-bold text-lg p-4 border-b border-white/10">
              {t("profile.selectLanguage")}
            </Text>
            <FlatList
              data={availableLanguages}
              renderItem={renderLanguageOption}
              keyExtractor={(item) => item}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
