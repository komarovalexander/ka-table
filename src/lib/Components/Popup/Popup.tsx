import * as React from 'react';

// import { Column } from '../../Models/Column';

// interface PopupProps {
//     column: Column
// }

const Popup: React.FC = (props) => {
    const { children } = props;
    return (
        <div style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: 6,
            boxSizing: 'border-box',
            boxShadow: '0 6px 12px rgb(0 0 0 / 18%)',
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            padding: '3em',
            position: 'absolute',
            textAlign: 'center',
            width: 245,
            height: 325,
            zIndex: 10
        }}>
            {children}
        </div>
    )
}

export default Popup;