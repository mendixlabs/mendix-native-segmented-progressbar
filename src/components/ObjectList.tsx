import { ReactElement, createElement, Fragment } from "react";
import { View } from "react-native";
import { ProgressbarObjectWithWidth } from "../SegmentedProgressBar";

const ObjectList = ({
    objects,
    height,
    borderRadius
}: {
    objects: ProgressbarObjectWithWidth[];
    height: number;
    borderRadius: number;
}): ReactElement => {
    if (!objects) {
        return <View />;
    }
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
