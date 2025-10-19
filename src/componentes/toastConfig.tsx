import React from "react";
import { View, Text } from "react-native";
import { BaseToastProps, ToastConfig } from "react-native-toast-message";

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const toastConfig: ToastConfig = {
  error: ({ text1, text2 }: CustomToastProps) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        borderWidth: 1,
        borderColor: "#D92D20",
        backgroundColor: "#FEF3F2",
        padding: 12,
        borderRadius: 8,
      }}
    >
      {text1 && (
        <Text style={{ color: "#D92D20", fontSize: 13, fontWeight: "600" }}>
          {text1}
        </Text>
      )}
      {text2 && (
        <Text
          style={{
            color: "#D92D20",
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
        borderColor: "#ABEFC6",
        backgroundColor: "#f2faf6ff",
        padding: 12,
        borderRadius: 8,
      }}
    >
      {text1 && (
        <Text style={{ color: "#067647", fontSize: 14, fontWeight: "600" }}>
          {text1}
        </Text>
      )}
      {text2 && (
        <Text style={{ color: "#067647", flexWrap: "wrap", fontWeight: "600" }}>
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
        borderColor: "#D92D20",
        backgroundColor: "#FEF3F2",
        padding: 12,
        borderRadius: 8,
      }}
    >
      {text1 && (
        <Text
          style={{
            color: "#D92D20",
            fontSize: 13,
            fontWeight: "600",
            flexWrap: "wrap",
          }}
        >
          {text1}
        </Text>
      )}
      {text2 && (
        <Text style={{ color: "#D92D20", flexWrap: "wrap" }}>{text2}</Text>
      )}
    </View>
  ),
};

export default toastConfig;
