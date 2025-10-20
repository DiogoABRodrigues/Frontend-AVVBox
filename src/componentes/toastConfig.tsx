import { useThemeContext } from "@/context/ThemeContext";
import React from "react";
import { View, Text } from "react-native";
import { BaseToastProps, ToastConfig } from "react-native-toast-message";

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

  const { colors } = useThemeContext();

const toastConfig: ToastConfig = {
  error: ({ text1, text2 }: CustomToastProps) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        borderWidth: 1,
        borderColor: colors.red,
        backgroundColor: colors.redSuperLight,
        padding: 12,
        borderRadius: 8,
      }}
    >
      {text1 && (
        <Text style={{ color: colors.red, fontSize: 13, fontWeight: "600" }}>
          {text1}
        </Text>
      )}
      {text2 && (
        <Text
          style={{
            color: colors.red,
            fontSize: 13,
            flexWrap: "wrap",
            fontWeight: "600",
          }}
        >
          {text2}
        </Text>
      )}
    </View>
  ),

  success: ({ text1, text2 }: CustomToastProps) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        borderWidth: 1,
        borderColor: colors.green,
        backgroundColor: colors.superMegaLightGreen,
        padding: 12,
        borderRadius: 8,
      }}
    >
      {text1 && (
        <Text style={{ color: colors.darkgreen, fontSize: 14, fontWeight: "600" }}>
          {text1}
        </Text>
      )}
      {text2 && (
        <Text style={{ color: colors.darkgreen, flexWrap: "wrap", fontWeight: "600" }}>
          {text2}
        </Text>
      )}
    </View>
  ),

  delete: ({ text1, text2 }: CustomToastProps) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        borderWidth: 1,
        borderColor: colors.red,
        backgroundColor: colors.redSuperLight,
        padding: 12,
        borderRadius: 8,
      }}
    >
      {text1 && (
        <Text
          style={{
            color: colors.red,
            fontSize: 13,
            fontWeight: "600",
            flexWrap: "wrap",
          }}
        >
          {text1}
        </Text>
      )}
      {text2 && (
        <Text style={{ color: colors.red, flexWrap: "wrap" }}>{text2}</Text>
      )}
    </View>
  ),
};

export default toastConfig;
