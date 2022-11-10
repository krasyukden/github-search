import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { QueryHooks } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useEffect, useRef, useState } from 'react';
//import { useLazyGetUserQuery } from '../store/api'
import { api, useLazyGetUserQuery} from '../store/api'
import { IRepo } from './interface';

// infer result type from endpoint - there is probably a better way of doing this
type GetResultTypeFromEndpoint<Endpoint> = Endpoint extends QueryHooks<
  QueryDefinition<any, any, string, infer ResultType, string>
>
  ? ResultType
  : never;

interface UseInfiniteQueryOptions<ResultType> {
  getNextPageParam(lastPage: ResultType): any,
  //userNameLogin: string
  /* api: {
    endpoints: {
      getUser: {
        query(userNameLogin: string): UseInfiniteQueryOptions<IRepo>
      }
    }
  }// */
}

export function useInfiniteQuery<
  Endpoint extends QueryHooks<QueryDefinition<any, any, any, any, any>>,
  ResultType = GetResultTypeFromEndpoint<Endpoint>
>(endpoint: Endpoint, options: UseInfiniteQueryOptions<IRepo/* ResultType */>) {
  const nextPage = useRef<number | undefined>(undefined);
  const [pages, setPages] = useState<Array<IRepo/* ResultType */> | undefined>(undefined);
  //const [trigger, result] = endpoint.useLazyQuery();//ok
  const [trigger, result] = useLazyGetUserQuery();//

//console.log('result', result)

  //const [userNameLogin, setUserNameLogin] = useState('');//
  //const [trigger, result] = endpoint.useLazyGetUserQuery();// !!!

/*   useEffect(() => {
    trigger({ page: undefined, 
      userName: '' });
  }, []); */

  useEffect(() => {
    if (!result.isSuccess) return;
    nextPage.current = options.getNextPageParam(result.data);
    setPages([...(pages ?? []), result.data]);

    //setUserNameLogin(result.data.user )//

  }, [result.data]);

  return {
    ...result,
    data: pages,
    //userNameLogin,//
    isLoading: result.isFetching && pages === undefined,
    hasNextPage: nextPage.current !== undefined,
    /* fetchUser(userName: string){
      trigger( userName )
    }, */
    fetchNextPage(userName: string) {//
      if (true/* nextPage.current !== undefined */) {
        
        //console.log(userName)

        trigger({ page: nextPage.current,
          userName//
        });
      }
    },
  };
}