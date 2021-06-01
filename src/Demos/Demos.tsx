/* eslint-disable jsx-a11y/anchor-is-valid */
import './Demos.scss';

import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import AddRowDemo from './AddRowDemo/AddRowDemo';
import AlertCellDemo from './AlertCellDemo/AlertCellDemo';
import BootstrapDemo from './BootstrapDemo/BootstrapDemo';
import ClassComponentDemo from './ClassComponentDemo/ClassComponentDemo';
import ColumnReorderingDemo from './ColumnReorderingDemo/ColumnReorderingDemo';
import ColumnResizingDemo from './ColumnResizingDemo/ColumnResizingDemo';
import ColumnSettingsDemo from './ColumnSettingsDemo/ColumnSettingsDemo';
import CustomAttributesDemo from './CustomAttributesDemo/CustomAttributesDemo';
import CustomCellDemo from './CustomCellDemo/CustomCellDemo';
import CustomDataRowDemo from './CustomDataRowDemo/CustomDataRowDemo';
import CustomEditorDemo from './CustomEditorDemo/CustomEditorDemo';
import CustomHeaderCellDemo from './CustomHeaderCellDemo/CustomHeaderCellDemo';
import CustomPagingDemo from './CustomPagingDemo/CustomPagingDemo';
import CustomThemeDemo from './CustomThemeDemo/CustomThemeDemo';
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
import ExportToPdfDemo from './ExportToPdfDemo/ExportToPdfDemo';
import FilterExtendedDemo from './FilterExtendedDemo/FilterExtendedDemo';
import FilterRowCustomEditorDemo from './FilterRowCustomEditorDemo/FilterRowCustomEditorDemo';
import FilterRowCustomLogicDemo from './FilterRowCustomLogicDemo/FilterRowCustomLogicDemo';
import FilterRowDemo from './FilterRowDemo/FilterRowDemo';
import FixedColumnDemo from './FixedColumnDemo/FixedColumnDemo';
import { initializeGA, trackEvent } from './ga';
import { withTracker } from './GAWrapper';
import GetDataByPropsDemo from './GetDataByPropsDemo/GetDataByPropsDemo';
import GroupingCustomCellDemo from './GroupingCustomCellDemo/GroupingCustomCellDemo';
import GroupingCustomRowDemo from './GroupingCustomRowDemo/GroupingCustomRowDemo';
import GroupingDemo from './GroupingDemo/GroupingDemo';
import HoverRowDemo from './HoverRowDemo/HoverRowDemo';
import InfiniteScrollingDemo from './InfiniteScrollingDemo/InfiniteScrollingDemo';
import JsonDemo from './JsonDemo/JsonDemo';
import KeyboardNavigationDemo from './KeyboardNavigationDemo/KeyboardNavigationDemo';
import LoadingDemo from './LoadingDemo/LoadingDemo';
import ManyColumnsDemo from './ManyColumnsDemo/ManyColumnsDemo';
import ManyRowsDemo from './ManyRowsDemo/ManyRowsDemo';
import ManyRowsDynamicDemo from './ManyRowsDynamicDemo/ManyRowsDynamicDemo';
import ManyRowsGroupingDemo from './ManyRowsGroupingDemo/ManyRowsGroupingDemo';
import ManyRowsMemoDemo from './ManyRowsMemoDemo/ManyRowsMemoDemo';
import MaterialDemo from './MaterialDemo/MaterialDemo';
import NullableCellDataDemo from './NullableCellDataDemo/NullableCellDataDemo';
import OverviewDemo from './OverviewDemo/OverviewDemo';
import PagingDemo from './PagingDemo/PagingDemo';
import PrintDemo from './PrintDemo/PrintDemo';
import ReduxDemo from './ReduxDemo/ReduxDemo';
import RemoteDataDemo from './RemoteDataDemo/RemoteDataDemo';
import RemoteDataEditingDemo from './RemoteDataEditingDemo/RemoteDataEditingDemo';
import ResponsiveDemo from './ResponsiveDemo/ResponsiveDemo';
import RowReorderingDemo from './RowReorderingDemo/RowReorderingDemo';
import SearchDemo from './SearchDemo/SearchDemo';
import SelectionDemo from './SelectionDemo/SelectionDemo';
import SelectionSingleDemo from './SelectionSingleDemo/SelectionSingleDemo';
import SortingCustomLogicDemo from './SortingCustomLogicDemo/SortingCustomLogicDemo';
import SortingDemo from './SortingDemo/SortingDemo';
import SortingModesDemo from './SortingModesDemo/SortingModesDemo';
import StateStoringDemo from './StateStoringDemo/StateStoringDemo';
import SummaryDemo from './SummaryDemo/SummaryDemo';
import TabIndexDemo from './TabIndexDemo/TabIndexDemo';
import ValidationDemo from './ValidationDemo/ValidationDemo';

