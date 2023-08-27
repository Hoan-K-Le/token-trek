import ChartsOverview from './components/ChartsOverview/Charts'
import TableOverview from './components/TableOverview/TableOverview'

export default function Home() {
  return (
    <main className="bg-slate700 mx-auto pt-20 px-24 w-screen">
      <ChartsOverview />
      {/* Table Here */}
      <TableOverview />
    </main>
  )
}
