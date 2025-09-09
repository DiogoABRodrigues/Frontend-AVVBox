/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
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
import * as Clipboard from 'expo-clipboard';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const [userData, setUserData] = useState<User>(null);

  const isAdmin = user?.role === "Admin";
  const isPT = user?.role === "PT" || isAdmin;

  const [goalMeasures, setGoalMeasures] = useState<Measures | null>(null);
  const [measuresInput, setMeasuresInput] = useState<Record<string, string>>({});

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [activeFilter, setActiveFilter] = useState<'todos' | 'ativos' | 'inativos'>('ativos');
  const [roleFilter, setRoleFilter] = useState<'todos' | 'atleta' | 'PT' | 'Admin'>('todos');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [expandedAction, setExpandedAction] = useState<string | null>(null);

  const [editFormData, setEditFormData] = useState({
    name: "",
    phoneNumber: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    notify15min: false,
    notify30min: false,
    notify1h: false,
    notify2h: false,
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
    if (activeFilter === 'ativos') {
      filtered = filtered.filter(u => u.active);
    } else if (activeFilter === 'inativos') {
      filtered = filtered.filter(u => !u.active);
    }
    
    // Filter by role
    if (roleFilter !== 'todos') {
      filtered = filtered.filter(u => u.role === roleFilter);
    }
    
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    filterUsers();
  }, [users, activeFilter, roleFilter]);

  const handleUserAction = async (userId: string, action: string) => {
    setActiveMenu(null);
    
    const targetUser = users.find(u => u._id === userId);
    if (!targetUser) return;  

    switch (action) {
      case 'toggle-status':
        setPopup({
          visible: true,
          type: "confirm",
          title: targetUser.active ? "Desativar Utilizador" : "Ativar Utilizador",
          message: `Tem certeza que deseja ${targetUser.active ? 'desativar' : 'ativar'} o utilizador ${targetUser.name}?`,
          onConfirm: async () => {
            try {
              if (targetUser.active) {
                await userService.deactivate(userId);
              } else {
                await userService.activate(userId);
              }
              fetchUsers();
              setPopup({
                visible: true,
                type: "success",
                title: "Sucesso",
                message: `Utilizador ${targetUser.active ? 'desativado' : 'ativado'} com sucesso!`,
                onConfirm: undefined,
              });
            } catch {
              setPopup({
                visible: true,
                type: "error",
                title: "Erro",
                message: "Erro ao alterar status do utilizador.",
                onConfirm: undefined,
              });
            }
          },
        });
        break;
      
      case 'change-role':
        setPopup({
          visible: true,
          type: "confirm",
          title: "Alterar Role",
          message: `Funcionalidade de alterar role para ${targetUser.name} será implementada.`,
          onConfirm: undefined,
        });
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
    const targetUser = users.find(u => u._id === userId);
    
    return (
      <View style={styles.menuDropdown}>
        {[
          { title: "Alterar PTs", action: "change-pts" },
          { title: "Alterar Atletas", action: "change-athletes" },
          { title: "Alterar Role", action: "change-role" },
          { title: targetUser?.active ? "Desativar" : "Ativar", action: "toggle-status" },
        ].map((option, index) => (
          <TouchableOpacity
            key={option.action}
            style={[styles.menuOption, index === 3 && styles.menuOptionLast]}
            onPress={() => handleUserAction(userId, option.action)}
          >
            <Text style={[
              styles.menuOptionText,
              option.action === "toggle-status" && styles.menuOptionDanger
            ]}>
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
          message: "Ocorreu um erro ao guardar a alteração, verifique os dados e tente novamente.",
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
    ...(isAdmin ? [{ title: "Gerir Utilizadores", icon: "people-outline" }] : []),
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
        phoneNumber: data?.phoneNumber,
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

  const fetchUsers = async () => {
    try {
      if (!isAdmin || !user) return;
      const fetched = await userService.getAllAll();

      interface FetchedUser {
        _id: string;
        name: string;
        role: string;
        active: boolean;
        phoneNumber?: number | null;
      }
      const usersData: User[] = (fetched as FetchedUser[]).map((a) => ({
        _id: a._id,
        id: a._id,
        name: a.name,
        phoneNumber: a.phoneNumber || null,
        role: ["atleta", "PT", "Admin"].includes(a.role) ? (a.role as "atleta" | "PT" | "Admin") : "atleta",
        active: a.active,
      }));

      setUsers(usersData);
    } catch (err) {
      console.error("Erro ao ir buscar users", err);
    }
  };

  const fetchPtsAndAdmins = async () => {
    try {
      if (users.length > 0) {
        const filtered = users.filter((u) => (u.role === "PT" || u.role === "Admin") && u.active);
        setPtsAndAdmins(filtered);
        return;
      }
      const fetched = await userService.getAll();

      interface FetchedUser {
        _id: string;
        name: string;
        role: string;
        active: boolean;
        phoneNumber?: number | null;
      }
      const usersData: User[] = (fetched as FetchedUser[])
        .filter((u) => (u.role === "PT" || u.role === "Admin") && u.active)
        .map((a) => ({
          _id: a._id,
          id: a._id,
          name: a.name,
          phoneNumber: a.phoneNumber || null,
          role: ["atleta", "PT", "Admin"].includes(a.role) ? (a.role as "atleta" | "PT" | "Admin") : "atleta",
          active: a.active,
        }));

      setPtsAndAdmins(usersData);
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
          message: "Ocorreu um erro ao guardar a alteração, verifique os dados e tente novamente.",
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

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const [copiedId, setCopiedId] = useState<string>("");

  const handleCopy = async (id: string, phoneNumber: string) => {
    await Clipboard.setStringAsync(phoneNumber);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId("");
    }, 5000);
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
            {expandedAction === "Editar Perfil" && action.title === "Editar Perfil" && (
              <View style={styles.expandedContainer}>
                <View style={styles.formContainer}>
                  <ScrollView>
                    {[
                      { key: "name", label: "Nome", keyboard: "default" },
                      { key: "phoneNumber", label: "Número de Telemóvel", keyboard: "phone-pad" },
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
            {expandedAction === "Definir Objetivos" && action.title === "Definir Objetivos" && (
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
            {expandedAction === "Notificações" && action.title === "Notificações" && (
              <View style={styles.expandedContainer}>
                <View style={styles.formContainer}>
                  <Text style={styles.sectionTitle}>Configurações de Notificação</Text>
                  <Text style={styles.notificationDescription}>
                    Escolha quando deseja ser notificado antes dos seus treinos
                  </Text>
                  
                  {[
                    { key: "notify15min", label: "Notificar 15 minutos antes" },
                    { key: "notify30min", label: "Notificar 30 minutos antes" },
                    { key: "notify1h", label: "Notificar 1 hora antes" },
                    { key: "notify2h", label: "Notificar 2 horas antes" },
                  ].map((notification) => (
                    <TouchableOpacity
                      key={notification.key}
                      style={styles.notificationItem}
                      onPress={() => handleNotificationToggle(notification.key as keyof typeof notificationSettings)}
                    >
                      <Text style={styles.notificationLabel}>{notification.label}</Text>
                      <View style={[
                        styles.switch,
                        notificationSettings[notification.key as keyof typeof notificationSettings] && styles.switchActive
                      ]}>
                        <View style={[
                          styles.switchThumb,
                          notificationSettings[notification.key as keyof typeof notificationSettings] && styles.switchThumbActive
                        ]} />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

           {expandedAction === "Contactos dos PTs" && action.title === "Contactos dos PTs" && (
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
                  <ScrollView style={styles.contactsList} showsVerticalScrollIndicator={false}>
                    {ptsAndAdmins.map((contact) => (
                    <View key={contact._id} style={styles.contactItem}>
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactName}>{contact.name}</Text>
                        {contact.phoneNumber && (
                          <Text style={styles.contactPhone}>{contact.phoneNumber}</Text>
                        )}
                      </View>
                      
                      {contact.phoneNumber && (
                        <TouchableOpacity 
                          style={styles.copyButton}
                          onPress={() => handleCopy(contact._id, contact.phoneNumber)}
                        >
                          <Ionicons name="copy-outline" size={24} color="#1e293b" />
                          <Text style={styles.copyDescription }>
                            {copiedId === contact._id ? "Copiado!" : "Copiar"}
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
            {expandedAction === "Gerir Utilizadores" && action.title === "Gerir Utilizadores" && (
              <View style={styles.expandedContainer}>
                <View style={styles.userManagementContainer}>
                  {/* Filtros de Status */}
                  <View style={styles.filterContainer}>
                    {['odos', 'ativos', 'inativos'].map((filter) => (
                      <TouchableOpacity
                        key={filter}
                        style={[
                          styles.filterButton,
                          activeFilter === filter && styles.filterButtonActive
                        ]}
                        onPress={() => setActiveFilter(filter as any)}
                      >
                        <Text style={[
                          styles.filterButtonText,
                          activeFilter === filter && styles.filterButtonTextActive
                        ]}>
                          {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Filtros de Role */}
                  <View style={styles.roleFilterContainer}>
                    {['todos', 'atleta', 'PT', 'Admin'].map((role) => (
                      <TouchableOpacity
                        key={role}
                        style={[
                          styles.roleFilterButton,
                          roleFilter === role && styles.roleFilterButtonActive
                        ]}
                        onPress={() => setRoleFilter(role as any)}
                      >
                        <Text style={[
                          styles.roleFilterText,
                          roleFilter === role && styles.roleFilterTextActive
                        ]}>
                          {role}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <ScrollView style={styles.usersList} showsVerticalScrollIndicator={false}>
                    {filteredUsers.length === 0 ? (
                      <View style={styles.emptyUsersContainer}>
                        <Ionicons name="people-outline" size={48} color="#94a3b8" />
                        <Text style={styles.emptyUsersText}>
                          Nenhum utilizador encontrado com os filtros selecionados.
                        </Text>
                      </View>
                    ) : (
                      filteredUsers.map((userItem) => (
                        <View 
                          key={userItem._id} 
                          style={[
                            styles.userItem, 
                            !userItem.active && styles.userItemInactive,
                            activeMenu === userItem._id && { zIndex: 10000 } // Z-index elevado quando o menu está aberto
                          ]}
                        >
                          <View style={styles.userInfo}>
                            <Text style={styles.userName}>{userItem.name}</Text>
                            <Text style={styles.userRole}>{userItem.role}</Text>
                            <Text style={[
                              styles.userStatus,
                              userItem.active ? styles.userStatusActive : styles.userStatusInactive
                            ]}>
                              {userItem.active ? 'Ativo' : 'Inativo'}
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
                              <Ionicons name="ellipsis-vertical" size={20} color="#64748b" />
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
      </ScrollView>
    </View>
  );
}