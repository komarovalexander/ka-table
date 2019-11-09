import './Demos.scss';

import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import CustomCellDemo from './CustomCellDemo/CustomCellDemo';
import CustomEditorDemo from './CustomEditorDemo/CustomEditorDemo';
import getDemoPage from './DemoPage';
import EditingDemo from './EditingDemo/EditingDemo';
import FilterExtendedDemo from './FilterExtendedDemo/FilterExtendedDemo';
import FilterRowDemo from './FilterRowDemo/FilterRowDemo';
import GroupingDemo from './GroupingDemo/GroupingDemo';
import SearchDemo from './SearchDemo/SearchDemo';
import SortingDemo from './SortingDemo/SortingDemo';
import ValidationDemo from './ValidationDemo/ValidationDemo';

const demos = [
  [CustomCellDemo, 'Custom Cell'],
  [CustomEditorDemo, 'Custom Editor'],
  [EditingDemo, 'Editing'],
  [FilterExtendedDemo, 'Filter Extended'],
  [FilterRowDemo, 'Filter Row'],
  [GroupingDemo, 'Grouping'],
  [SearchDemo, 'Search'],
  [SortingDemo, 'Sorting'],
  [ValidationDemo, 'Validation'],
];

const cases = demos.map((d: any[]) => {
  const demoName = d[0].name.replace('Demo', '');
  const title = d[1];
  return ({ demoComponent: getDemoPage(d[0], title), name: demoName, title, path: `/${demoName}` });
});

const defaultDemo: any[] = demos.find((d) => d[0] === GroupingDemo) || demos[0];

const Demos: React.FC = () => {
  return (
    <Router>
      <div className='demos'>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
          {
            cases.map((c) => (
                <li key={c.name}>
                  <Link to={c.path}>{c.title}</Link>
                </li>
              ),
            )
          }
          </ul>
        </nav>
        <main>
          <Route exact={true} path='/' component={getDemoPage(defaultDemo[0], defaultDemo[1])} />
          {
            cases.map((c) => (
                <Route key={c.name} path={c.path} component={c.demoComponent} />
              ),
            )
          }
        </main>
      </div>
    </Router>
  );
};

export default Demos;
