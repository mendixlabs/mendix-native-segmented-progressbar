import { createElement, ReactNode, useMemo } from "react";
import { View } from "react-native";
import { ValueStatus } from "mendix";
import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { SegmentedProgressBarProps } from "../typings/SegmentedProgressBarProps";
import { CustomStyle, defaultContentRendererStyle } from "./ui/style";

import ObjectList from "./components/ObjectList";
import {
    createProgressBarObjectsWithSize,
    ProgressbarObject,
    ProgressbarObjectWithSize,
    sortOrderFunc
} from "./util/objects";
import useLayout from "./hooks/useLayout";

const SegmentedProgressBar = ({
    sourceJSON,
    sourceObjects,
    sourceObjectColor,
    sourceObjectSort,
    sourceObjectValue,
    onClickElementAction,
    typeProgressBar,
    style
}: SegmentedProgressBarProps<CustomStyle>): ReactNode => {
    const styles = mergeNativeStyles(defaultContentRendererStyle, style);

    const { onLayout, layout } = useLayout();
    const sizeNum = typeProgressBar === "horizontal" ? layout.width : layout.height;
    const containerStyle = typeProgressBar === "horizontal" ? styles.container : styles.containerVertical;

    const objectsWithSize = useMemo(() => {
        if (sizeNum === 0) {
            return [];
        }

        if (sourceJSON && sourceJSON.status === ValueStatus.Available && sourceJSON.value) {
            // Scenario 1 : JSON

            try {
                const parsed = (JSON.parse(sourceJSON.value) as ProgressbarObject[]).sort(sortOrderFunc);

                return createProgressBarObjectsWithSize(parsed, sizeNum);
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
                        color: sourceObjectColor.get(object).value || "",
                        mxObject: object
                    };
                    const sort = sourceObjectSort ? sourceObjectSort.get(object).value : null;
                    if (sort !== null) {
                        progressBarObject.sortOrder = sort?.toNumber();
                    }
                    return progressBarObject;
                })
                .sort(sortOrderFunc);

            return createProgressBarObjectsWithSize(objects, sizeNum);
        }

        return [];
    }, [sizeNum, sourceJSON, sourceObjectColor, sourceObjectSort, sourceObjectValue, sourceObjects]);

    const onClick = (obj: ProgressbarObjectWithSize): void => {
        if (obj && obj.mxObject && onClickElementAction) {
            const action = onClickElementAction.get(obj.mxObject);
            if (action && action.canExecute && !action.isExecuting) {
                action.execute();
            }
        }
    };

    return (
        <View onLayout={onLayout} style={containerStyle}>
            <ObjectList
                objects={objectsWithSize}
                styles={styles}
                onClick={onClick}
                type={typeProgressBar}
                hasClickAction={typeof onClickElementAction !== "undefined"}
            />
        </View>
    );
};

SegmentedProgressBar.displayName = "SegmentedProgressBar";

export { SegmentedProgressBar };
