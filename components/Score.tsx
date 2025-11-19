import { View, Text } from "react-native";

export function Score({
  score,
  maxScore,
}: {
  score: number;
  maxScore: number;
}) {
  const getColor = () => {
    const percentage = (score / maxScore) * 100;
    if (percentage < 4) return "bg-red-500";
    if (percentage < 9.8) return "bg-yellow-500";
    return "bg-green-500";
  };

  const className = getColor();

  return (
    <View
      className={`${className} w-8 h-8 rounded-full justify-center items-center`}
    >
      <Text className="text-lg font-bold text-white">{score}</Text>
    </View>
  );
}
