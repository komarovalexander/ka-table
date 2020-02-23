import './Demos.scss';

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { DemoCase } from './DemoCase';
import { trackEvent } from './ga';

interface IDemosMenuProps {
  cases: DemoCase[];
}
const DemosMenu: React.FC<IDemosMenuProps> = ({ cases }) => {
  const [search, changeSearch] = useState('');
  const filteredCases = search ? cases.filter((c) => c.title.toLowerCase().includes(search.toLowerCase())) : cases;
  return (
    <ul className='menu'>
      <input className='menu-search' type='search' placeholder='search by demos..' value={search} onChange={(e) => {
        const searchValue = e.currentTarget.value;
        trackEvent('type', 'search:', searchValue);
        changeSearch(searchValue);
      }} />
      {
        filteredCases.map((c) => (
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
  );
};

export default DemosMenu;
