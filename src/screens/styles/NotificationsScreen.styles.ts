/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet } from "react-native";

export const notificationStyles = (colors: any) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Mudança: cor de fundo mais suave
    paddingHorizontal: 16,
  },

  // Header separado para o título
  titleHeader: {
    marginBottom: 24, // Mudança: mais espaçamento
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28, // Mudança: fonte maior e mais consistente
    fontWeight: "700", // Mudança: peso de fonte mais específico
    color: colors.header, // Mudança: cor mais escura e moderna
  },

  // Header para os botões de ação
  actionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16, // Mudança: espaçamento ajustado
    flexWrap: "wrap",
    marginLeft: 2, // Mudança: ajuste para espaçamento consistente
    gap: 12, // Mudança: gap consistente
  },

  // Separador visual - removido ou simplificado
  separator: {
    height: 1,
    backgroundColor: colors.greyLight, // Mudança: cor mais suave
    marginBottom: 24, // Mudança: mais espaçamento
  },

  actionButton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    paddingHorizontal: 16, // Mudança: padding mais generoso
    paddingVertical: 12, // Mudança: padding vertical maior
    backgroundColor: colors.white, // Mudança: cor primária azul
  },
  actionButtonText: {
    color: colors.header, // Mudança: texto branco
    fontWeight: "600", // Mudança: peso mais específico
    fontSize: 14,
  },
  clearButton: {
    paddingHorizontal: 16, // Mudança: padding consistente
    paddingVertical: 12,
    backgroundColor: colors.white, // Mudança: fundo branco
    borderWidth: 1,
    borderRadius: 16, // Mudança: border radius maior
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderColor: colors.redMedium,
  },
  clearButtonText: {
    color: colors.red, // Mudança: vermelho mais moderno
    fontWeight: "600", // Mudança: peso mais específico
    fontSize: 14,
  },

  notificationsList: {
    flex: 1,
  },

  // Estado vazio
  emptyStateContainer: {
    alignItems: "center", // Mudança: consistente com outros estilos
    paddingVertical: 32, // Mudança: padding mais compacto
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "700", // Mudança: peso mais específico
    color: colors.darkGrey, // Mudança: cor mais consistente
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.greyMedium, // Mudança: cor mais suave e consistente
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 22,
  },

  notificationItem: {
    flexDirection: "row",
    padding: 16, // Mudança: padding maior
    marginBottom: 12,
    borderRadius: 16, // Mudança: border radius maior
    backgroundColor: colors.white,
    alignItems: "flex-start",
    gap: 12,
    borderWidth: 1, // Mudança: borda sutil sempre presente
    borderColor: colors.greyLight,
    shadowColor: colors.black,
    shadowOpacity: 0.08, // Mudança: sombra mais suave
    shadowRadius: 6, // Mudança: sombra mais difusa
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  notificationUnread: {
    backgroundColor: colors.blueLight, // Mudança: azul suave para não lidas
    borderColor: colors.blue, // Mudança: borda azul para destacar
    borderWidth: 2, // Mudança: borda mais espessa
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "500", // Mudança: peso médio
    color: colors.darkGrey, // Mudança: cor mais consistente
  },
  notificationTitleUnread: {
    fontWeight: "700", // Mudança: peso mais específico
    color: colors.header, // Mudança: cor mais escura para não lidas
  },
  notificationBody: {
    color: colors.description, // Mudança: cor mais suave
    fontSize: 14, // Mudança: tamanho especificado
    marginTop: 4, // Mudança: espaçamento ajustado
    lineHeight: 20, // Mudança: line height ajustado
  },
  notificationDate: {
    color: colors.greyMedium, // Mudança: cor mais suave
    fontSize: 12,
    fontWeight: "500", // Mudança: peso especificado
    marginTop: 6, // Mudança: espaçamento ajustado
  },

  // Modal styles melhorados
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Mudança: transparência mais específica
  },
  modalContainer: {
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 16, // Mudança: border radius maior
    padding: 24, // Mudança: padding maior
    maxHeight: "80%",
    shadowColor: colors.black,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  modalTitle: {
    fontWeight: "700", // Mudança: peso mais específico
    fontSize: 20, // Mudança: fonte maior
    marginBottom: 16, // Mudança: espaçamento maior
    color: colors.header, // Mudança: cor mais consistente
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.greyLight, // Mudança: cor de borda mais suave
    borderRadius: 12, // Mudança: border radius maior
    padding: 12, // Mudança: padding maior
    marginBottom: 16, // Mudança: espaçamento maior
    backgroundColor: colors.white,
    fontSize: 16,
    color: colors.darkGrey, // Mudança: cor do texto
  },
  recipientButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16, // Mudança: espaçamento maior
    gap: 8, // Mudança: gap entre botões
  },
  recipientButton: {
    flex: 1, // Mudança: distribuição igual
    padding: 12, // Mudança: padding maior
    borderWidth: 1,
    borderColor: colors.greyLight, // Mudança: cor de borda mais suave
    borderRadius: 12, // Mudança: border radius maior
    backgroundColor: colors.white,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  recipientSelected: {
    borderColor: colors.blue, // Mudança: azul consistente
    backgroundColor: colors.blueLight, // Mudança: fundo azul suave
  },
  recipientButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.description,
  },
  recipientSelectedText: {
    color: colors.darkBlue, 
    fontWeight: "700",
  },
});
