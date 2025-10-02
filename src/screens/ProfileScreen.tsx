/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
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
import * as Clipboard from "expo-clipboard";
import { Settings } from "../models/Settings";
import { settingsService } from "../services/settingsService";
import ChangeAthletesModal from "../componentes/ChangeAthletesModal";
import ChangePtsModal from "../componentes/ChangePtsModal";
import ChangeRoleModal from "../componentes/ChangeRoleModal";
import { availabilityService } from "../services/availabilityService";
import { Availability } from "../models/Availability";
import Toast from "react-native-toast-message";

export default function ProfileScreen() {
  const emptyUser: User = {
    _id: "",
    name: "",
    email: "",
    phoneNumber: "123456789",
    role: "atleta",
    active: true,
    coach: [],
    atheletes: [],
  };

  let { user } = useAuth();

  if (!user) {
    user = emptyUser; // Garantir que user nunca é null
  }

  const [userData, setUserData] = useState<User>({
    _id: "",
    name: "",
    email: "",
    phoneNumber: "123456789",
    role: "atleta",
    active: true,
    coach: [],
    atheletes: [],
  });

  const { logout } = useAuth();
  const isAdmin = user?.role === "Admin";
  const isPT = user?.role === "PT" || isAdmin;

  const [goalMeasures, setGoalMeasures] = useState<Measures>({
    weight: 0,
    height: 0,
    bodyFat: 0,
    muscleMass: 0,
    visceralFat: 0,
  });

  const [measuresInput, setMeasuresInput] = useState<Record<string, string>>(
    {}
  );

  const [users, setUsers] = useState<User[]>([]);

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [activeFilter, setActiveFilter] = useState<
    "todos" | "ativos" | "inativos"
  >("ativos");
  const [roleFilter, setRoleFilter] = useState<
    "todos" | "atleta" | "PT" | "Admin"
  >("todos");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [expandedAction, setExpandedAction] = useState<string | null>(null);

  const [roleChangeTarget, setRoleChangeTarget] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<"atleta" | "PT" | "Admin">(
    "atleta"
  );

  const [relationTarget, setRelationTarget] = useState<{
    type: "pts" | "atheletes";
    user: User;
  } | null>(null);

  const [isRoleModalVisible, setRoleModalVisible] = useState(false);
  const [isPtsModalVisible, setPtsModalVisible] = useState(false);
  const [isAthletesModalVisible, setAthletesModalVisible] = useState(false);

  const [availability, setAvailability] = useState<Availability>({
    PT: user?._id || "",
    Monday: { working: true, intervals: [] },
    Tuesday: { working: true, intervals: [] },
    Wednesday: { working: true, intervals: [] },
    Thursday: { working: true, intervals: [] },
    Friday: { working: true, intervals: [] },
    Saturday: { working: false, intervals: [] },
    Sunday: { working: false, intervals: [] },
    maxAthletesPerHour: 1,
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    phoneNumber: "",
  });

  const [notificationSettings, setNotificationSettings] = useState<Settings>({
    fifteenMin: false,
    thirtyMin: false,
    sixtyMin: false,
    onetwentyMin: false,
    trainingPending: false,
    trainingApproved: false,
    trainingRejected: false,
    trainingCanceled: false,
  });

  const toggleExpand = (title: string) => {
    setExpandedAction((prev) => (prev === title ? null : title));
    // Close any open menus when expanding/collapsing sections
    setActiveMenu(null);
  };

  const [popup, setPopup] = useState({
    visible: false,
    type: "success" as "success" | "error" | "confirm",
    title: "",
    message: "",
    onConfirm: undefined as (() => void) | undefined,
  });

  // Estados para PTs/Admins (contactos)
  const [ptsAndAdmins, setPtsAndAdmins] = useState<User[]>([]);

  // Filter users based on active filters
  const filterUsers = () => {
    let filtered = users;

    // Filter by active status
    if (activeFilter === "ativos") {
      filtered = filtered.filter((u) => u.active);
    } else if (activeFilter === "inativos") {
      filtered = filtered.filter((u) => !u.active);
    }

    // Filter by role
    if (roleFilter !== "todos") {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    filterUsers();
  }, [users, activeFilter, roleFilter]);

  const fetchNotificationSettings = async () => {
    if (!user?._id) return;
    try {
      const settings = await settingsService.getByUser(user._id);
      if (settings) {
        setNotificationSettings(settings);
      }
    } catch (error) {
      console.error("Error fetching user settings:", error);
    }
  };

  useEffect(() => {
    fetchNotificationSettings();
  }, []);

  const fetchAvailability = async () => {
    if (!isAdmin || !isPT) return;
    try {
      const availability = await availabilityService.getByPT(user._id);

      if (availability) {
        setAvailability(availability);
      }
    } catch (error) {
      console.error("Error fetching user availability:", error);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleUserAction = async (userId: string, action: string) => {
    setActiveMenu(null);

    const targetUser = users.find((u) => u._id === userId);
    if (!targetUser) return;

    switch (action) {
      case "toggle-status":
        setPopup({
          visible: true,
          type: "confirm",
          title: targetUser.active
            ? "Desativar Utilizador"
            : "Ativar Utilizador",
          message: `Tem certeza que deseja ${
            targetUser.active ? "desativar" : "ativar"
          } o utilizador ${targetUser.name}?`,
          onConfirm: async () => {
            try {
              if (targetUser.active) {
                await userService.deactivate(userId);
              } else {
                await userService.activate(userId);
              }
              fetchUsers();
              Toast.hide();
              Toast.show({
              topOffset: 10,
              type: "success",
              text2: `Utilizador ${
                  targetUser.active ? "desativado" : "ativado"
                } com sucesso!`,
              position: "top",
              visibilityTime: 2500,
              autoHide: true,
              });
            } catch {
              Toast.hide();
              Toast.show({
              topOffset: 10,
              type: "error",
              text2: "Erro ao alterar status do utilizador.",
              position: "top",
              visibilityTime: 2500,
              autoHide: true,
              });
            }
          },
        });
        break;

      case "change-role":
        setRoleChangeTarget(targetUser);
        setSelectedRole(targetUser.role);
        setRoleModalVisible(true);
        break;

      case "change-athletes":
        setRelationTarget({ type: "atheletes", user: targetUser });
        setAthletesModalVisible(true);
        break;

      case "change-pts":
        setRelationTarget({ type: "pts", user: targetUser });
        setPtsModalVisible(true);
        break;

      default:
        setPopup({
          visible: true,
          type: "confirm",
          title: action,
          message: `Funcionalidade "${action}" para ${targetUser.name} será implementada.`,
          onConfirm: undefined,
        });
    }
  };

  const UserMenu = ({ userId }: { userId: string }) => {
    const targetUser = users.find((u) => u._id === userId);
    if (!targetUser) return null;
    const options = [
      ...(targetUser.role === "atleta"
        ? [{ title: "Alterar PT", action: "change-pts" }]
        : []),
      ...(targetUser.role === "PT" || targetUser.role === "Admin"
        ? [{ title: "Alterar Atletas", action: "change-athletes" }]
        : []),
      { title: "Alterar Role", action: "change-role" },
      {
        title: targetUser.active ? "Desativar" : "Ativar",
        action: "toggle-status",
      },
    ];

    return (
      <View style={styles.menuDropdown}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option.action}
            style={[
              styles.menuOption,
              index === options.length - 1 && styles.menuOptionLast,
            ]}
            onPress={() => handleUserAction(userId, option.action)}
          >
            <Text
              style={[
                styles.menuOptionText,
                option.action === "toggle-status" && styles.menuOptionDanger,
              ]}
            >
              {option.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleCancelMeasures = () => {
    setExpandedAction(null);
    setMeasuresInput({
      weight: goalMeasures?.weight?.toString() || "",
      height: goalMeasures?.height?.toString() || "",
      bodyFat: goalMeasures?.bodyFat?.toString() || "",
      muscleMass: goalMeasures?.muscleMass?.toString() || "",
      visceralFat: goalMeasures?.visceralFat?.toString() || "",
    });
  };

  const handleCancelPerfil = () => {
    setExpandedAction(null);
    setEditFormData({
      name: userData?.name || "",
      phoneNumber: userData?.phoneNumber || "",
    });
  };

  const handleSavePerfil = async () => {
    if (!editFormData) return;

    const updatedData: Partial<User> = {
      name: editFormData.name || userData.name,
      phoneNumber: editFormData.phoneNumber || userData.phoneNumber,
    };

    try {
      const res = await userService.update(userData._id, updatedData);

      if (res && res._id) {
        Toast.hide();
        Toast.show({
        topOffset: 10,
        type: "success",
        text2: "Alteração guardada com sucesso!",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
        });
      }
      fetchUserData();
    } catch (err: any) {
      Toast.hide();
Toast.show({
 topOffset: 10,
 type: "success",
 text2: `Ocorreu um erro ao guardar a alteração: ${
          err.response?.data?.message || err.message || err
        }.`,
 position: "top",
 visibilityTime: 2500,
 autoHide: true,
});

    }
  };

  const actions = [
    { title: "Editar Perfil", icon: "person-outline" },
    { title: "Definir Objetivos", icon: "golf-outline" },
    ...(isAdmin
      ? [{ title: "Gerir Utilizadores", icon: "people-outline" }]
      : []),
    { title: "Notificações", icon: "notifications-outline" },
    ...(isAdmin || isPT
      ? [{ title: "Alterar Disponibilidade", icon: "calendar-outline" }]
      : []),
    { title: "Contactos dos PTs", icon: "call-outline" },
    {
      title: "Logout",
      icon: "log-out-outline",
      isLogout: true,
      onPress: logout,
    },
  ];

  const fetchUserData = async () => {
    if (user?._id) {
      setUserData(user);
      setEditFormData({
        name: user?.name,
        phoneNumber: user?.phoneNumber,
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchMeasures = async () => {
    try {
      const measures = await measuresService.getGoalByUser(user._id);
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

  const fetchUsers = async () => {
    try {
      if (!isAdmin || !user) return;
      const fetched = await userService.getAllAll();

      setUsers(fetched);
    } catch (err) {
      console.error("Erro ao ir buscar users", err);
    }
  };

  const fetchPtsAndAdmins = async () => {
    try {
      if (user.role === "atleta" || user.role === "PT") {
        const staff = await userService.getStaff();
        setPtsAndAdmins(staff);
        return;
      }
      if (users.length > 0) {
        const filtered = users.filter(
          (u) => (u.role === "PT" || u.role === "Admin") && u.active
        );
        setPtsAndAdmins(filtered);
        return;
      }
      const fetched = await userService.getStaff();

      setPtsAndAdmins(fetched);
    } catch (err) {
      console.error("Erro ao ir buscar PTs e Admins", err);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
    fetchPtsAndAdmins();
  }, [isPT, user]);

  const handleSaveMeasures = async () => {
    if (!goalMeasures) return;

    const data: Measures = {
      ...goalMeasures,
      weight:
        parseFloat(measuresInput.weight.replace(",", ".")) ||
        goalMeasures.weight ||
        0,
      height:
        parseFloat(measuresInput.height.replace(",", ".")) ||
        goalMeasures.height ||
        0,
      bodyFat:
        parseFloat(measuresInput.bodyFat.replace(",", ".")) ||
        goalMeasures.bodyFat ||
        0,
      muscleMass:
        parseFloat(measuresInput.muscleMass.replace(",", ".")) ||
        goalMeasures.muscleMass ||
        0,
      visceralFat:
        parseFloat(measuresInput.visceralFat.replace(",", ".")) ||
        goalMeasures.visceralFat ||
        0,
      type: "goal",
    };

    try {
      if (!goalMeasures._id) {
        throw new Error("Goal measures ID is undefined.");
      }
      const res = await measuresService.update(goalMeasures._id, data);

      if (res && res._id) {
        Toast.hide();
Toast.show({
 topOffset: 10,
 type: "success",
 text2: "Alteração guardada com sucesso!",
 position: "top",
 visibilityTime: 2500,
 autoHide: true,
});
      } else {
        
Toast.hide();
Toast.show({
 topOffset: 10,
 type: "error",
 text2: "Ocorreu um erro ao guardar a alteração, verifique os dados e tente novamente.",
 position: "top",
 visibilityTime: 2500,
 autoHide: true,
});
      }

      fetchMeasures();
    } catch {
      Toast.hide();
Toast.show({
 topOffset: 10,
 type: "error",
 text2: "Não foi possível guardar o objetivo.",
 position: "top",
 visibilityTime: 2500,
 autoHide: true,
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

  const handleNotificationToggle = (
    setting: keyof typeof notificationSettings
  ) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));

    settingsService.update(user._id, {
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  const [copiedId, setCopiedId] = useState<string>("");

  const handleCopy = async (id: string, phoneNumber: string) => {
    await Clipboard.setStringAsync(phoneNumber);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId("");
    }, 5000);
  };

  const saveRoleChange = async (newRole: "atleta" | "PT" | "Admin") => {
    if (!roleChangeTarget) return;
    //passar esta confirmação para o backend
    if (roleChangeTarget._id === user._id) {
      Toast.hide();
Toast.show({
 topOffset: 10,
 type: "error",
 text2: "Não podes alterar a tua própria role.",
 position: "top",
 visibilityTime: 2500,
 autoHide: true,
});
      return;
    }
    if (roleChangeTarget) {
      try {
        await userService.update(roleChangeTarget._id, { role: newRole });
        Toast.hide();
Toast.show({
 topOffset: 10,
 type: "success",
 text2: `O utilizador ${roleChangeTarget.name} agora é ${newRole}.`,
 position: "top",
 visibilityTime: 2500,
 autoHide: true,
});

        fetchUsers();
      } catch {
        Toast.hide();
Toast.show({
 topOffset: 10,
 type: "error",
 text2: "Não foi possível alterar o role do utilizador.",
 position: "top",
 visibilityTime: 2500,
 autoHide: true,
});

      }
    }
    setRoleModalVisible(false);
  };

  const savePTsChange = async (selectedPtIds: string[]) => {
    if (relationTarget?.user) {
      try {
        const selectedPts = users.filter((u) => selectedPtIds.includes(u._id));
        await userService.update(relationTarget.user._id, {
          coach: selectedPts,
        });
        Toast.hide();
Toast.show({
 topOffset: 10,
 type: "success",
 text2: `Os PTs do utilizador ${relationTarget.user.name} foram alterados com sucesso.`,
 position: "top",
 visibilityTime: 2500,
 autoHide: true,
});

        fetchUsers();
      } catch {
        Toast.hide();
        Toast.show({
        topOffset: 10,
        type: "error",
        text2: "Não foi possível alterar os PTs do utilizador.",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
        });

      }
    }
    setPtsModalVisible(false);
  };

  const saveAthletesChange = async (selectedAthleteIds: string[]) => {
    if (relationTarget && relationTarget.type === "atheletes") {
      try {
        await userService.update(relationTarget.user._id, {
          atheletes: selectedAthleteIds,
        });
        Toast.hide();
Toast.show({
 topOffset: 10,
 type: "success",
 text2: `Os atletas do utilizador ${relationTarget.user.name} foram alterados com sucesso.`,
 position: "top",
 visibilityTime: 2500,
 autoHide: true,
});

        fetchUsers();
      } catch {
        Toast.hide();
        Toast.show({
        topOffset: 10,
        type: "error",
        text2: "Não foi possível alterar os atletas do utilizador.",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
        });

      }
    }
    setAthletesModalVisible(false);
  };

  const validateTimeFormat = (time: string): boolean => {
    // Verifica se está no formato HH:MM
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  };

  const formatTimeInput = (text: string): string => {
    // Remove caracteres não numéricos
    let cleaned = text.replace(/[^0-9]/g, "");

    // Limita a 4 dígitos
    if (cleaned.length > 4) {
      cleaned = cleaned.slice(0, 4);
    }

    // Adiciona o ":" automaticamente após 2 dígitos
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}:${cleaned.slice(2)}`;
    }

    return cleaned;
  };

  const addTimeRange = (
    day: keyof Omit<Availability, "_id" | "PT" | "maxAthletesPerHour">
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        intervals: [...prev[day].intervals, { start: "08:00", end: "09:00" }],
      },
    }));
  };

  const removeTimeRange = (
    day: keyof Omit<Availability, "_id" | "PT" | "maxAthletesPerHour">,
    index: number
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        intervals: prev[day].intervals.filter((_, i) => i !== index),
      },
    }));
  };

  const updateTimeRange = (
    day: keyof Omit<Availability, "_id" | "PT" | "maxAthletesPerHour">,
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    // Formata o input automaticamente
    const formattedValue = formatTimeInput(value);

    // Só atualiza se o formato for válido ou estiver em construção
    if (formattedValue.length <= 5) {
      setAvailability((prev) => {
        const newAvailability = { ...prev };
        newAvailability[day].intervals[index][field] = formattedValue;
        return newAvailability;
      });
    }
  };

  const toggleWorkingDay = (
    day: keyof Omit<Availability, "_id" | "PT" | "maxAthletesPerHour">
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        working: !prev[day].working,
        // Mantém os intervals como estão, não os limpa
      },
    }));
  };

  const handleSaveAvailability = async () => {
    try {
      // checl if end is after start in each range
      for (const day of Object.keys(availability) as (keyof Omit<
        Availability,
        "_id" | "PT" | "maxAthletesPerHour"
      >)[]) {
        if (availability[day].working) {
          for (const range of availability[day].intervals) {
            if (range.start >= range.end) {
              Toast.hide();
              Toast.show({
              topOffset: 10,
              type: "error",
              text2: `O horário de início não pode ser igual ou superior ao horário de término.`,
              position: "top",
              visibilityTime: 2500,
              autoHide: true,
              });
              return;
            }
          }
        }
      }

      //check format of time inputs
      for (const day of Object.keys(availability) as (keyof Omit<
        Availability,
        "_id" | "PT" | "maxAthletesPerHour"
      >)[]) {
        if (availability[day].working) {
          for (const range of availability[day].intervals) {
            if (
              !validateTimeFormat(range.start) ||
              !validateTimeFormat(range.end)
            ) {
              Toast.hide();
              Toast.show({
              topOffset: 10,
              type: "error",
              text2: `Formato de hora inválido. Use HH:MM.`,
              position: "top",
              visibilityTime: 2500,
              autoHide: true,
              });

              return;
            }
          }
        }
      }
      const dataToSave = {
        ...availability,
        PT: user?._id || "",
      };
      const res = await availabilityService.update(dataToSave);

      if (res && res._id) {
        Toast.hide();
Toast.show({
 topOffset: 10,
 type: "success",
 text2: "Disponibilidade guardada com sucesso!",
 position: "top",
 visibilityTime: 2500,
 autoHide: true,
});
        fetchAvailability();
      } else {
        throw new Error("Falha ao guardar");
      }
    } catch {
      Toast.hide();
        Toast.show({
        topOffset: 10,
        type: "error",
        text2: "Não foi possível guardar a disponibilidade.",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
        });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>
      <View style={styles.profileHeader}>
        <Ionicons name="person-circle-outline" size={100} color="#1e293b" />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{userData?.name}</Text>
          <Text style={styles.email}>{userData?.phoneNumber}</Text>
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

          {/* Editar Perfil */}
          {expandedAction === "Editar Perfil" &&
            action.title === "Editar Perfil" && (
              <View style={styles.expandedContainer}>
                <View style={styles.formContainer}>
                  <ScrollView>
                    {[
                      { key: "name", label: "Nome", keyboard: "default" },
                      {
                        key: "phoneNumber",
                        label: "Número de Telemóvel",
                        keyboard: "phone-pad",
                      },
                    ].map((param) => (
                      <View key={param.key} style={{ marginBottom: 12 }}>
                        <Text style={styles.label}>{param.label}</Text>
                        <TextInput
                          keyboardType={param.keyboard as any}
                          style={styles.input}
                          value={
                            editFormData[
                              param.key as keyof typeof editFormData
                            ] || ""
                          }
                          onChangeText={(val) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              [param.key]: val,
                            }))
                          }
                          autoCapitalize={
                            param.key === "phoneNumber" ? "none" : "sentences"
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

          {/* Definir Objetivos */}
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

          {/* Notificações */}
          {expandedAction === "Notificações" &&
            action.title === "Notificações" && (
              <View style={styles.expandedContainer}>
                <View style={styles.formContainer}>
                  <Text style={styles.sectionTitle}>
                    Configurações de Notificação
                  </Text>
                  <Text style={styles.notificationDescription}>
                    Escolha quando deseja ser notificado
                  </Text>

                  {[
                    {
                      key: "fifteenMin",
                      label: "15 minutos antes do treino",
                    },
                    { key: "thirtyMin", label: "30 minutos antes do treino" },
                    { key: "sixtyMin", label: "1 hora antes do treino" },
                    { key: "onetwentyMin", label: "2 horas antes do treino" },
                    {
                      key: "trainingPending",
                      label: "Quando existe um treino pendente",
                    },
                    {
                      key: "trainingApproved",
                      label: "Quando um treino é aprovado",
                    },
                    {
                      key: "trainingRejected",
                      label: "Quando um treino é rejeitado",
                    },
                    {
                      key: "trainingCanceled",
                      label: "Quando um treino é cancelado",
                    },
                  ].map((notification) => (
                    <TouchableOpacity
                      key={notification.key}
                      style={styles.notificationItem}
                      onPress={() =>
                        handleNotificationToggle(
                          notification.key as keyof typeof notificationSettings
                        )
                      }
                    >
                      <Text style={styles.notificationLabel}>
                        {notification.label}
                      </Text>
                      <View
                        style={[
                          styles.switch,
                          notificationSettings[
                            notification.key as keyof typeof notificationSettings
                          ] && styles.switchActive,
                        ]}
                      >
                        <View
                          style={[
                            styles.switchThumb,
                            notificationSettings[
                              notification.key as keyof typeof notificationSettings
                            ] && styles.switchThumbActive,
                          ]}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

          {/* Alterar Disponibilidade */}
          {expandedAction === "Alterar Disponibilidade" &&
            action.title === "Alterar Disponibilidade" && (
              <View style={styles.expandedContainer}>
                <View style={styles.formContainer}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Máximo de atletas por hora */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>
                        Máximo de atletas por hora
                      </Text>
                      <TextInput
                        keyboardType="numeric"
                        style={styles.input}
                        value={availability.maxAthletesPerHour.toString()}
                        onChangeText={(val) =>
                          setAvailability((prev) => ({
                            ...prev,
                            maxAthletesPerHour: parseInt(val) || 1,
                          }))
                        }
                      />
                    </View>

                    {/* Dias da semana */}
                    {(
                      [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ] as const
                    ).map((day) => (
                      <View
                        key={day}
                        style={[
                          styles.dayContainer,
                          !availability[day].working &&
                            styles.dayContainerDisabled,
                        ]}
                      >
                        <View style={styles.dayHeader}>
                          <Text
                            style={[
                              styles.dayTitle,
                              !availability[day].working &&
                                styles.dayTitleDisabled,
                            ]}
                          >
                            {day === "Monday"
                              ? "Segunda"
                              : day === "Tuesday"
                              ? "Terça"
                              : day === "Wednesday"
                              ? "Quarta"
                              : day === "Thursday"
                              ? "Quinta"
                              : day === "Friday"
                              ? "Sexta"
                              : day === "Saturday"
                              ? "Sábado"
                              : "Domingo"}
                          </Text>

                          <TouchableOpacity
                            style={[
                              styles.workingDayToggle,
                              availability[day].working &&
                                styles.workingDayToggleActive,
                            ]}
                            onPress={() => toggleWorkingDay(day)}
                          >
                            <Text
                              style={[
                                styles.workingDayText,
                                availability[day].working &&
                                  styles.workingDayTextActive,
                              ]}
                            >
                              {availability[day].working
                                ? "Trabalho"
                                : "Não trabalho"}
                            </Text>
                          </TouchableOpacity>
                        </View>

                        {/* Sempre mostra os horários, mas com estilos diferentes se não estiver a trabalhar */}
                        <View
                          style={[
                            styles.timeRangesContainer,
                            !availability[day].working &&
                              styles.timeRangesContainerDisabled,
                          ]}
                        >
                          {availability[day].intervals.map((range, index) => (
                            <View
                              key={index}
                              style={[
                                styles.timeRangeRow,
                                !availability[day].working &&
                                  styles.timeRangeRowDisabled,
                              ]}
                            >
                              <TextInput
                                style={[
                                  styles.timeInput,
                                  !availability[day].working &&
                                    styles.timeInputDisabled,
                                ]}
                                value={range.start}
                                onChangeText={(val) =>
                                  updateTimeRange(day, index, "start", val)
                                }
                                maxLength={5}
                                editable={availability[day].working}
                              />
                              <Text
                                style={[
                                  styles.timeSeparator,
                                  !availability[day].working &&
                                    styles.timeSeparatorDisabled,
                                ]}
                              >
                                às
                              </Text>
                              <TextInput
                                style={[
                                  styles.timeInput,
                                  !availability[day].working &&
                                    styles.timeInputDisabled,
                                ]}
                                value={range.end}
                                onChangeText={(val) =>
                                  updateTimeRange(day, index, "end", val)
                                }
                                maxLength={5}
                                editable={availability[day].working}
                              />
                              <TouchableOpacity
                                style={[
                                  styles.removeTimeButton,
                                  !availability[day].working &&
                                    styles.removeTimeButtonDisabled,
                                ]}
                                onPress={() => removeTimeRange(day, index)}
                                disabled={!availability[day].working}
                              >
                                <Ionicons
                                  name="trash-outline"
                                  size={16}
                                  color={
                                    !availability[day].working
                                      ? "#9ca3af"
                                      : "#dc2626"
                                  }
                                />
                              </TouchableOpacity>
                            </View>
                          ))}

                          <TouchableOpacity
                            style={[
                              styles.addTimeButton,
                              !availability[day].working &&
                                styles.addTimeButtonDisabled,
                            ]}
                            onPress={() => addTimeRange(day)}
                            disabled={!availability[day].working}
                          >
                            <Ionicons
                              name="add"
                              size={16}
                              color={
                                !availability[day].working
                                  ? "#9ca3af"
                                  : "#2563eb"
                              }
                            />
                            <Text
                              style={[
                                styles.addTimeButtonText,
                                !availability[day].working &&
                                  styles.addTimeButtonTextDisabled,
                              ]}
                            >
                              Adicionar horário
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </ScrollView>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => {
                        setExpandedAction(null);
                        fetchAvailability();
                      }}
                    >
                      <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={handleSaveAvailability}
                    >
                      <Text style={styles.saveButtonText}>Guardar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

          {expandedAction === "Contactos dos PTs" &&
            action.title === "Contactos dos PTs" && (
              <View style={styles.expandedContainer}>
                <View style={styles.formContainer}>
                  {ptsAndAdmins.length === 0 ? (
                    <View style={styles.emptyContactsContainer}>
                      <Ionicons name="call-outline" size={48} color="#94a3b8" />
                      <Text style={styles.emptyContactsText}>
                        Nenhum PT ou Admin disponível no momento.
                      </Text>
                    </View>
                  ) : (
                    <ScrollView
                      style={styles.contactsList}
                      showsVerticalScrollIndicator={false}
                    >
                      {ptsAndAdmins.map((contact) => (
                        <View key={contact._id} style={styles.contactItem}>
                          <View style={styles.contactInfo}>
                            <Text style={styles.contactName}>
                              {contact.name}
                            </Text>
                            {contact.phoneNumber && (
                              <Text style={styles.contactPhone}>
                                {contact.phoneNumber}
                              </Text>
                            )}
                          </View>

                          {contact.phoneNumber && (
                            <TouchableOpacity
                              style={styles.copyButton}
                              onPress={() =>
                                handleCopy(contact._id, contact.phoneNumber)
                              }
                            >
                              <Ionicons
                                name="copy-outline"
                                size={24}
                                color="#1e293b"
                              />
                              <Text style={styles.copyDescription}>
                                {copiedId === contact._id
                                  ? "Copiado!"
                                  : "Copiar"}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      ))}
                    </ScrollView>
                  )}
                </View>
              </View>
            )}

          {/* Gerir Utilizadores */}
          {expandedAction === "Gerir Utilizadores" &&
            action.title === "Gerir Utilizadores" && (
              <View style={styles.expandedContainer}>
                <View style={styles.userManagementContainer}>
                  {/* Filtros de Status */}
                  <View style={styles.filterContainer}>
                    {["todos", "ativos", "inativos"].map((filter) => (
                      <TouchableOpacity
                        key={filter}
                        style={[
                          styles.filterButton,
                          activeFilter === filter && styles.filterButtonActive,
                        ]}
                        onPress={() => setActiveFilter(filter as any)}
                      >
                        <Text
                          style={[
                            styles.filterButtonText,
                            activeFilter === filter &&
                              styles.filterButtonTextActive,
                          ]}
                        >
                          {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Filtros de Role */}
                  <View style={styles.roleFilterContainer}>
                    {[
                      { key: "todos", label: "Todos" },
                      { key: "atleta", label: "Atleta" },
                      { key: "PT", label: "PT" },
                      { key: "Admin", label: "Admin" },
                    ].map((role) => (
                      <TouchableOpacity
                        key={role.key.toString()}
                        style={[
                          styles.roleFilterButton,
                          roleFilter === role.key.toString() &&
                            styles.roleFilterButtonActive,
                        ]}
                        onPress={() => setRoleFilter(role.key as any)}
                      >
                        <Text
                          style={[
                            styles.roleFilterText,
                            roleFilter === role.key.toString() &&
                              styles.roleFilterTextActive,
                          ]}
                        >
                          {role.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <ScrollView
                    style={styles.usersList}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    nestedScrollEnabled={true}
                  >
                    {filteredUsers.length === 0 ? (
                      <View style={styles.emptyUsersContainer}>
                        <Ionicons
                          name="people-outline"
                          size={48}
                          color="#94a3b8"
                        />
                        <Text style={styles.emptyUsersText}>
                          Nenhum utilizador encontrado com os filtros
                          selecionados.
                        </Text>
                      </View>
                    ) : (
                      filteredUsers.map((userItem) => (
                        <View
                          key={userItem._id}
                          style={[
                            styles.userItem,
                            !userItem.active && styles.userItemInactive,
                            activeMenu === userItem._id && { zIndex: 6 }, // Z-index elevado quando o menu está aberto
                          ]}
                        >
                          <View style={styles.userInfo}>
                            <Text style={styles.userName}>{userItem.name}</Text>
                            <Text style={styles.userRole}>
                              {userItem.phoneNumber}
                            </Text>
                            <Text style={styles.userRole}>{userItem.role}</Text>
                            <Text
                              style={[
                                styles.userStatus,
                                userItem.active
                                  ? styles.userStatusActive
                                  : styles.userStatusInactive,
                              ]}
                            >
                              {userItem.active ? "Ativo" : "Inativo"}
                            </Text>
                          </View>

                          <View style={styles.menuContainer}>
                            <TouchableOpacity
                              style={styles.menuButton}
                              onPress={() => {
                                if (activeMenu === userItem._id) {
                                  setActiveMenu(null);
                                } else {
                                  setActiveMenu(userItem._id);
                                }
                              }}
                            >
                              <Ionicons
                                name="ellipsis-vertical"
                                size={20}
                                color="#64748b"
                              />
                            </TouchableOpacity>

                            {activeMenu === userItem._id && (
                              <UserMenu userId={userItem._id} />
                            )}
                          </View>
                        </View>
                      ))
                    )}
                  </ScrollView>
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
      <ChangeRoleModal
        visible={isRoleModalVisible}
        onClose={() => setRoleModalVisible(false)}
        currentRole={selectedRole || "atleta"}
        onConfirm={saveRoleChange}
      />

      <ChangePtsModal
        visible={isPtsModalVisible}
        onClose={() => setPtsModalVisible(false)}
        users={ptsAndAdmins}
        selected={
          relationTarget?.type === "pts" &&
          relationTarget.user &&
          Array.isArray(relationTarget.user.coach)
            ? relationTarget.user.coach.map((c) =>
                typeof c === "string" ? c : c._id
              )
            : []
        }
        onConfirm={savePTsChange}
      />

      <ChangeAthletesModal
        visible={isAthletesModalVisible}
        onClose={() => setAthletesModalVisible(false)}
        users={users.filter((u) => u.role === "atleta" && u.active)}
        selected={
          relationTarget?.type === "atheletes" &&
          relationTarget.user &&
          Array.isArray(relationTarget.user.atheletes)
            ? relationTarget.user.atheletes
            : []
        }
        onConfirm={saveAthletesChange}
      />
    </ScrollView>
  );
}
