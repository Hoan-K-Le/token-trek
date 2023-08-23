import ChartsOverview from "./components/ChartsOverview/Charts";

export default function Home() {
  return (
    <main className="bg-grey100 dark:bg-slate700 max-w-8xl px-24 pt-20 mx-auto">
      <header>
        <h2 className="text-xl mb-7">Your overview</h2>
      </header>

      <div className="flex gap-7 mb-20">
        <ChartsOverview />
      </div>

      {/* Table Here */}
    </main>
  );
}
