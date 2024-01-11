import Image from 'next/image'
import AddTask from '~/app/_components/AddTask'
import AppContextProvider from '~/app/_components/AppContext'
import TasksList from '~/app/_components/TasksList'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-800">
      <AppContextProvider>
        <div className="p-4 flex w-full">
          <AddTask />
        </div>

        <TasksList />
      </AppContextProvider>
    </main>
  )
}
