import { ViewStyle } from "react-native";
import { Style } from "@mendix/pluggable-widgets-tools";

export interface CustomStyle extends Style {
    container: ViewStyle;
    containerVertical: ViewStyle;
    item: ViewStyle;
    firstItem: ViewStyle;
    lastItem: ViewStyle;
    middleItem: ViewStyle;
}

export const defaultContentRendererStyle: CustomStyle = {
    container: {
        flexDirection: "row",
        width: "100%"
    },
    containerVertical: {
        flexDirection: "column",
        height: "100%"
    },
    item: {
        height: 20,
        width: 20,
        borderRadius: 20
    },
    firstItem: {},
    lastItem: {},
    middleItem: {}
};
