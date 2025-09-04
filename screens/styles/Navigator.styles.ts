import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  tabBar: {
    height: height * 0.07,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabItem: {
    paddingHorizontal: 16,
    padding: 8,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  tabItemFocused: {
    backgroundColor: "#57575720",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "gray",
  },
  tabLabelFocused: {
    color: "#000000ff",
  },
  badge: {
    position: "absolute",
    right: 7,
    top: -2,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
