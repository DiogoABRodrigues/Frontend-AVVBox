import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  tabBar: {
    height: height * 0.08, // Mudança: ligeiramente mais alto
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1, // Mudança: borda sutil no topo
    borderTopColor: "#e2e8f0",
    shadowColor: '#000', // Mudança: sombra para elevação
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -2 },
    elevation: 3,
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 8, // Mudança: padding vertical específico
    borderRadius: 12, // Mudança: border radius consistente
    minWidth: 60, // Mudança: largura mínima para consistência
  },
  tabItemFocused: {
    backgroundColor: "#dbeafe", // Mudança: azul suave consistente
    paddingHorizontal: 16,
    paddingVertical: 8, // Mudança: padding consistente
    borderRadius: 12, // Mudança: border radius consistente
    borderWidth: 1, // Mudança: borda sutil
    borderColor: "#bfdbfe",
    shadowColor: '#2563eb', // Mudança: sombra colorida
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#64748b", // Mudança: cor mais suave
    fontWeight: '500', // Mudança: peso específico
  },
  tabLabelFocused: {
    color: "#1E293B", // Mudança: azul escuro consistente
    fontWeight: '600', // Mudança: peso mais específico
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
    position: 'relative', // Para posicionamento do badge
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