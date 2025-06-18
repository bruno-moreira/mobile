import { StyleSheet } from "react-native";
import { colors } from "@/styles/theme";
import { fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  header: {
    backgroundColor: colors.green.base,
    padding: 16,
    paddingTop: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.gray[100],
  },
  headerButtons: {
    flexDirection: "row",
    gap: 16,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.green.dark,
  },
  sellButton: {
    backgroundColor: colors.gray[100],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sellButtonText: {
    color: colors.green.base,
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  subheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  subheaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.gray[600],
  },
  card: {
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 16,
  },
  cardCategory: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.gray[600],
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gray[600],
    marginTop: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.gray[500],
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.gray[600],
  },
  cardButton: {
    backgroundColor: colors.green.base,
    padding: 12,
    borderRadius: 8,
  },
  cardButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.gray[100],
  },
  backButton: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  list: {
    gap: 16,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  ratingText: {
    fontSize: 12,
    color: colors.gray[500],
    marginLeft: 4,
  },
  stockText: {
    fontSize: 12,
    color: colors.gray[500],
    fontFamily: fontFamily.medium,
  },
  calloutTitle: {
    fontSize: 14,
    color: colors.gray[600],
    fontFamily: fontFamily.medium,
  },
  calloutDescription: {
    fontSize: 12,
    color: colors.gray[600],
    fontFamily: fontFamily.medium,
  },
  myItemBadge: {
    backgroundColor: colors.green.base,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  myItemText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.gray[100],
  },
});
