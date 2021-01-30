import './Demos.scss';

import React, { useState } from 'react';

import { DemoCase } from './DemoCase';
import { trackEvent } from './ga';
import MenuItems, { MenuItem } from './MenuItems';

interface IDemosMenuProps {
  cases: DemoCase[];
}
let timeoutId: any = null;

const synonyms: { [value: string]: any[] } = {
  'AlertCellDemo': ['Image', 'Button', 'Btn'],
  'ColumnReorderingDemo': ['Drag'],
  'ColumnSettingsDemo': ['Hide', 'Show', 'Action Creator'],
  'CustomCellDemo': ['Center', 'Width', 'openEditor', 'Format', 'Number', 'Money', 'Dollar'],
  'CustomEditorDemo': ['cellEditor'],
  'CustomThemeDemo': ['Color', 'Dark', 'styles'],
  'EditingRowDemo': ['Image', 'Button', 'Btn'],
  'EventsDemo': ['Action', 'Click'],
  'FilterRowCustomEditorDemo': ['filterRowCell'],
  'FixedColumnDemo': ['Sticky'],
  'ManyColumnsDemo': ['horizontal'],
  'NullableCellDataDemo': ['groupsExpanded'],
  'PagingDemo': ['pageSize'],
  'ResponsiveDemo': ['Adaptive', 'Mobile'],
  'RowReorderingDemo': ['Drag'],
  'SearchDemo': ['No Data', 'Empty'],
  'SelectionDemo': ['Checkbox'],
  'TabIndexDemo': ['keyboard navigation']
};

const DemosMenu: React.FC<IDemosMenuProps> = ({ cases }) => {
  const [search, changeSearch] = useState('');
  const filteredCases = search ? cases.filter((c) => {
    return c.title.toLowerCase().includes(search.toLowerCase())
      || c.group.toLowerCase().includes(search.toLowerCase())
      || (synonyms[c.name] && synonyms[c.name].some(t => t.toLowerCase().includes(search.toLowerCase())))
  }) : cases;
  filteredCases.sort((a, b) => a.title.localeCompare(b.title));

  let menuItems: MenuItem[] = [];
  filteredCases.forEach(c => {
    const item = menuItems.find(i => i.title === c.group);
    if (item) {
      item.items!.push({
        name: c.name,
        path: c.path,
        title: c.title
      });
    } else {
      menuItems.push({
        name: (c.group && c.group.replace(' ', '').replace('/ ', '')) || c.name,
        path: c.group ? '' : c.path,
        title: c.group || c.title,
        items: c.group ? [{
          name: c.name,
          path: c.path,
          title: c.title,
        }] : undefined
      });
    }
  });

  menuItems = menuItems.map(mi => ({ ...mi, isActive: !!search || (mi.items && mi.items.some(i => window.location.hash.includes(i.path!)))}));

  menuItems.sort((a, b) => a.title.localeCompare(b.title));
  return (
    <div className='menu'>
      <input className='menu-search' type='search' placeholder='search by menu..' value={search} onChange={(e) => {
        const searchValue = e.currentTarget.value;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (searchValue) {
            trackEvent('type', 'search:', searchValue);
          }
        }, 600);
        changeSearch(searchValue);
      }} />
      <ul className='menu-ul'>
        <MenuItems items={menuItems}/>
      </ul>
    </div>
  );
};

export default DemosMenu;
