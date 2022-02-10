import { ReactElement, createElement, Fragment } from "react";
import { TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { CustomStyle } from "../ui/style";
import { ProgressbarObjectWithWidth } from "../util/objects";

const ObjectList = ({
    objects,
    styles,
    onClick
}: {
    objects: ProgressbarObjectWithWidth[];
    styles: CustomStyle;
    onClick: (obj: ProgressbarObjectWithWidth) => void;
    hasClickAction?: boolean;
}): ReactElement => {
    if (!objects) {
        return <View />;
    }
    const { height, borderRadius } = styles.item;
    return (
        <Fragment>
            {objects.map((obj, index) => {
                const itemStyle: ViewStyle =
                    index === 0
                        ? styles.leftMostItem
                        : index === objects.length - 1
                        ? styles.rightMostItem
                        : styles.middleItem;
                return (
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
                                borderBottomRightRadius: index === objects.length - 1 ? borderRadius : 0,

                                ...itemStyle
                            }}
                        />
                    </TouchableWithoutFeedback>
                );
            })}
        </Fragment>
    );
};

export default ObjectList;
