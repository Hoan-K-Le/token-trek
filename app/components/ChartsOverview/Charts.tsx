export default function ChartsOverview() {
  return (
    <div>
      <header>
        <h2 className="mb-7">Your overview</h2>
      </header>

      <div className="flex gap-7 mb-20">
        <div className="bg-slate900 max-w-3.5xl max-h-md">
          <p>BTC</p>
          <p>$13.431 mln</p>
          <p>Jun 14, 2021</p>
        </div>

        <div className="bg-slate900 max-w-3.5xl max-h-md">
          <p>Volume 24hr</p>
          <p>$807.24 bln</p>
          <p>Jun 14, 2021</p>
        </div>
      </div>
    </div>
  );
}
