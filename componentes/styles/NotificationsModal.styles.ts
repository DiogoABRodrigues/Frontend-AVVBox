import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  bodyInput: {
    height: 100,
  },
  label: {
    marginBottom: 4,
    fontWeight: "500",
  },
  recipientButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  recipientButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 6,
    marginRight: 6,
  },
  recipientSelected: {
    backgroundColor: "#cce5ff",
    borderColor: "#007bff",
  },
  userListContainer: {
    maxHeight: 200,
    marginTop: 8,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  actionButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderColor: '#ff4d4d',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  clearButtonText: {
    color: '#ff4d4d',
    fontWeight: 'bold',
    fontSize: 14,
  },
  actionLeft: {
    flex: 1,
    marginRight: 8,
  },
  actionRight: {
    flex: 1,
    marginLeft: 8,
  },
});
