import './Demos.scss';

import React from 'react';
import { HashRouter, NavLink, Route } from 'react-router-dom';

import CommandColumnDemo from './CommandColumnDemo/CommandColumnDemo';
import CustomCellDemo from './CustomCellDemo/CustomCellDemo';
import CustomDataRowDemo from './CustomDataRowDemo/CustomDataRowDemo';
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
import NullableCellDataDemo from './NullableCellDataDemo/NullableCellDataDemo';
import OverviewDemo from './OverviewDemo/OverviewDemo';
import SearchDemo from './SearchDemo/SearchDemo';
import SelectionDemo from './SelectionDemo/SelectionDemo';
import SortingDemo from './SortingDemo/SortingDemo';
import StateStoringDemo from './StateStoringDemo/StateStoringDemo';
import ValidationDemo from './ValidationDemo/ValidationDemo';

initializeGA();

const demos: Demo[] = [
  new Demo(OverviewDemo, '/overview', 'Overview', 'OverviewDemo', 'https://stackblitz.com/edit/table-overview-js?file=Demo.js', 'https://stackblitz.com/edit/table-overview-ts?file=Demo.tsx'),
  new Demo(CommandColumnDemo, '/command-column', 'Command Column', 'CommandColumnDemo', 'https://stackblitz.com/edit/table-command-column-js', 'https://stackblitz.com/edit/table-command-column-ts'),
  new Demo(CustomCellDemo, '/custom-cell', 'Custom Cell', 'CustomCellDemo', 'https://stackblitz.com/edit/table-custom-cell-js', 'https://stackblitz.com/edit/table-custom-cell-ts'),
  new Demo(CustomDataRowDemo, '/custom-data-row', 'Custom Row', 'CustomDataRowDemo', 'https://stackblitz.com/edit/table-custom-data-row-js', 'https://stackblitz.com/edit/table-custom-data-row-ts'),
  new Demo(CustomEditorDemo, '/custom-editor', 'Custom Editor', 'CustomEditorDemo', 'https://stackblitz.com/edit/table-custom-editor-js', 'https://stackblitz.com/edit/table-custom-editor-ts'),
  new Demo(CustomHeaderCellDemo, '/custom-header-cell', 'Custom Header Cell', 'CustomHeaderCellDemo', 'https://stackblitz.com/edit/table-custom-header-cell-js', 'https://stackblitz.com/edit/table-custom-header-cell-ts'),
  new Demo(EditingDemo, '/editing', 'Editing', 'EditingDemo', 'https://stackblitz.com/edit/table-editing-js', 'https://stackblitz.com/edit/table-editing-ts'),
  new Demo(EventsDemo, '/events', 'Events', 'EventsDemo', 'https://stackblitz.com/edit/table-events-js', 'https://stackblitz.com/edit/table-events-ts'),
  new Demo(FilterExtendedDemo, '/filter-extended', 'Filter Extended', 'FilterExtendedDemo', 'https://stackblitz.com/edit/table-filter-extended-js', 'https://stackblitz.com/edit/table-filter-extended-ts'),
  new Demo(FilterRowDemo, '/filter-row', 'Filter Row', 'FilterRowDemo', 'https://stackblitz.com/edit/table-filter-row-js', 'https://stackblitz.com/edit/table-filter-row-ts'),
  new Demo(FilterRowCustomEditorDemo, '/filter-row-custom-editor', 'Filter Row - Custom Editor', 'FilterRowCustomEditorDemo', 'https://stackblitz.com/edit/table-filter-row-custom-editor-js', 'https://stackblitz.com/edit/table-filter-row-custom-editor-ts'),
  new Demo(GroupingDemo, '/grouping', 'Grouping', 'GroupingDemo', 'https://stackblitz.com/edit/table-grouping-js', 'https://stackblitz.com/edit/table-grouping-ts', true),
  new Demo(ManyRowsDemo, '/many-rows', 'Many Rows (25k)', 'ManyRowsDemo', 'https://stackblitz.com/edit/table-many-rows-js', 'https://stackblitz.com/edit/table-many-rows-ts'),
  new Demo(ManyRowsGroupingDemo, '/many-rows-grouping', 'Many Rows (10k Grouped)', 'ManyRowsGroupingDemo', 'https://stackblitz.com/edit/table-many-rows-grouping-js', 'https://stackblitz.com/edit/table-many-rows-grouping-ts', true),
  new Demo(NullableCellDataDemo, '/nullable-cell-data', 'Nullable Cell Data', 'NullableCellDataDemo', '', '', true),
  new Demo(SearchDemo, '/search', 'Search', 'SearchDemo', 'https://stackblitz.com/edit/table-search-js', 'https://stackblitz.com/edit/table-search-ts'),
  new Demo(SelectionDemo, '/selection', 'Selection', 'SelectionDemo', 'https://stackblitz.com/edit/table-selection-js', 'https://stackblitz.com/edit/table-selection-ts'),
  new Demo(SortingDemo, '/sorting', 'Sorting', 'SortingDemo', 'https://stackblitz.com/edit/table-sorting-js', 'https://stackblitz.com/edit/table-sorting-ts'),
  new Demo(StateStoringDemo, '/state-storing', 'State Storing', 'StateStoringDemo', 'https://stackblitz.com/edit/table-state-storing-js', '', true),
  new Demo(ValidationDemo, '/validation', 'Validation', 'ValidationDemo', 'https://stackblitz.com/edit/table-validation-js', 'https://stackblitz.com/edit/table-validation-ts'),
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
          <div className='nav-container'>
            <div className='logo-container'>
              <b>ka-table</b>
              <a href='https://github.com/komarovalexander/ka-table'
                onClick={() => { trackEvent('click', 'github_logo'); }}>
                <img src='static/icons/github_logo.svg' alt=''/>
              </a>
              <a href='https://www.npmjs.com/package/ka-table'
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
          </div>
          <div className='developers-links'>
            <div>
              <a href='https://github.com/komarovalexander'
                rel='noopener noreferrer'
                target='_blank'
                onClick={() => { trackEvent('click', 'developed_by', 'Alex'); }}>
                  <img src='static/icons/link.svg' alt=''/>
                  Developed by Alexander Komarov
              </a>
            </div>
            <div>
              <a href='https://www.behance.net/daryakomarova'
                rel='noopener noreferrer'
                target='_blank'
                onClick={() => { trackEvent('click', 'developed_by', 'Daria'); }}>
                  <img src='static/icons/link.svg' alt=''/>
                  UI Design by Daria Komarova
              </a>
            </div>
          </div>
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
