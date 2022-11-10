import React, { useEffect, useState } from 'react'
import { RepoItem } from '../components/RepoItem'
import { useDebounce } from '../hooks/hookDebounce'
import { api, useLazyGetUserQuery, useSearchUsersQuery } from '../store/api'
import s from '../components/home.module.css'
import catImg from '../img/github_cat.png'
import Preloader from '../components/Preloader';
import searchIcon from '../img/loupe.png'


export const HomePage = () => {

  const [search, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(false)

  const debounce = useDebounce(search)

  const { isLoading, isError, data } = useSearchUsersQuery(debounce, {
    skip: debounce.length < 2, // когда не надо делать запросы
    refetchOnFocus: true// для автомат обновления
  })

  const [fetchRepos, { isLoading: isReposLoading, data: repos }] = useLazyGetUserQuery()
  //fetchRepos - ф-ция, которая загружает по запросу

  useEffect(() => {
    setDropdown(debounce.length > 2 && data?.length! > 0)
  }, [debounce, data])

  const clickHandler = (userName: string) => {
    fetchRepos(userName)
    setDropdown(false)
  }


  return (
    <div className={s.mainWrapper}>
      <div className={s.homeWrapper}>
        {isError && <div>Error...</div>}
        <div className={s.inputWrapper}>
          <input
            type="text"
            placeholder='Search for Github...'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <img className={s.searchIcon} src={searchIcon} alt='searchIcon' />
        </div>
        <img className={s.catImg} src={catImg} />
        {isLoading && <Preloader />}

        {dropdown && <div className={s.dropdownWrap}>{data?.map(user => {
          return <div className={s.dropdownItem} key={user.id}
            onClick={() => clickHandler(user.login)}
          >{user.login}</div>
        }
        )}</div>}

        <div>
          {isReposLoading && <Preloader />}
          {repos?.map((repo) => <RepoItem repo={repo} key={repo.id}
          />)}
        </div>
      </div>
    </div>
  )
}

