import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const LS_FAV_KEY = 'rfk'// react favorite key  

interface IGitState {
  savePage: string[]
}

const initialState: IGitState = {
  savePage: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
}

export const gitSlice = createSlice({
  name: 'git',
  initialState,
  reducers: {
    addSavePage(state, action: PayloadAction<string>) {
      state.savePage.push(action.payload)
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.savePage))// save in localStorage
    },
    removeSavePage(state, action: PayloadAction<string>) {
      state.savePage = state.savePage.filter(s => s !== action.payload)
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.savePage))
    }
  }

})

export const gitActions = gitSlice.actions
export const gitReducer = gitSlice.reducer