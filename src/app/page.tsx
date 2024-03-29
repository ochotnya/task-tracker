import AddTask from '~/app/_components/AddTask'
import AppContextProvider from '~/app/_components/AppContext'
import TasksList from '~/app/_components/TasksList'
import Chart from '~/app/_components/chart/Chart'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <AppContextProvider>
        <div className="p-4 flex w-full">
          <AddTask />
        </div>

        <TasksList />
        <Chart />
      </AppContextProvider>
    </main>
  )
}
