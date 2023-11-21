import { useState } from 'react';

const useKaFocusRef = (focusedData: any) => {
    const [init, changeInit] = useState<boolean>(false);
    return (data: any) => {
        return init ? null : (ref: any) => {
            if (ref && data.columnKey === focusedData.columnKey && data.rowKeyValue === focusedData.rowKeyValue){
                ref.focus();
                changeInit(true);
            }
        };
    }
};

export default useKaFocusRef;
