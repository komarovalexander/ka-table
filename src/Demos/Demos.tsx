import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import CustomCellDemo from './CustomCellDemo/CustomCellDemo';
import CustomEditorDemo from './CustomEditorDemo/CustomEditorDemo';
import getDemoPage from './DemoPage';
import EditingDemo from './EditingDemo/EditingDemo';
import FilterExtendedDemo from './FilterExtendedDemo/FilterExtendedDemo';
import FilterRowDemo from './FilterRowDemo/FilterRowDemo';
import SearchDemo from './SearchDemo/SearchDemo';
import SortingDemo from './SortingDemo/SortingDemo';

const demos = [
  CustomCellDemo,
  CustomEditorDemo,
  EditingDemo,
  FilterExtendedDemo,
  FilterRowDemo,
  SearchDemo,
  SortingDemo,
];

const cases = demos.map((d: React.FC) => {
  const demoName = d.name.replace('Demo', '');
  return ({ demoComponent: getDemoPage(d), name: demoName, path: `/${demoName}` });
});

const Demos: React.FC = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
        {
          cases.map((c) => (
              <li key={c.name}>
                <Link to={c.path}>{c.name}</Link>
              </li>
            ),
          )
        }
        </ul>
        <hr />
        <Route exact={true} path='/' component={FilterExtendedDemo} />
        {
          cases.map((c) => (
              <Route key={c.name} path={c.path} component={c.demoComponent} />
            ),
          )
        }
      </div>
    </Router>
  );
};

export default Demos;
