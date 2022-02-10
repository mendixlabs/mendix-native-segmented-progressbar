import { ReactElement, createElement, Fragment } from "react";
import { TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { ProgressbarObjectWithWidth } from "../util/objects";

const ObjectList = ({
    objects,
    objectStyle,
    onClick
}: {
    objects: ProgressbarObjectWithWidth[];
    objectStyle: ViewStyle;
    onClick: (obj: ProgressbarObjectWithWidth) => void;
    hasClickAction?: boolean;
}): ReactElement => {
    if (!objects) {
        return <View />;
    }
    const { height, borderRadius } = objectStyle;
    return (
        <Fragment>
            {objects.map((obj, index) => (
                <TouchableWithoutFeedback
                    key={`${
                        obj.mxObject ? "progressBar-" + index + "-" + obj.mxObject.id : index + "-" + obj.sortOrder
                    }`}
                    onPress={() => onClick(obj)}
                >
                    <View
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
                </TouchableWithoutFeedback>
            ))}
        </Fragment>
    );
};

export default ObjectList;
