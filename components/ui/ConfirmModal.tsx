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
}

export function ConfirmModal({
  visible,
  title = "Confirmar",
  body,
  acceptLabel = "Aceptar",
  cancelLabel = "Cancelar",
  onAccept,
  onClose,
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
        <View className="w-full rounded-2xl bg-[#2b1518] border border-white/10 p-6">
          {title ? (
            <Text className="text-white text-lg font-semibold mb-2">
              {title}
            </Text>
          ) : null}
          <Text className="text-[#e7d6d8] text-sm mb-6">{body}</Text>
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
