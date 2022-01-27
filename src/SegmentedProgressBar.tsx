import { createElement, ReactElement, ReactNode } from "react";
import { View } from "react-native";
import { ValueStatus } from "mendix";
import { Style } from "@mendix/pluggable-widgets-tools";
import { useLayout } from "@react-native-community/hooks/lib/useLayout";

import { SegmentedProgressBarProps } from "../typings/SegmentedProgressBarProps";

export interface ProgressbarObject {
    value: number;
    sortOrder: number;
    color: string;
    width: number;
}

const SegmentedProgressBar = (props: SegmentedProgressBarProps<Style>): ReactNode => {
    const { height, borderRadius, sourceJSON } = props;
    const { onLayout, ...layout } = useLayout();

    let objList: ReactElement[] = [];

    if (sourceJSON.status === ValueStatus.Loading || !sourceJSON.value || !layout || layout.width === 0) {
        objList = [];
    } else if (sourceJSON.status === ValueStatus.Available && sourceJSON.value) {
        try {
            const parsed = (JSON.parse(sourceJSON.value) as ProgressbarObject[]).sort((a, b) => {
                return a.sortOrder - b.sortOrder;
            });
            const maxValue = parsed.reduce((totalValue, currentObject) => totalValue + currentObject.value, 0);
            const objectsWithWidth = parsed.map(obj => ({ ...obj, width: (layout.width * obj.value) / maxValue }));

            objList = objectsWithWidth.map((obj, index) => (
                <View
                    key={obj.sortOrder}
                    style={{
                        height,
                        width: obj.width,
                        backgroundColor: obj.color,

                        borderTopLeftRadius: index === 0 ? borderRadius : 0,
                        borderBottomLeftRadius: index === 0 ? borderRadius : 0,

                        borderTopRightRadius: index === objectsWithWidth.length - 1 ? borderRadius : 0,
                        borderBottomRightRadius: index === objectsWithWidth.length - 1 ? borderRadius : 0
                    }}
                />
            ));
        } catch (error) {
            console.warn(error);
        }
    }

    return (
        <View onLayout={onLayout} style={{ flexDirection: "row", width: "100%" }}>
            {objList}
        </View>
    );
};

SegmentedProgressBar.displayName = "SegmentedProgressBar";

export { SegmentedProgressBar };
