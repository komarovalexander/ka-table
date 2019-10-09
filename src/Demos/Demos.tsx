import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import CustomEditorDemo from './CustomEditorDemo/CustomEditorDemo';
import getDemoPage from './DemoPage';
import EditingDemo from './EditingDemo/EditingDemo';
import SortingDemo from './SortingDemo/SortingDemo';

const demos = [
  SortingDemo,
  EditingDemo,
  CustomEditorDemo,
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
        <Route exact={true} path='/' component={CustomEditorDemo} />
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
