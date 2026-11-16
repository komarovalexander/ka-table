import { FunctionComponent, memo } from 'react';

import { IRowProps } from '../../props';
import DataRow from '../DataRow/DataRow';
import DetailsRow from '../DetailsRow/DetailsRow';

const DataAndDetailsRows: FunctionComponent<IRowProps> = (props) => {
    const { isDetailsRowShown } = props;
    return (
        <>
            <DataRow {...props}/>
            {isDetailsRowShown && <DetailsRow {...props}/>}
        </>
    );
};

export const DataAndDetailsRowsMemo = memo(DataAndDetailsRows);

export default DataAndDetailsRows;
