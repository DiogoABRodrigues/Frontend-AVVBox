  import { StyleSheet } from 'react-native';

  export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f3f3f3',
      padding: 16,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },

    markAsReadButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: "#ffffffff",
      borderWidth: 1,
      borderColor: "#000", // contorno preto
      borderRadius: 8,
      },

    markAsReadText: {
      color: "#000",
      fontSize: 14, 
    },

    clearButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: "#ff4d4d",  // contorno vermelho
      borderRadius: 8,
      backgroundColor: "#fff", // fundo branco
    },

  clearButtonText: {
    color: "#ff4d4d", // texto vermelho
    fontSize: 14,
    fontWeight: "bold",
  },

    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    unreadBadge: {
      backgroundColor: '#e53935',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      marginLeft: 4,
    },
    unreadText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12,
    },
    notificationsList: {
      flex: 1,
    },
    notificationItem: {
      flexDirection: 'row',
      padding: 12,
      marginBottom: 12,
      borderRadius: 12,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      gap: 12,
    },
    notificationUnread: {
      backgroundColor: '#d9d9d9',
      borderWidth: 1,
      borderColor: 'black',
    },
    notificationContent: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: 16,
      fontWeight: 'normal',
    },
    notificationTitleUnread: {
      fontWeight: 'bold',
    },
    notificationBody: {
      color: '#555',
      marginTop: 2,
    },
    notificationDate: {
      color: '#999',
      fontSize: 12,
      marginTop: 4,
    },
  });
