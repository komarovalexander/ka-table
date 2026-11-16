import { createContext } from 'react';

// current is true while a column of the table is resized by the mouse: the rows are rendered with the new widths when the resize ends
export const ColumnResizeContext = createContext<{ current: boolean } | undefined>(undefined);
