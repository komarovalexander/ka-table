import './Demos.scss';

import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';

import CommandColumnDemo from './CommandColumnDemo/CommandColumnDemo';
import CustomCellDemo from './CustomCellDemo/CustomCellDemo';
import CustomEditorDemo from './CustomEditorDemo/CustomEditorDemo';
import CustomHeaderCellDemo from './CustomHeaderCellDemo/CustomHeaderCellDemo';
import Demo from './Demo';
import getDemoPage from './DemoPage';
import EditingDemo from './EditingDemo/EditingDemo';
import EventsDemo from './EventsDemo/EventsDemo';
import FilterExtendedDemo from './FilterExtendedDemo/FilterExtendedDemo';
import FilterRowDemo from './FilterRowDemo/FilterRowDemo';
import GroupingDemo from './GroupingDemo/GroupingDemo';
import SearchDemo from './SearchDemo/SearchDemo';
import SortingDemo from './SortingDemo/SortingDemo';
import ValidationDemo from './ValidationDemo/ValidationDemo';

const demos: Demo[] = [
  new Demo(CommandColumnDemo, '/command-column', 'Command Column', 'CommandColumnDemo'),
  new Demo(CustomCellDemo, '/custom-cell', 'Custom Cell', 'CustomCellDemo'),
  new Demo(CustomEditorDemo, '/custom-editor', 'Custom Editor', 'CustomEditorDemo'),
  new Demo(CustomHeaderCellDemo, '/custom-header-cell', 'Custom Header Cell', 'CustomHeaderCellDemo'),
  new Demo(EditingDemo, '/editing', 'Editing', 'EditingDemo'),
  new Demo(EventsDemo, '/events', 'Events', 'EventsDemo'),
  new Demo(FilterExtendedDemo, '/filter-extended', 'Filter Extended', 'FilterExtendedDemo'),
  new Demo(FilterRowDemo, '/filter-row', 'Filter Row', 'FilterRowDemo'),
  new Demo(GroupingDemo, '/grouping', 'Grouping', 'GroupingDemo'),
  new Demo(SearchDemo, '/search', 'Search', 'SearchDemo'),
  new Demo(SortingDemo, '/sorting', 'Sorting', 'SortingDemo'),
  new Demo(ValidationDemo, '/validation', 'Validation', 'ValidationDemo'),
];

const cases = demos.map((d: Demo) => {
  return ({ demoComponent: getDemoPage(d), name: d.fileName, title: d.title, path: d.path });
});

const defaultDemo: Demo = demos.find((d) => d.component === CustomHeaderCellDemo) || demos[0];

const Demos: React.FC = () => {
  return (
    <HashRouter>
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
          <Route exact={true} path='/' component={getDemoPage(defaultDemo)} />
          {
            cases.map((c) => (
                <Route key={c.name} path={c.path} component={c.demoComponent} />
              ),
            )
          }
        </main>
      </div>
    </HashRouter>
  );
};

export default Demos;
