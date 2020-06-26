import './Demos.scss';

import React, { useState } from 'react';

import { DemoCase } from './DemoCase';
import { trackEvent } from './ga';
import MenuItems, { MenuItem } from './MenuItems';

interface IDemosMenuProps {
  cases: DemoCase[];
}
let timeoutId: any = null;

const DemosMenu: React.FC<IDemosMenuProps> = ({ cases }) => {
  const [search, changeSearch] = useState('');
  const filteredCases = search ? cases.filter((c) => c.title.toLowerCase().includes(search.toLowerCase())) : cases;

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
        name: (c.group && c.group.replace(' ', '')) || c.name,
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

  menuItems.sort((a, b) => a.title[0] > b.title[0] ? 1 : -1);
  return (
    <ul className='menu'>
      <input className='menu-search' type='search' placeholder='search by menu..' value={search} onChange={(e) => {
        const searchValue = e.currentTarget.value;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (searchValue) {
            trackEvent('type', 'search:', searchValue);
          }
        }, 300);
        changeSearch(searchValue);
      }} />
      <MenuItems items={menuItems}/>
    </ul>
  );
};

export default DemosMenu;