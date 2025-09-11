/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userService } from '../services/usersService';
import { styles } from './styles/LoginScreen.styles';
import Popup from '../componentes/Popup';
import avvbLogo from '../../assets/avvb.png';
import axios from 'axios';

interface PopupState {
  visible: boolean;
  title?: string;
  message: string;
  type: "success" | "error" | "confirm";
  onConfirm?: () => void;
}

export default function LoginScreen() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [popup, setPopup] = useState<PopupState>({
    visible: false,
    message: '',
    type: 'success'
  });

  const { login } = useAuth();
  const navigation = useNavigation<any>();

  const showPopup = (message: string, type: "success" | "error" | "confirm" = "success", title?: string, onConfirm?: () => void) => {
    setPopup({
      visible: true,
      title,
      message,
      type,
      onConfirm
    });
  };

  const hidePopup = () => {
    setPopup(prev => ({ ...prev, visible: false }));
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showPopup('Preencha email e senha', 'error', 'Campos obrigatórios');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.1.184:3000/users/login', { 
        login: email.trim(),
        password 
      });

      const user = response.data.user;

      // Verifica se o utilizador está confirmado
      if (!user.verified) {
        // Mostra popup personalizado
        showPopup(
          'Utilizador à espera de autenticação',
          'confirm',
          'Conta não verificada',
          async () => {
            try {
              await axios.post(`http://192.168.1.184:3000/users/resend-verification`, { email: user.email });
              showPopup('Email de verificação reenviado!', 'success', 'Sucesso');
            } catch (err: any) {
              showPopup(err.response?.data?.message || 'Erro ao reenviar email', 'error', 'Erro');
            }
          }
        );
        return; // Não faz login
      }

      // Continua normalmente se verificado
      login(user, rememberMe);

      if (rememberMe) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      }

      navigation.reset({ index: 0, routes: [{ name: 'Athlete' }] });
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Credenciais inválidas';
      showPopup(errorMessage, 'error', 'Erro de Login');
    } finally {
      setLoading(false);
    }
  };


  const handleRegister = async () => {
    // Validações básicas
    if (!email || !password || !name || !phoneNumber) {
      showPopup('Preencha todos os campos', 'error', 'Campos obrigatórios');
      return;
    }
    
    if (password !== confirmPassword) {
      showPopup('As senhas não coincidem', 'error', 'Erro de validação');
      return;
    }

    if (password.length < 6) {
      showPopup('A senha deve ter pelo menos 6 caracteres', 'error', 'Senha inválida');
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showPopup('Por favor, insira um email válido', 'error', 'Email inválido');
      return;
    }

    setLoading(true);
    try {
      await userService.register({ 
        name, 
        email, 
        password, 
        phoneNumber,
        role: 'atleta' 
      });
      
      showPopup(
        'Conta criada com sucesso! Verifique o seu email para confirmar a conta. O email pode estar na pasta de spam.', 
        'success', 
        'Conta criada',
        () => {
        }
      );
      setIsRegistering(false);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao criar conta';
      
      // Tratamento específico para erros de duplicação
      if (errorMessage.toLowerCase().includes('email') && errorMessage.toLowerCase().includes('já existe')) {
        showPopup(
          'Este email já está registado no sistema. Tente fazer login ou use outro email.', 
          'error', 
          'Email já existe'
        );
      } else if (errorMessage.toLowerCase().includes('telefone') || errorMessage.toLowerCase().includes('telemóvel')) {
        showPopup(
          'Este número de telemóvel já está registado no sistema. Tente usar outro número.', 
          'error', 
          'Telemóvel já existe'
        );
      } else if (errorMessage.toLowerCase().includes('user already exists') || errorMessage.toLowerCase().includes('already registered')) {
        showPopup(
          'Já existe uma conta com estes dados. Tente fazer login ou use informações diferentes.', 
          'error', 
          'Conta já existe'
        );
      } else {
        showPopup(errorMessage, 'error', 'Erro no registo');
      }
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setConfirmPassword('');
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
      <LinearGradient colors={['#1a1a1a', '#2d2d2d', '#1a1a1a']} style={styles.gradient}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                {isRegistering ? 'Criar Conta' : 'Bem-vindo'}
              </Text>
              <Text style={styles.subtitle}>
                {isRegistering 
                  ? 'Preencha os dados para criar sua conta' 
                  : 'Coloque as suas credenciais para continuar'
                }
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Campos de Registro */}
              {isRegistering && (
                <>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        placeholder="Nome completo"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                        autoCapitalize="words"
                        returnKeyType="next"
                      />
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        placeholder="Número de Telemóvel"
                        placeholderTextColor="#999"
                        value={phoneNumber}
                        onChangeText={setPhone}
                        style={styles.input}
                        keyboardType="phone-pad"
                        autoComplete="tel"
                        returnKeyType="next"
                        maxLength={9}
                      />
                    </View>
                  </View>
                </>
              )}
              
              {/* Email - sempre presente */}
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoComplete="email"
                    returnKeyType="next"
                  />
                </View>
              </View>

              {/* Senha - sempre presente */}
              <View style={styles.inputContainer}>
                <View style={styles.passwordWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Senha"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    autoComplete="password"
                    returnKeyType={isRegistering ? "next" : "done"}
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

              {/* Confirmar Senha - apenas no registro */}
              {isRegistering && (
                <View style={styles.inputContainer}>
                  <View style={styles.passwordWrapper}>
                    <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                      placeholder="Confirmar senha"
                      placeholderTextColor="#999"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      style={styles.input}
                      returnKeyType="done"
                    />
                    <TouchableOpacity 
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons 
                        name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                        size={20} 
                        color="#666" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Lembrar-me - apenas no login */}
              {!isRegistering && (
                <View style={styles.rememberMeContainer}>
                  <TouchableOpacity 
                    style={styles.rememberMeButton}
                    onPress={() => setRememberMe(!rememberMe)}
                  >
                    <View style={[
                      styles.checkboxContainer,
                      rememberMe && styles.checkboxSelected
                    ]}>
                      {rememberMe && (
                        <Ionicons name="checkmark" size={12} color="#1a1a1a" />
                      )}
                    </View>
                    <Text style={styles.rememberMeText}>Lembrar-me</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Botão Principal */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  loading && styles.loginButtonDisabled
                ]}
                onPress={isRegistering ? handleRegister : handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#1a1a1a" size="small" />
                ) : (
                  <Text style={styles.loginButtonText}>
                    {isRegistering ? 'Criar Conta' : 'Entrar'}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Esqueci a senha - apenas no login */}
              {!isRegistering && (
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    Esqueceu a senha?
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Switch Mode */}
            <View style={styles.switchModeContainer}>
              <TouchableOpacity 
                style={styles.switchModeButton}
                onPress={handleSwitchMode}
              >
                <Text style={styles.switchModeText}>
                  {isRegistering 
                    ? 'Já tem conta? Entrar' 
                    : 'Não tem conta? Criar Conta'
                  }
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Versão 1.0.0
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>

      {/* Popup Component */}
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