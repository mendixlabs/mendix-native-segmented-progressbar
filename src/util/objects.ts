import { ObjectItem } from "mendix";

export interface ProgressbarObject {
    value: number;
    sortOrder?: number;
    color: string;
    mxObject?: ObjectItem;
}

export interface ProgressbarObjectWithWidth extends ProgressbarObject {
    width: number;
}

export const createProgressBarObjectsWithWidth = (
    objectList: ProgressbarObject[],
    width: number
): ProgressbarObjectWithWidth[] => {
    const maxValue = objectList.reduce((totalValue, currentObject) => totalValue + currentObject.value, 0);
    if (maxValue === 0) {
        return [];
    }
    return objectList.map(obj => ({
        ...obj,
        width: (width * obj.value) / maxValue
    }));
};

export const sortOrderFunc = (
    { sortOrder: sortOrderA = 0 }: ProgressbarObject,
    { sortOrder: sortOrderB = 0 }: ProgressbarObject
): number => sortOrderA - sortOrderB;
