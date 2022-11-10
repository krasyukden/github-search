import { api } from './api';
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { gitReducer } from './slice';


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    github: gitReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
  //соединяем с middleware от api
})

setupListeners(store.dispatch)//для настройки автомат обновления стр

export type RootState = ReturnType<typeof store.getState>