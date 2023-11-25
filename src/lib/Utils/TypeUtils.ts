import { DataType } from '../enums';
import { Column } from '../Models/Column';
import { getValueByColumn, replaceValue } from './DataUtils';

export const convertToColumnTypes = (data: any[], columns: Column[]) => {
    const columnsToReplace = [...columns];
    const dataCopy = [...data];
    columnsToReplace.forEach((c) => {
        if (c.dataType && c.dataType !== DataType.Object){
            for (let i = 0; i < dataCopy.length; i++){
                const value = getValueByColumn(dataCopy[i], c);
                if (value != null) {
                    switch (c.dataType) {
                    case DataType.String:
                        if (value.constructor !== String) {
                            dataCopy[i] = replaceValue(dataCopy[i], c, value.toString());
                            continue;
                        }
                        break;
                    case DataType.Number:
                        if (value.constructor !== Number) {
                            dataCopy[i] = replaceValue(dataCopy[i], c, Number(value));
                            continue;
                        }
                        break;
                    case DataType.Date:
                        if (value.constructor !== Date) {
                            dataCopy[i] = replaceValue(dataCopy[i], c, new Date(value));
                            continue;
                        }
                        break;
                    case DataType.Boolean:
                        if (value.constructor !== Boolean) {
                            dataCopy[i] = replaceValue(dataCopy[i], c, toBoolean(value));
                            continue;
                        }
                        break;
                    }
                    break;
                }
            }
        }
    });
    return dataCopy;
};

export const toBoolean = (value: any) => {
    if (typeof value === 'string') {
        switch (value.toLowerCase().trim()) {
        case 'true': case 'yes': case '1': return true;
        case 'false': case 'no': case '0': case null: return false;
        }
    }
    return Boolean(value);
};
