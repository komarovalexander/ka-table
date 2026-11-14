import { createContext } from 'react';

// true if the rows and their cells are re-rendered only when their props change (the memoizedRows option)
export const MemoizedRowsContext = createContext(false);
