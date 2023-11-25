import * as React from 'react';

import { ILoadingProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
    const {
        enabled,
        text,
        childComponents
    } = props;
    if (enabled) {
        const { elementAttributes, content } = getElementCustomization({
            className: 'ka-loading',
        }, props, childComponents?.loading);
        return (
            <div {...elementAttributes}>
                {content || (
                    <>
                        <div className='ka-loading-icon'/>
                        {text && (<div className='ka-loading-text'>{text}</div>)}
                    </>
                )}
            </div>
        );
    }
    return (<></>);
}

export default Loading;
