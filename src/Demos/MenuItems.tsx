import './Demos.scss';

import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

export class MenuItem {
  public name!: string;
  public title!: string;
  public path?: string;
  public items?: MenuItem[];
  public isActive?: boolean;
}

const newItems: string[] = ['InsertRowDemo'];
const updateItems: string[] = ['Editing'];

const MenuItems: React.FC<{ items: MenuItem[] }> = ({ items }) => {

  const [menuItems, changeItems] = useState(items);

  React.useEffect(() => {
    changeItems(items);
  }, [items]);

  const clickByGroup = (c: MenuItem) => {
    c.isActive = !c.isActive;
    changeItems([...menuItems]);
  };
  return (
    <>
      {
        menuItems.map((c) => {
          return (
            <li key={c.name}>
              {c.items ? (
                <div className={(c.isActive ? 'active-group' : '') + ' group'} onClick={() => clickByGroup(c)}>
                  <span className='menu-button'>
                    <span className={'group-icon ka-icon ka-icon-group-arrow ka-icon-group-arrow-' + (c.isActive ? 'expanded' : 'collapsed')}/>
                    <span className='menu-icon'><img src={`static/icons/groups/${c.name}.svg`} alt=''/></span>
                    <span className='menu-button-inner'>{c.title}</span>
                    {newItems.includes(c.name) && <span className='new-badge'>new</span>}
                    {updateItems.includes(c.name) && <span className='upd-badge'>upd</span>}
                  </span>
                </div>
              ) : (
              <NavLink to={c.path!} activeClassName='active'>
                <span className='menu-button'>
                  <span className='menu-icon'><img src={`static/icons/${c.name}.svg`} alt=''/></span>
                  <span className='menu-button-inner'>{c.title}</span>
                  {newItems.includes(c.name) && <span className='new-badge'>new</span>}
                  {updateItems.includes(c.name) && <span className='upd-badge'>upd</span>}
                </span>
              </NavLink>
              )}
              {c.isActive && c.items && (
                <ul className='inner-menu'>{
                  c.items.map((i) =>
                  (
                    <li key={i.name}>
                      <NavLink to={i.path!} activeClassName='active'>
                        <span className='menu-button'>
                          <span className='menu-icon'><img src={`static/icons/${i.name}.svg`} alt=''/></span>
                          <span className='menu-button-inner'>{i.title}</span>
                          {newItems.includes(i.name) && <span className='new-badge'>new</span>}
                          {updateItems.includes(i.name) && <span className='upd-badge'>upd</span>}
                        </span>
                      </NavLink>
                    </li>
                  ))
                }</ul>
              )}
            </li>
          )
        }
      )}
    </>
  );
};

export default MenuItems;
