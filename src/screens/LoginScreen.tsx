/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userService } from "../services/usersService";
import { styles } from "./styles/LoginScreen.styles";
import Popup from "../componentes/Popup";
import avvbLogo from "../../assets/avvb.png";
import { API_BASE_URL } from "../../config";
import api from "../../api";
import * as Notifications from "expo-notifications";
import { registerIndieID } from "native-notify";
import { Toast } from "react-native-toast-message/lib/src/Toast";

interface PopupState {
  visible: boolean;
  title?: string;
  message: string;
  type: "success" | "error" | "confirm";
  onConfirm?: () => void;
}

export default function LoginScreen() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [popup, setPopup] = useState<PopupState>({
    visible: false,
    message: "",
    type: "success",
  });

  const { login } = useAuth();

  const showPopup = (
    message: string,
    type: "success" | "error" | "confirm" = "success",
    title?: string,
    onConfirm?: () => void
  ) => {
    setPopup({
      visible: true,
      title,
      message,
      type,
      onConfirm,
    });
  };

  const hidePopup = () => {
    setPopup((prev) => ({ ...prev, visible: false }));
  };

  // Estados do reset password
  const [resetEmail, setResetEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [resetStep, setResetStep] = useState<"none" | "email" | "code">("none");

  // Pedir código por email
  const handleRequestReset = async () => {
    if (!resetEmail) {
      Toast.hide();
      Toast.show({
        topOffset: 10,
        type: "error",
        text2: "Insira seu email",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });
      return;
    }
    setLoading(true);
    try {
      await userService.requestPasswordReset(resetEmail);
      Toast.hide();
      Toast.show({
        topOffset: 10,
        type: "success",
        text2: "Código enviado por email!",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });

      setResetStep("code");
    } catch (err: any) {
      Toast.hide();
      Toast.show({
        topOffset: 10,
        type: "error",
        text2: err.response?.data?.message || "Erro ao solicitar redefinição",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Confirmar código e nova senha
  const handleResetWithCode = async () => {
    if (newPassword !== confirmNewPassword) {
      Toast.hide();
      Toast.show({
        topOffset: 10,
        type: "error",
        text2: "As senhas não coincidem",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });
      return;
    }
    setLoading(true);
    try {
      await userService.resetPasswordWithCode(resetEmail, code, newPassword);
      Toast.hide();
      Toast.show({
        topOffset: 10,
        type: "success",
        text2: "Senha alterada com sucesso!",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });
      setResetStep("none");
      setResetEmail("");
      setCode("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err: any) {
      Toast.hide();
      Toast.show({
        topOffset: 10,
        type: "error",
        text2: err.response?.data?.message || "Código inválido ou expirado",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    if (existingStatus !== "granted") {
      await Notifications.requestPermissionsAsync();
    }

    if (!email || !password) {
      Toast.hide();
      Toast.show({
        topOffset: 10,
        type: "error",
        text2: "Preencha email e senha.",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`${API_BASE_URL}/users/login`, {
        login: email.trim(),
        password,
      });

      const { token, user } = response.data;
      await AsyncStorage.setItem("token", token); // interceptor usa este token
      if (!user.verified) {
        showPopup(
          "Utilizador à espera de autenticação",
          "confirm",
          "Conta não verificada",
          async () => {
            try {
              await api.post(`${API_BASE_URL}/users/resend-verification`, {
                email: user.email,
              });
              Toast.hide();
              Toast.show({
                topOffset: 10,
                type: "success",
                text2: "Email de verificação reenviado!",
                position: "top",
                visibilityTime: 2500,
                autoHide: true,
              });
            } catch (err: any) {
              Toast.hide();
              Toast.show({
                topOffset: 10,
                type: "error",
                text2: err.response?.data?.message || "Erro ao reenviar email",
                position: "top",
                visibilityTime: 2500,
                autoHide: true,
              });
            }
          }
        );
        return;
      }

      if (!user.active) {
        showPopup(
          "Conta desativada. Contacte o suporte.",
          "error",
          "Conta desativada"
        );
        return;
      }
      const userId = (user._id || "").toString();
      registerIndieID(userId, 32298, "FJv06dvuLO2xdBkaBSxXog");
      login(user, rememberMe);
      if (rememberMe) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      }
    } catch (err: any) {
      Toast.hide();
      Toast.show({
        topOffset: 10,
        type: "error",
        text2: err.response?.data?.message || "Erro ao solicitar redefinição",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !name || !phoneNumber) {
      Toast.hide();
      Toast.show({
        topOffset: 10,
        type: "error",
        text2: "Preencha todos os campos",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });

      return;
    }
    if (password !== confirmPassword) {
      Toast.hide();
      Toast.show({
        topOffset: 10,
        type: "error",
        text2: "As senhas não coincidem",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });
      return;
    }
    if (password.length < 6) {
      Toast.hide();
      Toast.show({
        topOffset: 10,
        type: "error",
        text2: "A senha deve ter pelo menos 6 caracteres",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });

      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.hide();
      Toast.show({
        topOffset: 10,
        type: "error",
        text2: "Por favor, insira um email válido",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });
      return;
    }

    setLoading(true);
    try {
      await userService.register({
        name,
        email,
        password,
        phoneNumber,
        role: "atleta",
      });

      showPopup(
        "Conta criada com sucesso! Verifique o seu email para confirmar a conta. O email pode estar na pasta de spam.",
        "success",
        "Conta criada"
      );
      setIsRegistering(false);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Erro ao criar conta";
      if (
        errorMessage.toLowerCase().includes("email") &&
        errorMessage.toLowerCase().includes("já existe")
      ) {
        Toast.show({
          topOffset: 10,
          type: "error",
          text2: "Este email já está registado no sistema.",
          position: "top",
          visibilityTime: 2500,
          autoHide: true,
        });
      } else if (
        errorMessage.toLowerCase().includes("telefone") ||
        errorMessage.toLowerCase().includes("telemóvel")
      ) {
        Toast.hide();
        Toast.show({
          topOffset: 10,
          type: "error",
          text2: "Este número já está registado no sistema.",
          position: "top",
          visibilityTime: 2500,
          autoHide: true,
        });
      } else {
        Toast.hide();
        Toast.show({
          topOffset: 10,
          type: "error",
          text2: errorMessage,
          position: "top",
          visibilityTime: 2500,
          autoHide: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSwitchMode = () => {
    setIsRegistering(!isRegistering);
    clearForm();
    hidePopup();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Transição de login */}
      <LinearGradient
        colors={["#1a1a1a", "#2d2d2d", "#1a1a1a"]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image
                  source={avvbLogo}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.title}>
                {resetStep !== "none"
                  ? "Recuperar Senha"
                  : isRegistering
                  ? "Criar Conta"
                  : "Bem-vindo"}
              </Text>
              <Text style={styles.subtitle}>
                {resetStep === "email" &&
                  "Digite o seu email para receber o código"}
                {resetStep === "code" &&
                  "Insira o código e defina a nova senha"}
                {resetStep === "none" &&
                  (isRegistering
                    ? "Preencha os dados para criar sua conta"
                    : "Coloque as suas credenciais para continuar")}
              </Text>
            </View>

            {/* Form */}
            {resetStep === "none" && (
              <View style={styles.formContainer}>
                {isRegistering && (
                  <>
                    <View style={styles.inputContainer}>
                      <View style={styles.inputWrapper}>
                        <Ionicons
                          name="person-outline"
                          size={20}
                          color="#666"
                          style={styles.inputIcon}
                        />
                        <TextInput
                          placeholder="Nome completo"
                          placeholderTextColor="#999"
                          value={name}
                          onChangeText={setName}
                          style={styles.input}
                        />
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <View style={styles.inputWrapper}>
                        <Ionicons
                          name="call-outline"
                          size={20}
                          color="#666"
                          style={styles.inputIcon}
                        />
                        <TextInput
                          placeholder="Número de Telemóvel"
                          placeholderTextColor="#999"
                          value={phoneNumber}
                          onChangeText={setPhone}
                          style={styles.input}
                          keyboardType="phone-pad"
                          maxLength={9}
                        />
                      </View>
                    </View>
                  </>
                )}

                {/* Email */}
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="#999"
                      value={email}
                      onChangeText={setEmail}
                      style={styles.input}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>
                </View>

                {/* Password */}
                <View style={styles.inputContainer}>
                  <View style={styles.passwordWrapper}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="Senha"
                      placeholderTextColor="#999"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      style={styles.input}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Confirmar Senha no registo */}
                {isRegistering && (
                  <View style={styles.inputContainer}>
                    <View style={styles.passwordWrapper}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#666"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        placeholder="Confirmar senha"
                        placeholderTextColor="#999"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        style={styles.input}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={styles.eyeIcon}
                      >
                        <Ionicons
                          name={
                            showConfirmPassword
                              ? "eye-outline"
                              : "eye-off-outline"
                          }
                          size={20}
                          color="#666"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {/* Botão Login/Register */}
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    loading && styles.loginButtonDisabled,
                  ]}
                  onPress={isRegistering ? handleRegister : handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#1a1a1a" size="small" />
                  ) : (
                    <Text style={styles.loginButtonText}>
                      {isRegistering ? "Criar Conta" : "Entrar"}
                    </Text>
                  )}
                </TouchableOpacity>
                {!isRegistering && (
                  <View style={styles.rememberMeContainer}>
                    <TouchableOpacity
                      style={styles.rememberMeButton}
                      onPress={() => setRememberMe(!rememberMe)}
                    >
                      <View
                        style={[
                          styles.checkboxContainer,
                          rememberMe && styles.checkboxSelected,
                        ]}
                      >
                        {rememberMe && (
                          <Ionicons
                            name="checkmark"
                            size={12}
                            color="#1a1a1a"
                          />
                        )}
                      </View>
                      <Text style={styles.rememberMeText}>Lembrar-me</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {/* Esqueci senha */}
                {!isRegistering && (
                  <TouchableOpacity
                    style={styles.forgotPassword}
                    onPress={() => setResetStep("email")}
                  >
                    <Text style={styles.forgotPasswordText}>
                      Esqueceu a senha?
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Fluxo Reset: Email */}
            {resetStep === "email" && (
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="#999"
                      value={resetEmail}
                      onChangeText={setResetEmail}
                      style={styles.input}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    loading && styles.loginButtonDisabled,
                  ]}
                  onPress={handleRequestReset}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#1a1a1a" size="small" />
                  ) : (
                    <Text style={styles.loginButtonText}>Enviar Código</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.switchModeButton}
                  onPress={() => setResetStep("none")}
                >
                  <Text style={styles.switchModeText}>Voltar ao Login</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Fluxo Reset: Código + Nova Senha */}
            {resetStep === "code" && (
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="key-outline"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="Código recebido"
                      placeholderTextColor="#999"
                      value={code}
                      onChangeText={setCode}
                      style={styles.input}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.passwordWrapper}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="Nova Senha"
                      placeholderTextColor="#999"
                      value={newPassword}
                      onChangeText={setNewPassword}
                      secureTextEntry
                      style={styles.input}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.passwordWrapper}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="Confirmar Nova Senha"
                      placeholderTextColor="#999"
                      value={confirmNewPassword}
                      onChangeText={setConfirmNewPassword}
                      secureTextEntry
                      style={styles.input}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    loading && styles.loginButtonDisabled,
                  ]}
                  onPress={handleResetWithCode}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#1a1a1a" size="small" />
                  ) : (
                    <Text style={styles.loginButtonText}>Alterar Senha</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.switchModeButton}
                  onPress={() => setResetStep("none")}
                >
                  <Text style={styles.switchModeText}>Voltar ao Login</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Switch Mode */}
            {resetStep === "none" && (
              <View style={styles.switchModeContainer}>
                <TouchableOpacity
                  style={styles.switchModeButton}
                  onPress={handleSwitchMode}
                >
                  <Text style={styles.switchModeText}>
                    {isRegistering
                      ? "Já tem conta? Entrar"
                      : "Não tem conta? Criar Conta"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.footer}>
              <Text style={styles.footerText}>Versão 1.0.0</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>

      <Popup
        visible={popup.visible}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onConfirm={popup.onConfirm}
        onCancel={hidePopup}
        onClose={hidePopup}
      />
    </SafeAreaView>
  );
}
