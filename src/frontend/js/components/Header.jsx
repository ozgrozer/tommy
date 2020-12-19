import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = props => {
  const { searchOnChange } = props

  const icons = [
    { icon: 'home', link: '/' },
    { icon: 'storefront', link: '/t/app-store' },
    { icon: 'settings', link: '/t/settings' }
  ]

  return (
    <div className='header'>
      <input
        type='text'
        placeholder='Search'
        className='searchInput'
        onChange={searchOnChange}
      />

      {icons.map((icon, key) => {
        return (
          <NavLink
            exact
            key={key}
            to={icon.link}
            className='iconWrapper'
          >
            <i className={`icon icon-${icon.icon}`} />
          </NavLink>
        )
      })}
    </div>
  )
}

export default Header
