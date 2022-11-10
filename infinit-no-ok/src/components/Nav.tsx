import React from 'react'
import { Link } from 'react-router-dom';
import s from './nav.module.css'


export const Nav = () => {
  return (
    <nav>
      <h2 className={s.headerTitle}>Github Search</h2>
      <div className={s.headerLink}>
        <Link to="/">Home</Link >
        <Link to="/save">Saved pages</Link>
      </div>
    </nav>
  )
}