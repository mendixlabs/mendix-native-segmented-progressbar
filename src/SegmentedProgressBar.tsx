import { createElement, ReactNode, useMemo } from "react";
import { View } from "react-native";
import { ValueStatus } from "mendix";
import { useLayout } from "@react-native-community/hooks/lib/useLayout";
import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { SegmentedProgressBarProps } from "../typings/SegmentedProgressBarProps";
import { CustomStyle, defaultContentRendererStyle } from "./ui/style";

import ObjectList from "./components/ObjectList";
import { createProgressBarObjectsWithWidth, ProgressbarObject, sortOrderFunc } from "./util/objects";

const SegmentedProgressBar = ({
    sourceJSON,
    sourceObjects,
    sourceObjectColor,
    sourceObjectSort,
    sourceObjectValue,
    style
}: SegmentedProgressBarProps<CustomStyle>): ReactNode => {
    const styles = mergeNativeStyles(defaultContentRendererStyle, style);

    const { onLayout, ...layout } = useLayout();

    const objectsWithWidth = useMemo(() => {
        if (!layout || layout.width === 0) {
            return [];
        }

        if (sourceJSON && sourceJSON.status === ValueStatus.Available && sourceJSON.value) {
            // Scenario 1 : JSON

            try {
                const parsed = (JSON.parse(sourceJSON.value) as ProgressbarObject[]).sort(sortOrderFunc);

                return createProgressBarObjectsWithWidth(parsed, layout.width);
            } catch (error) {
                console.warn(error);
            }
        } else if (
            sourceObjects &&
            sourceObjects.status === ValueStatus.Available &&
            sourceObjects.items &&
            sourceObjectValue &&
            sourceObjectColor
        ) {
            // Scenario 2 : OBJECTS

            const objects: ProgressbarObject[] = sourceObjects.items
                .map(object => {
                    const progressBarObject: ProgressbarObject = {
                        value: sourceObjectValue.get(object).value?.toNumber() || 0,
                        color: sourceObjectColor.get(object).value || ""
                    };
                    const sort = sourceObjectSort ? sourceObjectSort.get(object).value : null;
                    if (sort !== null) {
                        progressBarObject.sortOrder = sort?.toNumber();
                    }
                    return progressBarObject;
                })
                .sort(sortOrderFunc);

            return createProgressBarObjectsWithWidth(objects, layout.width);
        }

        return [];
    }, [layout, sourceJSON, sourceObjectColor, sourceObjectSort, sourceObjectValue, sourceObjects]);

    return (
        <View onLayout={onLayout} style={styles.container}>
            <ObjectList objects={objectsWithWidth} objectStyle={styles.item} />
        </View>
    );
};

SegmentedProgressBar.displayName = "SegmentedProgressBar";

export { SegmentedProgressBar };
