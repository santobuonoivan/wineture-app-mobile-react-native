import { View, Text } from "react-native";
export const Logo = (props: any) => (
  <View>
    <Text 
      className="text-white font-bold text-3xl pt-3 italic"
      style={{
        color: 'rgb(234, 234, 234, 0.8)',
        fontFamily: 'Montserrat Alternates',
        fontWeight: '700',
        fontStyle: 'italic',
        textShadowColor: 'rgb(145, 143, 143, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
      }}
    >
      Wineture
    </Text>
  </View>
);