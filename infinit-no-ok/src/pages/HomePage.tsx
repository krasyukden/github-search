import React, { useEffect, useState } from 'react'
import { RepoItem } from '../components/RepoItem'
import { useDebounce } from '../hooks/hookDebounce'
import { api, useLazyGetUserQuery, useSearchUsersQuery } from '../store/api'
import s from '../components/home.module.css'
import catImg from '../img/github_cat.png'
import Preloader from '../components/Preloader';
import searchIcon from '../img/loupe.png'
import { useInfiniteQuery } from '../components/useInfiniteQuery'
import { IRepo } from '../components/interface'

export const HomePage = () => {

  const [search, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(false)
  //let [scrollDown, setScrollDown] = useState(false);

  let [userNameLogin, setUserNameLogin] = useState('krasyukden');

  const debounce = useDebounce(search)

  const { isLoading, isError, data } = useSearchUsersQuery(debounce, {
    skip: debounce.length < 2, // когда не надо делать запросы
    refetchOnFocus: true// для автомат обновления
  })



  const { fetchNextPage, isFetching, hasNextPage, isLoading: isReposLoading,
    data: repos }  = useInfiniteQuery(api.endpoints.getUser, {
      //userNameLogin,
      getNextPageParam: (lastPage) => lastPage.has_pages /* lastPage.meta.nextPage */ ?? undefined,

    })// !!!!

    /* const result  = useInfiniteQuery(api.endpoints.getUser, {
        
        getNextPageParam: (lastPage) => lastPage.homepage ?? undefined,
  
      }) */ // !!!!

  /* let repos = IRepo[] | null
  if (reposArray) repos = reposArray[0] */

  //console.log(result, 'result')
  //console.log(repos, 'repos')


  //const [fetchRepos, { isLoading: isReposLoading, data: repos }] = useLazyGetUserQuery()// OK
  //fetchRepos - ф-ция, которая загружает по запросу

  useEffect(() => {
    setDropdown(debounce.length > 2 && data?.length! > 0)
  }, [debounce, data])

  const clickHandler = (userName: string) => {
    //fetchRepos(userName)//ok
    setDropdown(false)
    setUserNameLogin(userName)//
    //fetchUser(userNameLogin)//
    fetchNextPage(userName)
    //console.log(userName)
  }

  const fetchNextPageButton = () => {
    fetchNextPage(userNameLogin)
  }


  //const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

  /*const down = () => {
    
    
    setScrollDown(Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight)
    
    console.log('scrollDown', scrollDown)
    /*console.log('bottom', bottom)
    console.log('window.innerHeight', window.innerHeight)
    console.log('window.scrollY', window.scrollY)
    console.log('document.documentElement.scrollHeight', document.documentElement.scrollHeight) */
  //}
  /*useEffect(() => {
   
    const watchScroll = () => {
      window.addEventListener("scroll", down);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", down);
    };
  }, [window.scrollY]);*/

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
          {repos?.flat(1).map((repo: IRepo) => <RepoItem repo={repo} key={repo.id}
            fetchNextPage={fetchNextPage} /* userName={userNameLogin} */ isFetching={isFetching}
            hasNextPage={hasNextPage} />)}

          <button
            onClick={() => fetchNextPageButton()}
            disabled={!hasNextPage || isFetching}
          >
            {isFetching
              ? 'Loading...'
              : hasNextPage
                ? 'Load more'
                : 'Nothing more to load'}
          </button>

        </div>


      </div>
    </div>


  )
}