initializeGA();

const demos: Demo[] = [
  new Demo(OverviewDemo, '/overview', 'Basics', 'OverviewDemo', 'https://stackblitz.com/edit/table-overview-js', 'https://stackblitz.com/edit/table-overview-ts', ''),
  new Demo(AddRowDemo, '/add-row', 'Add New Row', 'AddRowDemo', 'https://stackblitz.com/edit/table-add-row-js', 'https://stackblitz.com/edit/table-add-row-ts', 'Editing'),
  new Demo(AlertCellDemo, '/alert-cell', 'Alert Cell', 'AlertCellDemo', 'https://stackblitz.com/edit/table-alert-cell-js', 'https://stackblitz.com/edit/table-alert-cell-ts', 'Customization'),
  new Demo(BootstrapDemo, '/bootstrap', 'Bootstrap', 'BootstrapDemo', 'https://stackblitz.com/edit/table-bootstrap-js', 'https://stackblitz.com/edit/table-bootstrap-ts', 'Themes'),
  new Demo(ClassComponentDemo, '/class-component', 'Class Component', 'ClassComponentDemo', 'https://stackblitz.com/edit/table-class-component-js', 'https://stackblitz.com/edit/table-class-component-ts', ''),
  new Demo(ColumnReorderingDemo, '/column-reordering', 'Column Reordering', 'ColumnReorderingDemo', 'https://stackblitz.com/edit/table-column-reordering-js', 'https://stackblitz.com/edit/table-column-reordering-ts', 'Columns'),
  new Demo(ColumnResizingDemo, '/column-resizing', 'Column Resizing', 'ColumnResizingDemo', 'https://stackblitz.com/edit/table-column-resizing-js', 'https://stackblitz.com/edit/table-column-resizing-ts', 'Columns'),
  new Demo(ColumnSettingsDemo, '/column-settings', 'Column Settings', 'ColumnSettingsDemo', 'https://stackblitz.com/edit/table-column-settings-js', 'https://stackblitz.com/edit/table-column-settings-ts', 'Columns'),
  new Demo(CustomAttributesDemo, '/custom-attributes', 'Custom Attributes', 'CustomAttributesDemo', 'https://stackblitz.com/edit/table-custom-attributes-js', 'https://stackblitz.com/edit/table-custom-attributes-ts', 'Customization'),
  new Demo(CustomCellDemo, '/custom-cell', 'Custom Cell', 'CustomCellDemo', 'https://stackblitz.com/edit/table-custom-cell-js', 'https://stackblitz.com/edit/table-custom-cell-ts', 'Customization'),
  new Demo(CustomDataRowDemo, '/custom-data-row', 'Custom Row', 'CustomDataRowDemo', 'https://stackblitz.com/edit/table-custom-data-row-js', 'https://stackblitz.com/edit/table-custom-data-row-ts', 'Customization'),
  new Demo(CustomEditorDemo, '/custom-editor', 'Custom Editor', 'CustomEditorDemo', 'https://stackblitz.com/edit/table-custom-editor-js', 'https://stackblitz.com/edit/table-custom-editor-ts', 'Editing'),
  new Demo(CustomHeaderCellDemo, '/custom-header-cell', 'Custom Header Cell', 'CustomHeaderCellDemo', 'https://stackblitz.com/edit/table-custom-header-cell-js', 'https://stackblitz.com/edit/table-custom-header-cell-ts', 'Customization'),
  new Demo(CustomPagingDemo, '/custom-paging', 'Custom Paging', 'CustomPagingDemo', 'https://stackblitz.com/edit/table-custom-paging-js', 'https://stackblitz.com/edit/table-custom-paging-ts', 'Customization'),
  new Demo(CustomThemeDemo, '/custom-theme', 'Custom Theme', 'CustomThemeDemo', 'https://stackblitz.com/edit/table-custom-theme-js', 'https://stackblitz.com/edit/table-custom-theme-ts', 'Themes', 'dark.scss'),
  new Demo(DeleteRowDemo, '/delete-row', 'Delete Row', 'DeleteRowDemo', 'https://stackblitz.com/edit/table-delete-row-js', 'https://stackblitz.com/edit/table-delete-row-ts', 'Editing'),
  new Demo(DetailsRowDemo, '/details-row', 'Details Row', 'DetailsRowDemo', 'https://stackblitz.com/edit/table-details-row-js', 'https://stackblitz.com/edit/table-details-row-ts', 'Rows'),
  new Demo(EditingDemo, '/editing', 'Editing - Cell', 'EditingDemo', 'https://stackblitz.com/edit/table-editing-js', 'https://stackblitz.com/edit/table-editing-ts', 'Editing'),
  new Demo(EditingRowDemo, '/editing-row', 'Editing - Row', 'EditingRowDemo', 'https://stackblitz.com/edit/table-editing-row-js', 'https://stackblitz.com/edit/table-editing-row-ts', 'Editing'),
  new Demo(EventsDemo, '/events', 'Events', 'EventsDemo', 'https://stackblitz.com/edit/table-events-js', 'https://stackblitz.com/edit/table-events-ts', 'Miscellaneous'),
  new Demo(ExportDemo, '/export', 'Export to CSV', 'ExportDemo', 'https://stackblitz.com/edit/table-export-js', 'https://stackblitz.com/edit/table-export-ts', 'Export / Print'),
  new Demo(ExportToPdfDemo, '/export-pdf', 'Export to PDF', 'ExportToPdfDemo', 'https://stackblitz.com/edit/table-export-pdf-js', 'https://stackblitz.com/edit/table-export-pdf-ts', 'Export / Print'),
  new Demo(FilterExtendedDemo, '/filter-extended', 'Filter Extended', 'FilterExtendedDemo', 'https://stackblitz.com/edit/table-filter-extended-js', 'https://stackblitz.com/edit/table-filter-extended-ts', 'Filtering'),
  new Demo(FilterRowCustomEditorDemo, '/filter-row-custom-editor', 'Filter Row - Custom Editor', 'FilterRowCustomEditorDemo', 'https://stackblitz.com/edit/table-filter-row-custom-editor-js', 'https://stackblitz.com/edit/table-filter-row-custom-editor-ts', 'Filtering'),
  new Demo(FilterRowCustomLogicDemo, '/filter-row-custom-logic', 'Filter Row - Logic', 'FilterRowCustomLogicDemo', 'https://stackblitz.com/edit/table-filter-row-custom-logic-js', 'https://stackblitz.com/edit/table-filter-row-custom-logic-ts', 'Filtering'),
  new Demo(FilterRowDemo, '/filter-row', 'Filter Row', 'FilterRowDemo', 'https://stackblitz.com/edit/table-filter-row-js', 'https://stackblitz.com/edit/table-filter-row-ts', 'Filtering'),
  new Demo(FixedColumnDemo, '/fixed-column', 'Fixed Colum', 'FixedColumnDemo', 'https://stackblitz.com/edit/table-fixed-column-js', 'https://stackblitz.com/edit/table-fixed-column-ts', 'Columns'),
  new Demo(GetDataByPropsDemo, '/get-data-by-props', 'Get Data By Props', 'GetDataByPropsDemo', 'https://stackblitz.com/edit/table-get-data-by-props-js', 'https://stackblitz.com/edit/table-get-data-by-props-ts', 'Miscellaneous'),
  new Demo(GroupingCustomCellDemo, '/grouping-custom-cell', 'Grouping Custom Cell', 'GroupingCustomCellDemo', 'https://stackblitz.com/edit/table-grouping-custom-cell-js', 'https://stackblitz.com/edit/table-grouping-custom-cell-ts', 'Grouping'),
  new Demo(GroupingCustomRowDemo, '/grouping-custom-row', 'Grouping Custom Row', 'GroupingCustomRowDemo', 'https://stackblitz.com/edit/table-grouping-custom-row-js', 'https://stackblitz.com/edit/table-grouping-custom-row-ts', 'Grouping'),
  new Demo(GroupingDemo, '/grouping', 'Grouping', 'GroupingDemo', 'https://stackblitz.com/edit/table-grouping-js', 'https://stackblitz.com/edit/table-grouping-ts', 'Grouping'),
  new Demo(HoverRowDemo, '/hover-row', 'Hover Row', 'HoverRowDemo', 'https://stackblitz.com/edit/table-hover-row-js', 'https://stackblitz.com/edit/table-hover-row-ts', 'Rows'),
  new Demo(JsonDemo, '/json', 'Json', 'JsonDemo', 'https://stackblitz.com/edit/table-json-js', 'https://stackblitz.com/edit/table-json-ts', 'Remote Data'),
  new Demo(KeyboardNavigationDemo, '/keyboard-navigation', 'Keyboard Navigation', 'KeyboardNavigationDemo', 'https://stackblitz.com/edit/table-keyboard-navigation-js', 'https://stackblitz.com/edit/table-keyboard-navigation-ts', 'Miscellaneous'),
  new Demo(LoadingDemo, '/loading', 'Loading', 'LoadingDemo', 'https://stackblitz.com/edit/table-loading-js', 'https://stackblitz.com/edit/table-loading-ts', 'Miscellaneous'),
  new Demo(InfiniteScrollingDemo, '/infinite-scrolling', 'Infinite Scrolling', 'InfiniteScrollingDemo', 'https://stackblitz.com/edit/table-infinite-scrolling-js', 'https://stackblitz.com/edit/table-infinite-scrolling-ts', 'Virtual Scrolling'),
  new Demo(ManyColumnsDemo, '/many-columns', 'Many Columns', 'ManyColumnsDemo', 'https://stackblitz.com/edit/table-many-columns-js', 'https://stackblitz.com/edit/table-many-columns-ts', 'Columns'),
  new Demo(ManyRowsDemo, '/many-rows', '100K Rows', 'ManyRowsDemo', 'https://stackblitz.com/edit/table-many-rows-js', 'https://stackblitz.com/edit/table-many-rows-ts', 'Virtual Scrolling'),
  new Demo(ManyRowsDynamicDemo, '/many-rows-dynamic', '10K Rows Dynamic', 'ManyRowsDynamicDemo', 'https://stackblitz.com/edit/table-many-rows-dynamic-js', 'https://stackblitz.com/edit/table-many-rows-dynamic-ts', 'Virtual Scrolling'),
  new Demo(ManyRowsGroupingDemo, '/many-rows-grouping', '10k Grouped', 'ManyRowsGroupingDemo', 'https://stackblitz.com/edit/table-many-rows-grouping-js', 'https://stackblitz.com/edit/table-many-rows-grouping-ts', 'Virtual Scrolling'),
  new Demo(ManyRowsMemoDemo, '/many-rows-memo', '300K Rows & memo', 'ManyRowsMemoDemo', 'https://stackblitz.com/edit/table-many-rows-memo-js', 'https://stackblitz.com/edit/table-many-rows-memo-ts', 'Virtual Scrolling'),
  new Demo(MaterialDemo, '/material', 'Material', 'MaterialDemo', 'https://stackblitz.com/edit/table-material-js', 'https://stackblitz.com/edit/table-material-ts', 'Themes'),
  new Demo(NullableCellDataDemo, '/nullable-cell-data', 'Nullable Cell Data', 'NullableCellDataDemo', 'https://stackblitz.com/edit/table-nullable-cell-data-js', 'https://stackblitz.com/edit/table-nullable-cell-data-ts', 'Miscellaneous'),
  new Demo(PagingDemo, '/paging', 'Paging', 'PagingDemo', 'https://stackblitz.com/edit/table-paging-js', 'https://stackblitz.com/edit/table-paging-ts', ''),
  new Demo(PrintDemo, '/print', 'Print', 'PrintDemo', 'https://stackblitz.com/edit/table-print-js', 'https://stackblitz.com/edit/table-print-ts', 'Export / Print'),
  new Demo(ReduxDemo, '/redux', 'Redux', 'ReduxDemo', 'https://stackblitz.com/edit/table-redux-js', 'https://stackblitz.com/edit/table-redux-ts', ''),
  new Demo(RemoteDataDemo, '/remote-data', 'Load', 'RemoteDataDemo', 'https://stackblitz.com/edit/table-remote-data-js', 'https://stackblitz.com/edit/table-remote-data-ts', 'Remote Data'),
  new Demo(RemoteDataEditingDemo, '/remote-data-editing', 'Editing', 'RemoteDataEditingDemo', 'https://stackblitz.com/edit/table-remote-data-editing-js', 'https://stackblitz.com/edit/table-remote-data-editing-ts', 'Remote Data'),
  new Demo(ResponsiveDemo, '/responsive', 'Responsive', 'ResponsiveDemo', 'https://stackblitz.com/edit/table-responsive-js', 'https://stackblitz.com/edit/table-responsive-ts', 'Miscellaneous'),
  new Demo(RowReorderingDemo, '/row-reordering', 'Row Reordering', 'RowReorderingDemo', 'https://stackblitz.com/edit/table-row-reordering-js', 'https://stackblitz.com/edit/table-row-reordering-ts', 'Rows'),
  new Demo(SearchDemo, '/search', 'Search', 'SearchDemo', 'https://stackblitz.com/edit/table-search-js', 'https://stackblitz.com/edit/table-search-ts', 'Filtering'),
  new Demo(SelectionDemo, '/selection', 'Selection - Multiple', 'SelectionDemo', 'https://stackblitz.com/edit/table-selection-js', 'https://stackblitz.com/edit/table-selection-ts', 'Selection'),
  new Demo(SelectionSingleDemo, '/selection-single', 'Selection - Single', 'SelectionSingleDemo', 'https://stackblitz.com/edit/table-selection-single-js', 'https://stackblitz.com/edit/table-selection-single-ts', 'Selection'),
  new Demo(SortingDemo, '/sorting', 'Sorting', 'SortingDemo', 'https://stackblitz.com/edit/table-sorting-js', 'https://stackblitz.com/edit/table-sorting-ts', 'Sorting'),
  new Demo(SortingModesDemo, '/sorting-modes', 'Sorting Modes', 'SortingModesDemo', 'https://stackblitz.com/edit/table-sorting-modes-js', 'https://stackblitz.com/edit/table-sorting-modes-ts', 'Sorting'),
  new Demo(SortingCustomLogicDemo, '/sorting-custom-logic', 'Sorting Logic', 'SortingCustomLogicDemo', 'https://stackblitz.com/edit/table-sorting-custom-logic-js', 'https://stackblitz.com/edit/table-sorting-custom-logic-ts', 'Sorting'),
  new Demo(StateStoringDemo, '/state-storing', 'State Storing', 'StateStoringDemo', 'https://stackblitz.com/edit/table-state-storing-js', 'https://stackblitz.com/edit/table-state-storing-ts', 'Miscellaneous'),
  new Demo(SummaryDemo, '/summary', 'Summary', 'SummaryDemo', 'https://stackblitz.com/edit/table-summary-js', 'https://stackblitz.com/edit/table-summary-ts', ''),
  new Demo(TabIndexDemo, '/tab-index', 'Tab Index', 'TabIndexDemo', 'https://stackblitz.com/edit/table-tab-index-js', 'https://stackblitz.com/edit/table-tab-index-ts', 'Miscellaneous'),
  new Demo(ValidationDemo, '/validation', 'Validation', 'ValidationDemo', 'https://stackblitz.com/edit/table-validation-js', 'https://stackblitz.com/edit/table-validation-ts', 'Editing'),
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
      <div className='demos-search-back'/>
      <div className='demos'>
        <div className='header'>
          <div className='nav-container'>
            <div className='logo-container'>
              <a href='http://ka-table.com/' className='logo'><img src='static/logo.svg' alt='ka-table'/></a>
            </div>
          </div>
          <div className='links'>
            <a href='http://ka-table.com/docs_props.html' className='docs-link'>Docs</a>
            <a href='#' className='docs-link active'>Demos</a>
            <a href='https://github.com/komarovalexander/ka-table' className='docs-link'>GitHub</a>
            <a href='https://www.npmjs.com/package/ka-table' className='docs-link'>npm</a>
          </div>
        </div>

        <div className='body'>
          <nav className='demo-menu'>
            <div className='nav-container'>
              <DemosMenu cases={cases} />
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
        <footer>
          <h3>Provide your feedback</h3>
          <div>
            if you like it - click the star in this repo: <a href='https://github.com/komarovalexander/ka-table'>https://github.com/komarovalexander/ka-table</a><br/>
            if you found any issue or have any idea what to add/improve - feel free to create an issue: <a href='https://github.com/komarovalexander/ka-table/issues'>https://github.com/komarovalexander/ka-table/issues</a><br/>
            <br/>
            you also can reach the <a href='https://github.com/komarovalexander' onMouseDown={() => { trackEvent('click', 'developed_by', 'Alex (bottom)'); }}>developer</a> by this email: sanrkom@gmail.com
            <br/>
            Thanks for collaboration!
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default Demos;
