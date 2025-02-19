import { StyleSheet } from "react-native"
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        flex: 1,
        width: "100%",
    },
    button: {
        backgroundColor: colors.gray[400],
        height: 80,
        width: 80,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: colors.gray[100],
        fontFamily: fontFamily.semiBold,
        fontSize: 16,
    },
})