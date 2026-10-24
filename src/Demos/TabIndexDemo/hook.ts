import { Cell } from '../../lib/Models/Cell';
import { useState } from 'react';

const useKaFocusRef = (focusedData: Cell) => {
    const [init, changeInit] = useState<boolean>(false);
    return (data: Cell) => {
        return init ? null : (ref: HTMLElement | null) => {
            if (ref && data.columnKey === focusedData.columnKey && data.rowKeyValue === focusedData.rowKeyValue){
                ref.focus();
                changeInit(true);
            }
        };
    }
};

export default useKaFocusRef;
