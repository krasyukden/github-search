import { IRepo, IUser, ServerResponse } from './../components/interface';
import React from 'react'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

/* export interface IRepo {
  repo: IRepo[];
  meta: { nextPage: number | null };
} */

export const api = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/'
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    searchUsers: build.query<IUser[], string>({
      //1 дженерик - что получаем, 2й - для запроса? <IUser> - конкретный интерфейс.
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 15//св-во гитхаба
        }
      }),
      transformResponse: (response: ServerResponse<IUser>) => response.items
    }),
    getUser: build.query<IRepo/* IRepo[] */, /* string */ {page?: number, userName: string}  >({
      query: ({userName, page = 1}) => ({
        url: `users/${userName}/repos`,
        params: {
          per_page: 10,// !!!!
          page
        }
      })
    }),
    /* createUser: build.mutation<any, void>({
      query: () => ``
    }) */
  })
})

export const { useSearchUsersQuery, useLazyGetUserQuery } = api
//useLazyGetUserQuery - ждет когда выберет пользователь