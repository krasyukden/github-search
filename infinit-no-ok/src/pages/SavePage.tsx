import React from 'react'
import { useAppSelector } from '../hooks/hookRedux'
import s from '../components/save.module.css'


export const SavePage = () => {

  const { savePage } = useAppSelector(state => state.github)

  if (savePage.length === 0) return <p>No items</p>

  return (
    <div className={s.saveWrapper}>{savePage.map(s => <div key={s}>
      <a href={s} target='_blank'>{s}</a>
    </div>)}
    </div>
  )
}