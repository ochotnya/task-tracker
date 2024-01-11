'use client'

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

export type Activity = {
  start: string
  end?: string
}

export type JiraTask = {
  name: string
  isActive: boolean
  activity: Activity[]
}

type AppData = {
  tasks: JiraTask[]
}
type AppContextType = {
  appData: AppData
  saveData: (value: AppData) => void
}

const defaultContext: AppContextType = {
  appData: { tasks: [] },
  saveData: () => {},
}

const AppContext = createContext<AppContextType>(defaultContext)

const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [appData, setAppData] = useState<AppData>(defaultContext.appData)

  const saveAppData = (data: AppData) => {
    try {
      setAppData(data)
      window.localStorage.setItem('app', JSON.stringify(data))
    } catch (err) {}
  }

  useEffect(() => {
    try {
      const value = window.localStorage.getItem('app')

      if (value) {
        setAppData(JSON.parse(value))
      } else {
        window.localStorage.setItem(
          'app',
          JSON.stringify(defaultContext.appData),
        )
        setAppData(defaultContext.appData)
      }
    } catch (e) {
      setAppData(defaultContext.appData)
    }
  }, [])

  return (
    <AppContext.Provider value={{ appData: appData, saveData: saveAppData }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider

export const useAppContext = () => {
  const context = useContext(AppContext)

  return context
}
