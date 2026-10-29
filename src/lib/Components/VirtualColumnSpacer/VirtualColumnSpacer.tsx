import * as React from 'react';

import defaultOptions from '../../defaultOptions';

/**
 * The cell in place of the columns which the virtual scrolling of the columns doesn't render: its column in colgroup has their width.
 * In the header it has the background of the header and stays with it
 */
const VirtualColumnSpacer: React.FunctionComponent<{ isHead?: boolean }> = ({ isHead }) => (
    <td
        aria-hidden='true'
        className={`${defaultOptions.css.virtualColumnSpacer}${isHead ? ` ${defaultOptions.css.theadBackground} ${defaultOptions.css.theadFixed}` : ''}`}
    />
);

export default VirtualColumnSpacer;
