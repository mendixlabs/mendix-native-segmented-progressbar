import { ViewStyle } from "react-native";
import { Style } from "@mendix/pluggable-widgets-tools";

export interface CustomStyle extends Style {
    container: ViewStyle;
    item: ViewStyle;
    leftMostItem: ViewStyle;
    rightMostItem: ViewStyle;
    middleItem: ViewStyle;
}

export const defaultContentRendererStyle: CustomStyle = {
    container: {
        flexDirection: "row",
        width: "100%"
    },
    item: {
        height: 20,
        borderRadius: 20
    },
    leftMostItem: {},
    rightMostItem: {},
    middleItem: {}
};
