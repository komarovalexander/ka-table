
import React from 'react';

const Notify: React.FC = () => {
    const isShown = localStorage.getItem('notify') !== '1';
    const [shown, changeShown] = React.useState(isShown);
    if (!shown) return <></>;
    return (
        <div style={{
            padding: '23px 40px',
            height: '22px',
            borderBottom: '1px solid #CBDCE4',
            backgroundColor: '#fff3cd'
        }}>
      These demos are for <b>new version 4.0</b>;
      For 3.* see <a href='https://github.com/komarovalexander/ka-table/tree/7b616f37808212c8bbcfac52d0624aa8240a775a/src/Demos'  rel='noopener noreferrer' target='_blank'>link</a>.
      How to update from 3.* to 4.*: <a href='https://github.com/komarovalexander/ka-table/releases/tag/4.0.1'  rel='noopener noreferrer' target='_blank'>link</a>
            <img style={{
                position: 'absolute',
                right: 30,
                cursor: 'pointer'
            }}
            onClick={() => {
                localStorage.setItem('notify', '1');
                changeShown(false)
            }}
            src='static/icons/close.svg' className='notify-close' alt='Close' title='Close'/>
        </div>
    );
};

export default Notify;
