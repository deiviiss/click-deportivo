import { create } from 'zustand'

interface State {
  isSideFilterOpen: boolean

  openSideFilter: () => void
  closeSideFilter: () => void
}

export const useFilterStore = create<State>()((set) => ({
  isSideFilterOpen: false,

  openSideFilter: () => { set({ isSideFilterOpen: true }) },
  closeSideFilter: () => { set({ isSideFilterOpen: false }) }
}))
