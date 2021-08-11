import * as React from 'react';

import { Column } from '../../models';
import PopupConntentText from '../PopupContentText/PopupContentText';
import '../../style.scss';

export interface PopupContentProps {
    column?: Column;
    data?: any[];
}

const PopupContent: React.FC<PopupContentProps> = (props) => {
    const {
        column,
        data
    } = props;

    return <div className='ka-popup-content'>
        {data?.map((content: any) => (
            <div>
                <PopupConntentText
                    key={content.id}
                    column={column}
                    content={content}
                />
            </div>
        ))}
    </div>
}

export default PopupContent;