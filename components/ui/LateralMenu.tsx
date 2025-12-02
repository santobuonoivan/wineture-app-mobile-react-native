import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { MenuIconFold } from "../Icons";
import { useAuth } from "../../hooks/useAuth";

type LateralMenuProps = {
  visible: boolean;
  onClose: () => void;
};

export function LateralMenu({ visible, onClose }: LateralMenuProps) {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  if (!visible) return null;

  return (
    <View className="absolute inset-0 z-30">
      {/* Overlay */}
      <Pressable className="absolute inset-0 bg-black/50" onPress={onClose} />

      {/* Drawer */}
      <View className="pt-7 absolute inset-y-0 left-0 w-4/5 max-w-[320px] bg-[#330309] shadow-2xl">
        <View className="flex-row items-center pl-9  pt-9 pb-4 border-b border-white/10">
          <Pressable className="bg-black/50" onPress={onClose}>
            <MenuIconFold />
          </Pressable>
        </View>

        <View className="flex-1 justify-between p-4">
          <View className="flex-col gap-2">
            <DrawerItem
              label="Catálogo de Vinos"
              icon={"wine_bar"}
              onPress={onClose}
            />
            <DrawerItem
              label="Mis Reservas"
              icon={"bookmark"}
              onPress={onClose}
            />

            <DrawerItem label="Ajustes" icon={"settings"} onPress={onClose} />
          </View>

          <View className="border-t border-white/10 pt-4">
            <DrawerItem
              label="Cerrar Sesión"
              icon={"logout"}
              onPress={handleLogout}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

type DrawerItemProps = {
  label: string;
  icon: string;
  active?: boolean;
  onPress?: () => void | Promise<void>;
};

function DrawerItem({ label, icon, active, onPress }: DrawerItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center gap-4 rounded-lg px-4 py-3 ${
        active ? "bg-[#d41132]/20" : ""
      }`}
    >
      {/* Placeholder icon using text for now */}
      <View className="w-6 items-center">
        <Text className="text-gray-200 text-xl">•</Text>
      </View>
      <Text
        className={`font-medium ${active ? "text-white" : "text-gray-200"}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
