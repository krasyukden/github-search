import React, { FC, useState } from 'react'
import { useActions } from '../hooks/hookAction'
import { useAppSelector } from '../hooks/hookRedux'
import { IRepo } from './interface'
import s from './repo.module.css'

export const RepoItem = ({repo}: { repo: IRepo } ) => {

  const { addSavePage, removeSavePage } = useActions()

  const { savePage } = useAppSelector(state => state.github)
  const [isSave, setSave] = useState(savePage.includes(repo.html_url))

  const addToSavePage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addSavePage(repo.html_url)
    setSave(true)
  }
  const removeToSavePage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    removeSavePage(repo.html_url)
    setSave(false)
  }
  return (
      <div className={s.repoWrapper}>
        <a href={repo.html_url} target='_blank'>
          <div className={s.repoName}>{repo.full_name}</div>
          <div>Forks: <span>{repo.forks}</span></div>
          <div>Watchers: <span>{repo.watchers}</span></div>
          <div>{repo?.description}</div>

          {!isSave && <button className={s.buttonAdd} onClick={addToSavePage}>Add</button>}
          {isSave && <button className={s.buttonRemove} onClick={removeToSavePage}>Remove</button>}
        </a>
      </div>
     
    
  )
}