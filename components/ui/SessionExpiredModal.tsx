import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useSessionStore } from "../../store/sessionStore";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

export default function SessionExpiredModal() {
  const router = useRouter();
  const expired = useSessionStore((s) => s.expired);
  const message = useSessionStore((s) => s.message);
  const clear = useSessionStore((s) => s.clear);
  const { signOut } = useAuth();
  const { t } = useTranslation();

  if (!expired) return null;

  const onSignIn = async () => {
    await signOut();
    clear();
    router.replace("/");
  };

  const onClose = () => {
    clear();
  };

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        zIndex: 9999,
      }}
    >
      <View
        style={{
          width: "100%",
          maxWidth: 540,
          backgroundColor: "#2a100e",
          borderRadius: 12,
          padding: 22,
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 6,
            color: "#fff",
          }}
        >
          {t ? t("auth.sessionExpiredTitle") : "Session expired"}
        </Text>
        <Text style={{ fontSize: 14, color: "#eee", marginBottom: 18 }}>
          {message ??
            (t
              ? t("auth.sessionExpiredMessage")
              : "For your security, we logged you out. Please sign in again.")}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              marginRight: 12,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: "#ccc" }}>
              {t ? t("common.close") : "Close"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onSignIn}
            style={{
              backgroundColor: "#e6a23c",
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#221013", fontWeight: "700" }}>
              {t ? t("auth.signIn") : "Sign in"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
