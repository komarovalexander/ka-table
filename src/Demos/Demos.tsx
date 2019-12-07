import './Demos.scss';

import React from 'react';
import { HashRouter, NavLink, Route } from 'react-router-dom';

import CommandColumnDemo from './CommandColumnDemo/CommandColumnDemo';
import CustomCellDemo from './CustomCellDemo/CustomCellDemo';
import CustomEditorDemo from './CustomEditorDemo/CustomEditorDemo';
import CustomHeaderCellDemo from './CustomHeaderCellDemo/CustomHeaderCellDemo';
import Demo from './Demo';
import getDemoPage from './DemoPage';
import EditingDemo from './EditingDemo/EditingDemo';
import EventsDemo from './EventsDemo/EventsDemo';
import FilterExtendedDemo from './FilterExtendedDemo/FilterExtendedDemo';
import FilterRowCustomEditorDemo from './FilterRowCustomEditorDemo/FilterRowCustomEditorDemo';
import FilterRowDemo from './FilterRowDemo/FilterRowDemo';
import { initializeGA, trackEvent } from './ga';
import { withTracker } from './GAWrapper';
import GroupingDemo from './GroupingDemo/GroupingDemo';
import ManyRowsDemo from './ManyRowsDemo/ManyRowsDemo';
import ManyRowsGroupingDemo from './ManyRowsGroupingDemo/ManyRowsGroupingDemo';
import SearchDemo from './SearchDemo/SearchDemo';
import SelectionDemo from './SelectionDemo/SelectionDemo';
import SortingDemo from './SortingDemo/SortingDemo';
import ValidationDemo from './ValidationDemo/ValidationDemo';

initializeGA();

const demos: Demo[] = [
  new Demo(CommandColumnDemo, '/command-column', 'Command Column', 'CommandColumnDemo', 'https://stackblitz.com/edit/table-command-column-js', 'https://stackblitz.com/edit/table-command-column-ts'),
  new Demo(CustomCellDemo, '/custom-cell', 'Custom Cell', 'CustomCellDemo'),
  new Demo(CustomEditorDemo, '/custom-editor', 'Custom Editor', 'CustomEditorDemo'),
  new Demo(CustomHeaderCellDemo, '/custom-header-cell', 'Custom Header Cell', 'CustomHeaderCellDemo'),
  new Demo(EditingDemo, '/editing', 'Editing', 'EditingDemo'),
  new Demo(EventsDemo, '/events', 'Events', 'EventsDemo'),
  new Demo(FilterExtendedDemo, '/filter-extended', 'Filter Extended', 'FilterExtendedDemo'),
  new Demo(FilterRowDemo, '/filter-row', 'Filter Row', 'FilterRowDemo'),
  new Demo(FilterRowCustomEditorDemo, '/filter-row-custom-editor', 'Filter Row - Custom Editor', 'FilterRowCustomEditorDemo'),
  new Demo(GroupingDemo, '/grouping', 'Grouping', 'GroupingDemo'),
  new Demo(ManyRowsDemo, '/many-rows', '25000 Rows', 'ManyRowsDemo'),
  new Demo(ManyRowsGroupingDemo, '/many-rows-grouping', '10000 Rows with grouping', 'ManyRowsGroupingDemo'),
  new Demo(SearchDemo, '/search', 'Search', 'SearchDemo'),
  new Demo(SelectionDemo, '/selection', 'Selection', 'SelectionDemo'),
  new Demo(SortingDemo, '/sorting', 'Sorting', 'SortingDemo'),
  new Demo(ValidationDemo, '/validation', 'Validation', 'ValidationDemo'),
];

const cases = demos.map((d: Demo) => {
  return ({
    demoComponent: getDemoPage(d),
    name: d.fileName,
    path: d.path,
    title: d.title,
  });
});

const Demos: React.FC = () => {
  return (
    <HashRouter>
      <div className='demos'>
        <nav>
          <div className='logo-container'>
            <b>react-table-control</b>
            <a href='https://github.com/komarovalexander/react-table-control'
              onClick={() => { trackEvent('click', 'github_logo'); }}>
              <img src='static/icons/github_logo.svg' alt=''/>
            </a>
            <a href='https://www.npmjs.com/package/react-table-component'
              onClick={() => { trackEvent('click', 'npm_logo'); }}>
              <img src='static/icons/npm_logo.svg' alt=''/>
            </a>
          </div>
          <ul className='menu'>
          {
            cases.map((c) => (
              <li key={c.name}>
                  <NavLink to={c.path} activeClassName='active'>
                    <span className='menu-button'>
                      <span className='menu-icon'><img src={`static/icons/${c.name}.svg`} alt=''/></span>
                      <span className='menu-button-inner'>{c.title}</span>
                    </span>
                  </NavLink>
              </li>
            ))
          }
          </ul>
        </nav>
        <main>
          {
            cases.map((c) => (
              <Route key={c.name} path={c.path} component={withTracker(c.demoComponent)} />
            ))
          }
        </main>
      </div>
    </HashRouter>
  );
};

export default Demos;
