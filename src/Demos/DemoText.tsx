import './DemoPage.scss';

import React, { useEffect, useState } from 'react';
import Highlight from 'react-highlight';

interface IDemoTextProps {
    demoFileName: string;
}

const DemoText: React.FunctionComponent<IDemoTextProps> = ({ demoFileName }) => {
    const [text, changeText]: [string, any] = useState('');
    useEffect(() => {
        fetch(`demos/${demoFileName}/${demoFileName}.tsx?c=7`)
            .then((res) => res.text())
            .then((fileText) => changeText(fileText));
    }, [demoFileName]);
    return (
        <Highlight className='language-typescript'>
            {text}
        </Highlight>
    );
};

export default DemoText;
