import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "./styles/MeasuresModal.styles";

interface Measures {
  weight: number;
  height: number;
  bodyFat: number;
  muscleMass: number;
  visceralFat: number;
  type: "atual" | "goal";
}

interface Props {
  visible: boolean;
  athleteName: string;
  onClose: () => void;
  onSave: (data: Measures) => void;
}

export default function MeasuresModal({
  visible,
  athleteName,
  onClose,
  onSave,
}: Props) {
  const [measuresInput, setMeasuresInput] = useState<
    Record<keyof Measures, string>
  >({
    weight: "",
    height: "",
    bodyFat: "",
    muscleMass: "",
    visceralFat: "",
    type: "atual",
  });

  const resetMeasures = () => {
    setMeasuresInput({
      weight: "",
      height: "",
      bodyFat: "",
      muscleMass: "",
      visceralFat: "",
      type: "atual",
    });
    setType("atual"); // se quiser resetar também o tipo
  };

  const [type, setType] = useState<"atual" | "goal">("atual");

  const handleChange = (field: keyof Measures, value: string) => {
    // Remove tudo que não seja número ou ponto/virgula
    const sanitized = value.replace(/[^0-9.,]/g, "");
    setMeasuresInput((prev) => ({
      ...prev,
      [field]: sanitized,
    }));
  };

  const handleSave = () => {
    const measuresToSave: Measures = {
      weight: parseFloat(measuresInput.weight.replace(",", ".")) || 0,
      height: parseFloat(measuresInput.height.replace(",", ".")) || 0,
      bodyFat: parseFloat(measuresInput.bodyFat.replace(",", ".")) || 0,
      muscleMass: parseFloat(measuresInput.muscleMass.replace(",", ".")) || 0,
      visceralFat: parseFloat(measuresInput.visceralFat.replace(",", ".")) || 0,
      type: type,
    };
    onSave(measuresToSave);
    resetMeasures();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{athleteName}</Text>

          <ScrollView>
            {[
              { key: "weight", label: "Peso" },
              { key: "height", label: "Altura" },
              { key: "bodyFat", label: "Gordura corporal" },
              { key: "muscleMass", label: "Massa muscular" },
              { key: "visceralFat", label: "Gordura visceral" },
            ].map((param) => (
              <View key={param.key} style={{ marginBottom: 12 }}>
                <Text style={styles.inputLabel}>{param.label}</Text>
                <TextInput
                  keyboardType="decimal-pad"
                  style={styles.modalInput}
                  value={measuresInput[param.key as keyof Measures]} // mantém como string
                  onChangeText={(val) =>
                    handleChange(param.key as keyof Measures, val)
                  }
                />
              </View>
            ))}
          </ScrollView>

          {/* Radio buttons para tipo */}
          <View style={styles.radioRow}>
            {["atual", "goal"].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.radioButtonRow}
                onPress={() => setType(option as "atual" | "goal")}
              >
                {/* Círculo do radio */}
                <View
                  style={[
                    styles.radioOuter,
                    type === option && styles.radioOuterSelected,
                  ]}
                >
                  {type === option && <View style={styles.radioInner} />}
                </View>
                {/* Texto do radio */}
                <Text style={styles.radioLabel}>
                  {option === "atual" ? "Medidas" : "Objetivo"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Botões de ação */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionLeft]}
              onPress={handleSave} // chama a função que já converte para número
            >
              <Text style={styles.actionButtonText}>Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.clearButton, styles.actionRight]}
              onPress={() => {
                onClose();
                resetMeasures();
              }}
            >
              <Text style={styles.clearButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
