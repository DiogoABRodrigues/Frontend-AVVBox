/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { styles } from "./styles/ProfileScreen.styles";
import { measuresService } from "../services/measuresService";
import { userService } from "../services/usersService";
import { Measures } from "../models/Measures";
import Popup from "../componentes/Popup";
import { User } from "../models/User";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const [userData, setUserData] = useState<User>(null);

  const isAdmin = user?.role === "Admin";
  const isPT = user?.role === "PT" || isAdmin;

  const [goalMeasures, setGoalMeasures] = useState<Measures | null>(null);
  const [measuresInput, setMeasuresInput] = useState<Record<string, string>>({});

  const [expandedAction, setExpandedAction] = useState<string | null>(null);

  const [editFormData, setEditFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
  });

  const toggleExpand = (title: string) => {
    setExpandedAction((prev) => (prev === title ? null : title));
  };

  const [popup, setPopup] = useState({
    visible: false,
    type: "success" as "success" | "error" | "confirm",
    title: "",
    message: "",
    onConfirm: undefined as (() => void) | undefined,
  });

  const handleCancelMeasures = () => {
    setExpandedAction(null);
    // repõe os objetivos originais
      setMeasuresInput({
        weight: goalMeasures.weight?.toString() || "",
        height: goalMeasures.height?.toString() || "",
        bodyFat: goalMeasures.bodyFat?.toString() || "",
        muscleMass: goalMeasures.muscleMass?.toString() || "",
        visceralFat: goalMeasures.visceralFat?.toString() || "",
      });
  };

  const handleCancelPerfil = () => {
    setExpandedAction(null);
    setEditFormData({
      name: userData?.name || "",
      email: userData?.email || "",
    });
  };

  const handleSavePerfil  = async () => {

    if (!editFormData) return;

    const updatedData: Partial<User> = {
      name: editFormData.name || userData.name,
      email: editFormData.email || userData.email,
    };

    try {
      const res = await userService.updateBasicInfo(userData._id, updatedData);

      if (res && res._id) {
        setPopup({
          visible: true,
          type: "success",
          title: "Sucesso",
          message: "Alteração guardada com sucesso!",
          onConfirm: undefined,
        });
      } else {
        setPopup({
          visible: true,
          type: "error",
          title: "Erro",
          message:
            "Ocorreu um erro ao guardar a alteração, verifique os dados e tente novamente.",
          onConfirm: undefined,
        });
      }

      fetchUserData();
    } catch {
      setPopup({
        visible: true,
        type: "error",
        title: "Erro",
        message: "Não foi possível guardar a alteração.",
        onConfirm: undefined,
      });
    }
  };

  const actions = [
    { title: "Editar Perfil", icon: "person-outline" },
    { title: "Definir Objetivos", icon: "golf-outline" },
    { title: "Gerir Utilizadores", icon: "people-outline" },
    { title: "Gerir PTs", icon: "barbell-outline" },
    { title: "Notificações", icon: "notifications-outline" },
    { title: "Contactos dos PTs", icon: "call-outline" },
    { title: "Logout", icon: "log-out-outline", isLogout: true, onPress: logout },
  ];

  const fetchUserData = async () => {
   if (user?.id) {
     const data = await userService.getById(user.id);
     setUserData(data);
      setEditFormData({
        name: data?.name,
        email: data?.email,
      });
   }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchMeasures = async () => {
    try {
      const measures = await measuresService.getGoalByUser(user.id);
      if (measures) {
        setGoalMeasures(measures);
        setMeasuresInput({
          weight: measures.weight?.toString() || "",
          height: measures.height?.toString() || "",
          bodyFat: measures.bodyFat?.toString() || "",
          muscleMass: measures.muscleMass?.toString() || "",
          visceralFat: measures.visceralFat?.toString() || "",
        });
      }
    } catch (err) {
      console.error("Erro ao ir buscar medidas do atleta:", err);
    }
  };

  useEffect(() => {
    fetchMeasures();
  }, []);

  const handleSaveMeasures = async () => {

    if (!goalMeasures) return;

    const data: Measures = {
      ...goalMeasures,
      weight: parseFloat(measuresInput.weight.replace(",", ".")) || goalMeasures.weight || 0,
      height: parseFloat(measuresInput.height.replace(",", ".")) || goalMeasures.height || 0,
      bodyFat: parseFloat(measuresInput.bodyFat.replace(",", ".")) || goalMeasures.bodyFat || 0,
      muscleMass: parseFloat(measuresInput.muscleMass.replace(",", ".")) || goalMeasures.muscleMass || 0,
      visceralFat: parseFloat(measuresInput.visceralFat.replace(",", ".")) || goalMeasures.visceralFat || 0,
      type: "goal",
    };

    try {
      const res = await measuresService.update(goalMeasures._id, data);

      if (res && res._id) {
        setPopup({
          visible: true,
          type: "success",
          title: "Sucesso",
          message: "Alteração guardada com sucesso!",
          onConfirm: undefined,
        });
      } else {
        setPopup({
          visible: true,
          type: "error",
          title: "Erro",
          message:
            "Ocorreu um erro ao guardar a alteração, verifique os dados e tente novamente.",
          onConfirm: undefined,
        });
      }

      fetchMeasures();
    } catch {
      setPopup({
        visible: true,
        type: "error",
        title: "Erro",
        message: "Não foi possível guardar o objetivo.",
        onConfirm: undefined,
      });
    }
  };

  const handleChange = (field: keyof Measures, value: string) => {
    const sanitized = value.replace(/[^0-9.,]/g, "");
    setMeasuresInput((prev) => ({
      ...prev,
      [field]: sanitized,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <Ionicons name="person-circle-outline" size={100} color="#1e293b" />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{userData?.name}</Text>
            <Text style={styles.email}>{userData?.email}</Text>
            <Text style={styles.email}>{userData?.role}</Text>
          </View>
        </View>

        {/* Ações */}
        {actions.map((action, index) => (
          <View key={index} style={styles.actionContainer}>
            <TouchableOpacity
              style={[
                styles.actionBox,
                action.isLogout && styles.logoutBox,
                expandedAction === action.title &&
                  !action.isLogout &&
                  styles.actionBoxExpanded,
              ]}
              onPress={() =>
                action.isLogout ? action.onPress?.() : toggleExpand(action.title)
              }
            >
              <View style={styles.actionLeft}>
                <Ionicons
                  name={action.icon as any}
                  size={24}
                  color={action.isLogout ? "#ff4d4d" : "#1E293B"}
                  style={styles.actionIcon}
                />
                <Text
                  style={[
                    styles.actionText,
                    action.isLogout && { color: "#ff4d4d" },
                  ]}
                >
                  {action.title}
                </Text>
              </View>
              {!action.isLogout && (
                <Ionicons
                  name={
                    expandedAction === action.title
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={20}
                  color="#6b7280"
                />
              )}
            </TouchableOpacity>
            {expandedAction === "Editar Perfil" && action.title === "Editar Perfil" && (
              <View style={styles.expandedContainer}>
                <View style={styles.formContainer}>
                  <ScrollView>
                    {[
                      { key: "name", label: "Nome", keyboard: "default" },
                      { key: "email", label: "Email", keyboard: "email-address" },
                    ].map((param) => (
                      <View key={param.key} style={{ marginBottom: 12 }}>
                        <Text style={styles.label}>{param.label}</Text>
                        <TextInput
                          keyboardType={param.keyboard as any}
                          style={styles.input}
                          value={editFormData[param.key as keyof typeof editFormData] || ""}
                          onChangeText={(val) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              [param.key]: val,
                            }))
                          }
                          autoCapitalize={
                            param.key === "email" ? "none" : "sentences"
                          }
                        />
                      </View>
                    ))}
                  </ScrollView>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={handleCancelPerfil}
                    >
                      <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={handleSavePerfil}
                    >
                      <Text style={styles.saveButtonText}>Guardar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            {expandedAction === "Definir Objetivos" &&
              action.title === "Definir Objetivos" && (
                <View style={styles.expandedContainer}>
                  <View style={styles.formContainer}>
                    <ScrollView>
                      {[
                        { key: "weight", label: "Peso" },
                        { key: "height", label: "Altura" },
                        { key: "bodyFat", label: "Gordura corporal" },
                        { key: "muscleMass", label: "Massa muscular" },
                        { key: "visceralFat", label: "Gordura visceral" },
                      ].map((param) => (
                        <View key={param.key} style={{ marginBottom: 12 }}>
                          <Text style={styles.label}>{param.label}</Text>
                          <TextInput
                            keyboardType="decimal-pad"
                            style={styles.input}
                            value={
                              measuresInput[param.key as keyof Measures] || ""
                            }
                            onChangeText={(val) =>
                              handleChange(param.key as keyof Measures, val)
                            }
                          />
                        </View>
                      ))}
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={handleCancelMeasures}
                      >
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSaveMeasures}
                      >
                        <Text style={styles.saveButtonText}>Guardar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
          </View>
        ))}

        <Popup
          visible={popup.visible}
          type={popup.type as any}
          title={popup.title}
          message={popup.message}
          onConfirm={popup.onConfirm}
          onCancel={() => setPopup((p) => ({ ...p, visible: false }))}
          onClose={() => setPopup((p) => ({ ...p, visible: false }))}
        />
      </ScrollView>
    </View>
  );
}
