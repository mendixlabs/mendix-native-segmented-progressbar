import { ObjectItem } from "mendix";

export interface ProgressbarObject {
    value: number;
    sortOrder?: number;
    color: string;
    mxObject?: ObjectItem;
}

export interface ProgressbarObjectWithSize extends ProgressbarObject {
    _size: number;
}

export const createProgressBarObjectsWithSize = (
    objectList: ProgressbarObject[],
    size: number
): ProgressbarObjectWithSize[] => {
    const maxValue = objectList.reduce((totalValue, currentObject) => totalValue + currentObject.value, 0);
    if (maxValue === 0) {
        return [];
    }
    return objectList.map(obj => ({
        ...obj,
        _size: (size * obj.value) / maxValue
    }));
};

export const sortOrderFunc = (
    { sortOrder: sortOrderA = 0 }: ProgressbarObject,
    { sortOrder: sortOrderB = 0 }: ProgressbarObject
): number => sortOrderA - sortOrderB;
