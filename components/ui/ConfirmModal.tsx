import { ReactNode } from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface ConfirmModalProps {
  visible: boolean;
  title?: string;
  body: string;
  acceptLabel?: string;
  cancelLabel?: string;
  onAccept: () => void;
  onClose: () => void;
  isError?: boolean;
}

export function ConfirmModal({
  visible,
  title = "Confirmar",
  body,
  acceptLabel = "Aceptar",
  cancelLabel = "Cancelar",
  onAccept,
  onClose,
  isError = false,
}: ConfirmModalProps) {
  const handleAccept = () => {
    onAccept();
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/60 items-center justify-center px-6">
        <View
          className={`w-full rounded-2xl border p-6 ${
            isError
              ? "bg-[#3b1114] border-[#ff4b5c]"
              : "bg-[#2b1518] border-white/10"
          }`}
        >
          {title ? (
            <Text className="text-white text-lg font-semibold mb-2">
              {title}
            </Text>
          ) : null}
          <Text
            className={`text-sm mb-6 ${
              isError ? "text-[#ffd7dc]" : "text-[#e7d6d8]"
            }`}
          >
            {body}
          </Text>
          <View className="flex-row justify-end gap-3">
            <Pressable
              onPress={onClose}
              className="px-4 py-2 rounded-full border border-white/20"
            >
              <Text className="text-white text-sm font-medium">
                {cancelLabel}
              </Text>
            </Pressable>
            <Pressable
              onPress={handleAccept}
              className="px-4 py-2 rounded-full bg-[#d41132]"
            >
              <Text className="text-white text-sm font-semibold">
                {acceptLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
