import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
tabBar: {
  height: 80, // Mudança: altura fixa em vez de porcentagem
  backgroundColor: "#ffffff",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  borderTopWidth: 1,
  borderTopColor: "#e2e8f0",
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: -2 },
  elevation: 3,
},
  tabItem: {
    paddingHorizontal: 0,
    paddingVertical: 8, // Mudança: padding vertical específico
    borderRadius: 12, // Mudança: border radius consistente
    minWidth: 80, // Mudança: largura mínima para consistência
  },
  tabItemFocused: {
    backgroundColor: "#dbeafe", // Mudança: azul suave consistente
    paddingHorizontal: 0,
    paddingVertical: 8, // Mudança: padding consistente
    borderRadius: 12, // Mudança: border radius consistente
    borderWidth: 1, // Mudança: borda sutil
    borderColor: "#bfdbfe",
    shadowColor: '#2563eb', // Mudança: sombra colorida
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    minWidth: 80,
  },
  tabLabel: {
    fontSize: 13, // menor que 12
    marginTop: 2, // diminui o espaço do topo
    color: "#64748b",
    fontWeight: '500',
    textAlign: 'center', // importante
  },

  tabLabelFocused: {
    color: "#1E293B", // Mudança: azul escuro consistente
    fontWeight: '600',
  },
  badge: {
    position: "absolute",
    right: 22, // Mudança: posicionamento ajustado
    top: -3, // Mudança: posicionamento ajustado
    backgroundColor: "#ef4444", // Mudança: vermelho mais moderno
    borderRadius: 10,
    minWidth: 20, // Mudança: ligeiramente maior
    height: 20, // Mudança: ligeiramente maior
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6, // Mudança: padding ajustado
    borderWidth: 1, // Mudança: borda branca para destaque
    borderColor: "#ffffff",
    shadowColor: '#000', // Mudança: sombra para destaque
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 11, // Mudança: fonte ligeiramente maior
    fontWeight: "700", // Mudança: peso mais específico
    textAlign: 'center', // Mudança: alinhamento central
    lineHeight: 12, // Mudança: line height para melhor legibilidade
  },
  
  // Novos estilos para o container do ícone
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 4,
    minHeight: 50,
    flexDirection: 'column',
  },
  
  // Estilo para o header title container
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  
  headerTitle: {
    fontSize: 24, // Mudança: fonte ligeiramente menor para mobile
    fontWeight: "700", // Mudança: peso mais específico
    marginLeft: 12, // Mudança: espaçamento ajustado
    color: "#1e293b", // Mudança: cor consistente
  },
  
  headerIcon: {
    color: "#1E293B", // Mudança: cor azul consistente
  },
}); 