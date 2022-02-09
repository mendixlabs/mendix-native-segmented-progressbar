import { createElement, ReactNode, useMemo } from "react";
import { View } from "react-native";
import { ValueStatus } from "mendix";
import { Style } from "@mendix/pluggable-widgets-tools";
import { useLayout } from "@react-native-community/hooks/lib/useLayout";

import { SegmentedProgressBarProps } from "../typings/SegmentedProgressBarProps";
import ObjectList from "./components/ObjectList";

export interface ProgressbarObject {
    value: number;
    sortOrder?: number;
    color: string;
}

export interface ProgressbarObjectWithWidth extends ProgressbarObject {
    width: number;
}

const SegmentedProgressBar = (props: SegmentedProgressBarProps<Style>): ReactNode => {
    const { height, borderRadius, sourceJSON } = props;
    const { onLayout, ...layout } = useLayout();

    const objectsWithWidth = useMemo(() => {
        if (sourceJSON.status === ValueStatus.Loading || !sourceJSON.value || !layout || layout.width === 0) {
            return [];
        } else if (sourceJSON.status === ValueStatus.Available && sourceJSON.value) {
            try {
                const parsed = (JSON.parse(sourceJSON.value) as ProgressbarObject[]).sort(
                    ({ sortOrder: sortOrderA = 0 }, { sortOrder: sortOrderB = 0 }) => sortOrderA - sortOrderB
                );
                const maxValue = parsed.reduce((totalValue, currentObject) => totalValue + currentObject.value, 0);
                const list: ProgressbarObjectWithWidth[] = parsed.map(obj => ({
                    ...obj,
                    width: (layout.width * obj.value) / maxValue
                }));

                return list;
            } catch (error) {
                console.warn(error);
            }
        }
        return [];
    }, [layout, sourceJSON.status, sourceJSON.value]);

    return (
        <View onLayout={onLayout} style={{ flexDirection: "row", width: "100%" }}>
            <ObjectList objects={objectsWithWidth} borderRadius={borderRadius} height={height} />
        </View>
    );
};

SegmentedProgressBar.displayName = "SegmentedProgressBar";

export { SegmentedProgressBar };
