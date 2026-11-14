import { createContext, useContext } from 'react';

// the indexes of the columns from 1 (aria-colindex) when the virtual scrolling of the columns doesn't render all of them
export const ColumnIndexesContext = createContext<Map<string, number> | undefined>(undefined);

export const useAriaColIndex = (columnKey: string) => useContext(ColumnIndexesContext)?.get(columnKey);
