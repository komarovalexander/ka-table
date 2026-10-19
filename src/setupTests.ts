import { TextDecoder, TextEncoder } from 'util';

import React from 'react';

// react-router v7 uses TextEncoder, which is missing in the jsdom environment of react-scripts
Object.assign(global, { TextDecoder, TextEncoder });

HTMLCanvasElement.prototype.getContext = () => null;
