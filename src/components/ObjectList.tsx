import { ReactElement, createElement, Fragment } from "react";
import { View, ViewStyle } from "react-native";
import { ProgressbarObjectWithWidth } from "../util/objects";

const ObjectList = ({
    objects,
    objectStyle
}: {
    objects: ProgressbarObjectWithWidth[];
    objectStyle: ViewStyle;
}): ReactElement => {
    if (!objects) {
        return <View />;
    }
    const { height, borderRadius } = objectStyle;
    return (
        <Fragment>
            {objects.map((obj, index) => (
                <View
                    key={`${index}-${obj.sortOrder}`}
                    style={{
                        height,
                        width: obj.width,
                        backgroundColor: obj.color,

                        borderTopLeftRadius: index === 0 ? borderRadius : 0,
                        borderBottomLeftRadius: index === 0 ? borderRadius : 0,

                        borderTopRightRadius: index === objects.length - 1 ? borderRadius : 0,
                        borderBottomRightRadius: index === objects.length - 1 ? borderRadius : 0
                    }}
                />
            ))}
        </Fragment>
    );
};

export default ObjectList;
