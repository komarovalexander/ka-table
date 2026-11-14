import ManyRowsMemoDemo from './ManyRowsMemoDemo';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<ManyRowsMemoDemo />);
});
