import React from 'react';
export const ExpandedIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg style={{transform: 'rotate(180deg)'}} {...props} xmlns='http://www.w3.org/2000/svg' version='1.1' id='Capa_1' x='0px' y='0px'  viewBox='0 -150 1024 1024'  width='10' height='10'>
            <g>
                <path d='M461.824 81.664l-440.32 440.32c-28.672 27.648-28.672 72.704 0 101.376 27.648 27.648 72.704 27.648 101.376 0l389.12-390.144 390.144 390.144c27.648 27.648 72.704 27.648 101.376 0 27.648-28.672 27.648-73.728 0-101.376l-440.32-440.32c-14.336-14.336-32.768-21.504-51.2-21.504s-36.864 7.168-50.176 21.504z'/>
            </g>
        </svg>
    );
}
