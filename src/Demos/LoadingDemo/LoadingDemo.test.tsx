import LoadingDemo from './LoadingDemo';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<LoadingDemo />);
});
