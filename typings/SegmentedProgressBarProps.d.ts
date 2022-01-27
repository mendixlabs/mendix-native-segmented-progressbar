/**
 * This file was generated from SegmentedProgressBar.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue } from "mendix";

export interface SegmentedProgressBarProps<Style> {
    name: string;
    style: Style[];
    sourceJSON: DynamicValue<string>;
    height: number;
    borderRadius: number;
}

export interface SegmentedProgressBarPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    sourceJSON: string;
    height: number | null;
    borderRadius: number | null;
}
