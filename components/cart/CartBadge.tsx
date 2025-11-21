import { View, Text } from "react-native";

interface CartBadgeProps {
  count: number;
}

export function CartBadge({ count }: CartBadgeProps) {
  if (count === 0) {
    return null;
  }

  return (
    <View className="absolute -top-0 -left-0 bg-red-500 rounded-full min-w-5 h-5 flex items-center justify-center">
      <Text className="text-white text-xs font-bold">
        {count > 9 ? "9+" : count.toString()}
      </Text>
    </View>
  );
}
