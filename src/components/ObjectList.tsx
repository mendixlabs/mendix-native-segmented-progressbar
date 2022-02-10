import { ReactElement, createElement, Fragment } from "react";
import { TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { TypeProgressBarEnum } from "../../typings/SegmentedProgressBarProps";
import { CustomStyle } from "../ui/style";
import { ProgressbarObjectWithSize } from "../util/objects";

const ObjectList = ({
    objects,
    styles,
    onClick,
    type
}: {
    objects: ProgressbarObjectWithSize[];
    styles: CustomStyle;
    onClick: (obj: ProgressbarObjectWithSize) => void;
    hasClickAction?: boolean;
    type: TypeProgressBarEnum;
}): ReactElement => {
    if (!objects) {
        return <View />;
    }

    return (
        <Fragment>
            {objects.map((obj, index) => {
                const itemStyle: ViewStyle =
                    index === 0 ? styles.firstItem : index === objects.length - 1 ? styles.lastItem : styles.middleItem;
                const colorStyle: ViewStyle = {
                    backgroundColor: obj.color
                };
                const sizeStyle: ViewStyle =
                    type === "horizontal"
                        ? {
                              height: styles.item.height,
                              width: obj._size
                          }
                        : {
                              height: obj._size,
                              width: styles.item.width
                          };
                const borderRadiusStyle: ViewStyle =
                    type === "horizontal"
                        ? {
                              borderTopLeftRadius: index === 0 ? styles.item.borderRadius : 0,
                              borderBottomLeftRadius: index === 0 ? styles.item.borderRadius : 0,

                              borderTopRightRadius: index === objects.length - 1 ? styles.item.borderRadius : 0,
                              borderBottomRightRadius: index === objects.length - 1 ? styles.item.borderRadius : 0
                          }
                        : {
                              borderTopLeftRadius: index === 0 ? styles.item.borderRadius : 0,
                              borderTopRightRadius: index === 0 ? styles.item.borderRadius : 0,

                              borderBottomLeftRadius: index === objects.length - 1 ? styles.item.borderRadius : 0,
                              borderBottomRightRadius: index === objects.length - 1 ? styles.item.borderRadius : 0
                          };

                return (
                    <TouchableWithoutFeedback
                        key={`${
                            obj.mxObject ? "progressBar-" + index + "-" + obj.mxObject.id : index + "-" + obj.sortOrder
                        }`}
                        onPress={() => onClick(obj)}
                    >
                        <View
                            style={{
                                ...sizeStyle,
                                ...borderRadiusStyle,
                                ...colorStyle,
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
