import { Linking, TouchableOpacity, Text, View, Alert } from "react-native";
import { ISocialNetwork } from "../../interfaces/IVineyard";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  TwitterIcon,
  WebsiteIcon,
} from "../Icons";
import { useTranslation } from "react-i18next";

interface SocialNetworkButtonProps {
  url: string;
  Icon: any;
  name: string;
}

export const SocialNetworkButton = ({
  url,
  Icon,
  name,
}: SocialNetworkButtonProps) => {
  return (
    <TouchableOpacity
      className="flex-1 min-w-[45%] flex-row items-center justify-center gap-2 px-3 py-3 bg-[#800020]/20 rounded-lg"
      onPress={async () => {
        try {
          const finalUrl = url.startsWith("http") ? url : `https://${url}`;

          const supported = await Linking.canOpenURL(finalUrl);
          if (supported) {
            await Linking.openURL(finalUrl);
          } else {
            Alert.alert("Error", "No se puede abrir este enlace");
          }
        } catch (error) {
          console.error(`Error al abrir ${name}:`, error);
          Alert.alert("Error", `Ocurrió un error al abrir ${name}`);
        }
      }}
    >
      <Icon size={16} color="white" />
      <Text className="text-white font-bold text-sm">{name}</Text>
    </TouchableOpacity>
  );
};

interface SocialNetworkListProps {
  socialNetworks: ISocialNetwork;
}

export const SocialNetworkList = ({
  socialNetworks,
}: SocialNetworkListProps) => {
  const { t } = useTranslation();

  return (
    <View className="bg-[#482329] p-5 rounded-xl mb-4">
      <Text className="text-white text-lg font-bold mb-4">
        {t("socialNetworks.title")}
      </Text>
      <View className="flex-row flex-wrap gap-3">
        {socialNetworks.facebook && (
          <SocialNetworkButton
            url={socialNetworks.facebook}
            Icon={FacebookIcon}
            name={t("socialNetworks.facebook")}
          />
        )}
        {socialNetworks.website && (
          <SocialNetworkButton
            url={socialNetworks.website}
            Icon={WebsiteIcon}
            name={t("socialNetworks.website")}
          />
        )}
        {socialNetworks.instagram && (
          <SocialNetworkButton
            url={socialNetworks.instagram}
            Icon={InstagramIcon}
            name={t("socialNetworks.instagram")}
          />
        )}
        {socialNetworks.twitter && (
          <SocialNetworkButton
            url={socialNetworks.twitter}
            Icon={TwitterIcon}
            name={t("socialNetworks.twitter")}
          />
        )}
        {socialNetworks.tiktok && (
          <SocialNetworkButton
            url={socialNetworks.tiktok}
            Icon={TikTokIcon}
            name={t("socialNetworks.tiktok")}
          />
        )}
      </View>
    </View>
  );
};
