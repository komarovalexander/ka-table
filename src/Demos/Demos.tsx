import './Demos.scss';

import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import AddRowDemo from './AddRowDemo/AddRowDemo';
import AlertCellDemo from './AlertCellDemo/AlertCellDemo';
import BootstrapDemo from './BootstrapDemo/BootstrapDemo';
import ClassComponentDemo from './ClassComponentDemo/ClassComponentDemo';
import ColumnReorderingDemo from './ColumnReorderingDemo/ColumnReorderingDemo';
import ColumnResizingDemo from './ColumnResizingDemo/ColumnResizingDemo';
import CustomAttributesDemo from './CustomAttributesDemo/CustomAttributesDemo';
import CustomCellDemo from './CustomCellDemo/CustomCellDemo';
import CustomDataRowDemo from './CustomDataRowDemo/CustomDataRowDemo';
import CustomEditorDemo from './CustomEditorDemo/CustomEditorDemo';
import CustomHeaderCellDemo from './CustomHeaderCellDemo/CustomHeaderCellDemo';
import DeleteRowDemo from './DeleteRowDemo/DeleteRowDemo';
import Demo from './Demo';
import { DemoCase } from './DemoCase';
import getDemoPage from './DemoPage';
import DemosMenu from './DemosMenu';
import DetailsRowDemo from './DetailsRowDemo/DetailsRowDemo';
import EditingDemo from './EditingDemo/EditingDemo';
import EditingRowDemo from './EditingRowDemo/EditingRowDemo';
import EventsDemo from './EventsDemo/EventsDemo';
import ExportDemo from './ExportDemo/ExportDemo';
import FilterExtendedDemo from './FilterExtendedDemo/FilterExtendedDemo';
import FilterRowCustomEditorDemo from './FilterRowCustomEditorDemo/FilterRowCustomEditorDemo';
import FilterRowDemo from './FilterRowDemo/FilterRowDemo';
import FixedColumnDemo from './FixedColumnDemo/FixedColumnDemo';
import { initializeGA, trackEvent } from './ga';
import { withTracker } from './GAWrapper';
import GetDataByPropsDemo from './GetDataByPropsDemo/GetDataByPropsDemo';
import GroupingCustomCellDemo from './GroupingCustomCellDemo/GroupingCustomCellDemo';
import GroupingCustomRowDemo from './GroupingCustomRowDemo/GroupingCustomRowDemo';
import GroupingDemo from './GroupingDemo/GroupingDemo';
import HoverRowDemo from './HoverRowDemo/HoverRowDemo';
import LoadingDemo from './LoadingDemo/LoadingDemo';
import ManyColumnsDemo from './ManyColumnsDemo/ManyColumnsDemo';
import ManyRowsDemo from './ManyRowsDemo/ManyRowsDemo';
import ManyRowsGroupingDemo from './ManyRowsGroupingDemo/ManyRowsGroupingDemo';
import MaterialDemo from './MaterialDemo/MaterialDemo';
import NullableCellDataDemo from './NullableCellDataDemo/NullableCellDataDemo';
import OverviewDemo from './OverviewDemo/OverviewDemo';
import PagingDemo from './PagingDemo/PagingDemo';
import ReduxDemo from './ReduxDemo/ReduxDemo';
import RemoteDataDemo from './RemoteDataDemo/RemoteDataDemo';
import RowReorderingDemo from './RowReorderingDemo/RowReorderingDemo';
import SearchDemo from './SearchDemo/SearchDemo';
import SelectionDemo from './SelectionDemo/SelectionDemo';
import SelectionSingleDemo from './SelectionSingleDemo/SelectionSingleDemo';
import SortingDemo from './SortingDemo/SortingDemo';
import StateStoringDemo from './StateStoringDemo/StateStoringDemo';
import ValidationDemo from './ValidationDemo/ValidationDemo';

initializeGA();

