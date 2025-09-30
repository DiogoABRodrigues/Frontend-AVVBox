import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models/User";
import { userService } from "@/services/usersService";
import { unregisterIndieDevice } from 'native-notify';

interface AuthContextType {
  user: User | null;
  login: (userData: User, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Recupera usuário do AsyncStorage ao iniciar o app
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const userRefresh = await userService.getById(JSON.parse(storedUser)._id);
          //guardar o usuário atualizado no async storage
          await AsyncStorage.setItem("user", JSON.stringify(userRefresh));
          setUser(userRefresh);
        }
      } catch (err) {
        console.log("Erro ao carregar usuário localmente:", err);
      }
    };
    loadUser();
  }, []);

  const login = async (userData: User, rememberMe: boolean = false) => {
    setUser(userData);
    if (rememberMe) {
      try {
        await AsyncStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        console.log("Erro ao salvar usuário localmente:", err);
      }
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      unregisterIndieDevice(user?._id, 32295, 'wyhRSJsJFB6gxzAT0mmfaF');
    } catch (err) {
      console.log("Erro ao desregistrar dispositivo:", err);
    }
    try {
      await AsyncStorage.removeItem("user");
    } catch (err) {
      console.log("Erro ao remover usuário localmente:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
