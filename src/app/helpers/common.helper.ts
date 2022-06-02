export class CommonHelper {
    public static findValueInObjectForPath<T>(path: string, object: T): any {
        if (!path || !object) {
            return;
        }
        let currentValue: unknown = object;
        path.split('.').forEach((layer: string) => {
            if (layer.slice(0, 1) !== '[') {
                currentValue = currentValue && currentValue[layer];
            } else {
                const maskFindValue = layer.slice(1, -1).split('=');
                const array: Array<unknown> = currentValue as Array<unknown>;
                currentValue = currentValue && array.find((arrayItem: Array<unknown>) => arrayItem[maskFindValue[0]] === maskFindValue[1]);
            }
        });
        return currentValue;

        /**
         * past your object and path to value in mask: 'object.key.key2.[keyInArray=keiInValue].key3'
         * example:
         * object = { id: '01', name: 'name', params: [{paramId: 'p01', value: 'orange'}, {paramId: 'p02', value: 'red'}] }
         *
         * path = 'id'                             -> '01'
         * path = 'params'                         -> [{paramId: 'p01', value: 'orange'}, {paramId: 'p02', value: 'red'}]
         * path = 'params.[paramId=p01].value'     -> 'orange'
         */
    }

    public static filterBy<T>(items: T[], filterValue: string, valueObjectPath?: string, caseInsensitivity?: boolean): T[] {
        if (!items?.length) {
            return [];
        }
        if (!filterValue || (typeof items[0] === 'object' && !valueObjectPath)) {
            return items;
        }
        return valueObjectPath
            ? items.filter((item: unknown) => (caseInsensitivity
                ? CommonHelper.findValueInObjectForPath(valueObjectPath, item)?.toString()?.toLowerCase()?.includes(filterValue.toLowerCase())
                : CommonHelper.findValueInObjectForPath(valueObjectPath, item)?.toString()?.includes(filterValue)))
            : items.filter((item: unknown) => (caseInsensitivity
                ? item?.toString()?.toLowerCase()?.includes(filterValue.toLowerCase())
                : item?.toString()?.includes(filterValue)));
    }

    public static objectGroupByParameter<ArrayType>(
        originArray: ArrayType[],
        groupParamPath: string,
        minGroupElem?: number,
        noValueGroupKey?: string,
    ): Record<string, ArrayType[]> {
        const groupedObject: Record<string, ArrayType[]> = {};

        originArray.forEach((arrayItem) => {
            const groupKey = CommonHelper.findValueInObjectForPath(groupParamPath, arrayItem) as string || noValueGroupKey || 'ungrouped';
            groupedObject[groupKey] = [
                ...groupedObject[groupKey] || [],
                ...[arrayItem],
            ];
        });

        for (const key in groupedObject) {
            if (groupedObject[key].length < (minGroupElem || 1) && key !== noValueGroupKey && key !== 'ungrouped') {
                groupedObject[noValueGroupKey || 'ungrouped'] = [
                    ...groupedObject[noValueGroupKey || 'ungrouped'] || [],
                    ...groupedObject[key],
                ];
                delete groupedObject[key];
            }
        }
        return groupedObject;
    }
}
