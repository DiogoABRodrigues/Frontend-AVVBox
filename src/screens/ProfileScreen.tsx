import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { styles } from './styles/ProfileScreen.styles';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const actions = [
    { title: 'Editar Perfil', icon: 'person-outline', onPress: () => {} },
    { title: 'Definir Metas', icon: 'flag-outline', onPress: () => {} },
    { title: 'Contactos dos PTs', icon: 'people-outline', onPress: () => {} },
    { title: 'Notificações', icon: 'notifications-outline', onPress: () => {} },
    { title: 'Logout', icon: 'log-out-outline', onPress: logout, isLogout: true },
  ];

  return (
    <View style={styles.container}>   
    <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
    </View>
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user?.name || 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user?.name || 'Nome do Utilizador'}</Text>
          <Text style={styles.email}>{user?.name || 'email@exemplo.com'}</Text>
          <Text style={styles.details}>
            Idade: {user?.name || 'N/A'} | Data de Nascimento: {user?.name || 'N/A'}
          </Text>
        </View>
      </View>

      {/* Ações em caixas */}
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.actionBox, action.isLogout && styles.logoutBox]}
          onPress={action.onPress}
        >
          <Ionicons
            name={action.icon as any}
            size={24}
            color={action.isLogout ? '#ff4d4d' : '#000000ff'}
            style={styles.actionIcon}
          />
          <Text style={[styles.actionText, action.isLogout && { color: '#ff4d4d' }]}>
            {action.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </View>
  );
}
