/**
 * This file was generated from SegmentedProgressBar.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue, ListValue, ListActionValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

export interface SegmentedProgressBarProps<Style> {
    name: string;
    style: Style[];
    sourceJSON?: DynamicValue<string>;
    sourceObjects?: ListValue;
    sourceObjectValue?: ListExpressionValue<Big>;
    sourceObjectColor?: ListExpressionValue<string>;
    sourceObjectSort?: ListExpressionValue<Big>;
    onClickElementAction?: ListActionValue;
}

export interface SegmentedProgressBarPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    sourceJSON: string;
    sourceObjects: {} | { type: string } | null;
    sourceObjectValue: string;
    sourceObjectColor: string;
    sourceObjectSort: string;
    onClickElementAction: {} | null;
}
