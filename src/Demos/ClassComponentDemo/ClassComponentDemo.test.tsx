import OverviewDemo from './ClassComponentDemo';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<OverviewDemo />);
});