const demos: Demo[] = [
  new Demo(OverviewDemo, '/overview', 'Basics', 'OverviewDemo', 'https://stackblitz.com/edit/table-overview-js', 'https://stackblitz.com/edit/table-overview-ts', ''),
  new Demo(AddRowDemo, '/add-row', 'Add New Row', 'AddRowDemo', 'https://stackblitz.com/edit/table-add-row-js', 'https://stackblitz.com/edit/table-add-row-ts', 'Data Editing'),
  new Demo(AlertCellDemo, '/alert-cell', 'Alert Cell', 'AlertCellDemo', 'https://stackblitz.com/edit/table-alert-cell-js', 'https://stackblitz.com/edit/table-alert-cell-ts', 'Customization'),
  new Demo(BootstrapDemo, '/bootstrap', 'Bootstrap', 'BootstrapDemo', 'https://stackblitz.com/edit/table-bootstrap-js', 'https://stackblitz.com/edit/table-bootstrap-ts', ''),
  new Demo(MaterialDemo, '/material', 'Material', 'MaterialDemo', 'https://stackblitz.com/edit/table-material-js', 'https://stackblitz.com/edit/table-material-ts', ''),
  new Demo(CustomAttributesDemo, '/custom-attributes', 'Custom Attributes', 'CustomAttributesDemo', 'https://stackblitz.com/edit/table-custom-attributes-js', 'https://stackblitz.com/edit/table-custom-attributes-ts', 'Customization'),
  new Demo(ColumnReorderingDemo, '/column-reordering', 'Column Reordering', 'ColumnReorderingDemo', 'https://stackblitz.com/edit/table-column-reordering-js', 'https://stackblitz.com/edit/table-column-reordering-ts', 'Columns'),
  new Demo(ColumnResizingDemo, '/column-resizing', 'Column Resizing', 'ColumnResizingDemo', 'https://stackblitz.com/edit/table-column-resizing-js', 'https://stackblitz.com/edit/table-column-resizing-ts', 'Columns'),
  new Demo(ClassComponentDemo, '/class-component', 'Class Component', 'ClassComponentDemo', 'https://stackblitz.com/edit/table-class-component-js', 'https://stackblitz.com/edit/table-class-component-ts', ''),
  new Demo(CustomCellDemo, '/custom-cell', 'Custom Cell', 'CustomCellDemo', 'https://stackblitz.com/edit/table-custom-cell-js', 'https://stackblitz.com/edit/table-custom-cell-ts', 'Customization'),
  new Demo(CustomDataRowDemo, '/custom-data-row', 'Custom Row', 'CustomDataRowDemo', 'https://stackblitz.com/edit/table-custom-data-row-js', 'https://stackblitz.com/edit/table-custom-data-row-ts', 'Customization'),
  new Demo(CustomEditorDemo, '/custom-editor', 'Custom Editor', 'CustomEditorDemo', 'https://stackblitz.com/edit/table-custom-editor-js', 'https://stackblitz.com/edit/table-custom-editor-ts', 'Data Editing'),
  new Demo(CustomHeaderCellDemo, '/custom-header-cell', 'Custom Header Cell', 'CustomHeaderCellDemo', 'https://stackblitz.com/edit/table-custom-header-cell-js', 'https://stackblitz.com/edit/table-custom-header-cell-ts', 'Customization'),
  new Demo(DeleteRowDemo, '/delete-row', 'Delete Row', 'DeleteRowDemo', 'https://stackblitz.com/edit/table-delete-row-js', 'https://stackblitz.com/edit/table-delete-row-ts', 'Data Editing'),
  new Demo(DetailsRowDemo, '/details-row', 'Details Row', 'DetailsRowDemo', 'https://stackblitz.com/edit/table-details-row-js', 'https://stackblitz.com/edit/table-details-row-ts', 'Rows'),
  new Demo(EditingDemo, '/editing', 'Editing', 'EditingDemo', 'https://stackblitz.com/edit/table-editing-js', 'https://stackblitz.com/edit/table-editing-ts', 'Data Editing'),
  new Demo(EditingRowDemo, '/editing-row', 'Editing - Row', 'EditingRowDemo', 'https://stackblitz.com/edit/table-editing-row-js', 'https://stackblitz.com/edit/table-editing-row-ts', 'Data Editing'),
  new Demo(EventsDemo, '/events', 'Events', 'EventsDemo', 'https://stackblitz.com/edit/table-events-js', 'https://stackblitz.com/edit/table-events-ts', 'Miscellaneous'),
  new Demo(ExportDemo, '/export', 'Export', 'ExportDemo', 'https://stackblitz.com/edit/table-export-js', 'https://stackblitz.com/edit/table-export-ts', 'Miscellaneous'),
  new Demo(FilterExtendedDemo, '/filter-extended', 'Filter Extended', 'FilterExtendedDemo', 'https://stackblitz.com/edit/table-filter-extended-js', 'https://stackblitz.com/edit/table-filter-extended-ts', 'Filtering'),
  new Demo(FilterRowDemo, '/filter-row', 'Filter Row', 'FilterRowDemo', 'https://stackblitz.com/edit/table-filter-row-js', 'https://stackblitz.com/edit/table-filter-row-ts', 'Filtering'),
  new Demo(FilterRowCustomEditorDemo, '/filter-row-custom-editor', 'Filter Row - Custom Editor', 'FilterRowCustomEditorDemo', 'https://stackblitz.com/edit/table-filter-row-custom-editor-js', 'https://stackblitz.com/edit/table-filter-row-custom-editor-ts', 'Filtering'),
  new Demo(FixedColumnDemo, '/fixed-column', 'Fixed Colum', 'FixedColumnDemo', 'https://stackblitz.com/edit/table-fixed-column-js', 'https://stackblitz.com/edit/table-fixed-column-ts', 'Columns'),
  new Demo(GetDataByPropsDemo, '/get-data-by-props', 'Get Data By Props', 'GetDataByPropsDemo', 'https://stackblitz.com/edit/table-get-data-by-props-js', 'https://stackblitz.com/edit/table-get-data-by-props-ts', 'Miscellaneous'),
  new Demo(GroupingDemo, '/grouping', 'Grouping', 'GroupingDemo', 'https://stackblitz.com/edit/table-grouping-js', 'https://stackblitz.com/edit/table-grouping-ts', 'Grouping', true),
  new Demo(GroupingCustomCellDemo, '/grouping-custom-cell', 'Grouping Custom Cell', 'GroupingCustomCellDemo', 'https://stackblitz.com/edit/table-grouping-custom-cell-js', 'https://stackblitz.com/edit/table-grouping-custom-cell-ts', 'Grouping', true),
  new Demo(GroupingCustomRowDemo, '/grouping-custom-row', 'Grouping Custom Row', 'GroupingCustomRowDemo', 'https://stackblitz.com/edit/table-grouping-custom-row-js', 'https://stackblitz.com/edit/table-grouping-custom-row-ts', 'Grouping', true),
  new Demo(HoverRowDemo, '/hover-row', 'Hover Row', 'HoverRowDemo', 'https://stackblitz.com/edit/table-hover-row-js', 'https://stackblitz.com/edit/table-hover-row-ts', 'Rows'),
  new Demo(LoadingDemo, '/loading', 'Loading', 'LoadingDemo', 'https://stackblitz.com/edit/table-loading-js', 'https://stackblitz.com/edit/table-loading-ts', 'Miscellaneous'),
  new Demo(ManyColumnsDemo, '/many-columns', 'Many Columns', 'ManyColumnsDemo', 'https://stackblitz.com/edit/table-many-columns-js', 'https://stackblitz.com/edit/table-many-columns-ts', 'Columns'),
  new Demo(ManyRowsDemo, '/many-rows', 'Many Rows (25k)', 'ManyRowsDemo', 'https://stackblitz.com/edit/table-many-rows-js', 'https://stackblitz.com/edit/table-many-rows-ts', 'Virtual Scrolling'),
  new Demo(ManyRowsGroupingDemo, '/many-rows-grouping', 'Many Rows (10k Grouped)', 'ManyRowsGroupingDemo', 'https://stackblitz.com/edit/table-many-rows-grouping-js', 'https://stackblitz.com/edit/table-many-rows-grouping-ts', 'Virtual Scrolling', true),
  new Demo(NullableCellDataDemo, '/nullable-cell-data', 'Nullable Cell Data', 'NullableCellDataDemo', 'https://stackblitz.com/edit/table-nullable-cell-data-js', 'https://stackblitz.com/edit/table-nullable-cell-data-ts', 'Miscellaneous', true),
  new Demo(PagingDemo, '/paging', 'Paging', 'PagingDemo', 'https://stackblitz.com/edit/table-paging-js', 'https://stackblitz.com/edit/table-paging-ts', 'Miscellaneous'),
  new Demo(ReduxDemo, '/redux', 'Redux', 'ReduxDemo', 'https://stackblitz.com/edit/table-redux-js', 'https://stackblitz.com/edit/table-redux-ts', ''),
  new Demo(RemoteDataDemo, '/remote-data', 'Remote Data', 'RemoteDataDemo', 'https://stackblitz.com/edit/table-remote-data-js', 'https://stackblitz.com/edit/table-remote-data-ts', ''),
  new Demo(RowReorderingDemo, '/row-reordering', 'Row Reordering', 'RowReorderingDemo', 'https://stackblitz.com/edit/table-row-reordering-js', 'https://stackblitz.com/edit/table-row-reordering-ts', 'Rows'),
  new Demo(SearchDemo, '/search', 'Search', 'SearchDemo', 'https://stackblitz.com/edit/table-search-js', 'https://stackblitz.com/edit/table-search-ts', 'Filtering'),
  new Demo(SelectionDemo, '/selection', 'Selection - Multiple', 'SelectionDemo', 'https://stackblitz.com/edit/table-selection-js', 'https://stackblitz.com/edit/table-selection-ts', 'Selection'),
  new Demo(SelectionSingleDemo, '/selection-single', 'Selection - Single', 'SelectionSingleDemo', 'https://stackblitz.com/edit/table-selection-single-js', 'https://stackblitz.com/edit/table-selection-single-ts', 'Selection'),
  new Demo(SortingDemo, '/sorting', 'Sorting', 'SortingDemo', 'https://stackblitz.com/edit/table-sorting-js', 'https://stackblitz.com/edit/table-sorting-ts', 'Rows'),
  new Demo(StateStoringDemo, '/state-storing', 'State Storing', 'StateStoringDemo', 'https://stackblitz.com/edit/table-state-storing-js', '', 'Miscellaneous', true),
  new Demo(ValidationDemo, '/validation', 'Validation', 'ValidationDemo', 'https://stackblitz.com/edit/table-validation-js', 'https://stackblitz.com/edit/table-validation-ts', 'Data Editing'),
];

