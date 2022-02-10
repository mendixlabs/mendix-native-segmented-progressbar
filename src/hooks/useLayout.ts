import { useState, useCallback } from "react";
import { LayoutChangeEvent, LayoutRectangle } from "react-native";

export interface UseLayoutReturn {
    onLayout: (e: LayoutChangeEvent) => void;
    layout: LayoutRectangle;
}

function useLayout(): UseLayoutReturn {
    const [layout, setLayout] = useState<LayoutRectangle>({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });
    const onLayout = useCallback((e: LayoutChangeEvent) => setLayout(e.nativeEvent.layout), []);

    return {
        onLayout,
        layout
    };
}

export default useLayout;
