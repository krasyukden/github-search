import { IRepo, IUser, ServerResponse } from './../components/interface';
import React from 'react'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const api = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/'
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    searchUsers: build.query<IUser[], string>({
      //1 дженерик - что получаем, 2й - для запроса
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 15//св-во гитхаба
        }
      }),
      transformResponse: (response: ServerResponse<IUser>) => response.items
    }),
    getUser: build.query<IRepo[], string >({
      query: (userName: string) => ({
        url: `users/${userName}/repos`,
         })
    }),
    /* createUser: build.mutation<any, void>({
      query: () => ``
    }) */
  })
})

export const { useSearchUsersQuery, useLazyGetUserQuery } = api
//useLazyGetUserQuery - ждет когда выберет пользователь