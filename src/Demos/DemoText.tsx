import './DemoPage.css';

import React, { useEffect, useState } from 'react';
import Highlight from 'react-highlight';

interface IDemoTextProps {
    demoFileName: string;
}

// the source code of the demos, each one is loaded when its demo is opened
const demoSources = import.meta.glob<string>('./*/*Demo.tsx', { query: '?raw', import: 'default' });

const DemoText: React.FunctionComponent<IDemoTextProps> = ({ demoFileName }) => {
    const [text, changeText] = useState('');
    useEffect(() => {
        demoSources[`./${demoFileName}/${demoFileName}.tsx`]?.()
            .then((source) => changeText(source.replace(/\.\.\/\.\.\/lib/g, 'ka-table')));
    }, [demoFileName]);
    return (
        <Highlight className='language-typescript'>
            {text}
        </Highlight>
    );
};

export default DemoText;