const cases: DemoCase[] = demos.map((d: Demo) => {
  return ({
    demoComponent: getDemoPage(d),
    name: d.fileName,
    path: d.path,
    title: d.title,
    group: d.group
  });
});

const Demos: React.FC = () => {
  return (
    <HashRouter>
      <div className='demos'>
        <nav>
          <div className='nav-container'>
            <div className='logo-container'>
              <a href='/ka-table/#/overview' className='logo'><img src='static/logo.svg' alt='ka-table'/></a>
              <a href='http://ka-table.com/docs_props.html' className='docs-link'>Docs</a>
            </div>
            <DemosMenu cases={cases} />
          </div>
          <div className='resources-icons'>
            <a href='https://github.com/komarovalexander/ka-table'
              onMouseDown={() => { trackEvent('click', 'github_logo'); }}>
              <img src='static/icons/github_logo.svg' alt=''/>
            </a>
            <a href='https://www.npmjs.com/package/ka-table'
              onMouseDown={() => { trackEvent('click', 'npm_logo'); }}>
              <img src='static/icons/npm_logo.svg' alt=''/>
            </a>
          </div>
          <div className='developers-links'>
            <div>
              <a href='https://github.com/komarovalexander'
                rel='noopener noreferrer'
                target='_blank'
                onMouseDown={() => { trackEvent('click', 'developed_by', 'Alex'); }}>
                  <img src='static/icons/link.svg' alt=''/>
                  Developed by Alexander Komarov
              </a>
            </div>
            <div>
              <a href='https://www.behance.net/daryakomarova'
                rel='noopener noreferrer'
                target='_blank'
                onMouseDown={() => { trackEvent('click', 'developed_by', 'Daria'); }}>
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
