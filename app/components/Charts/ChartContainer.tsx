type ChartContainerProps = {
  children: React.ReactNode;
  name: string;
  price: string;
  date: string;
};

export default function ChartContainer({
  children,
  name,
  price,
  date,
}: ChartContainerProps) {
  return (
    <div className="bg-white100 dark:bg-slate900 relative flex justify-center gap-7 w-1/2 max-h-96 mb-20 py-4 rounded-lg">
      <div className="absolute left-3">
        <p className="text-lg">{name}</p>
        <p className="text-4xl">{`$${price}`}</p>
        <p className="text-lg">{date}</p>
      </div>
      {children}
    </div>
  );
}
