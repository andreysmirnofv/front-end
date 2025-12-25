interface StatCardProps {
  title: string;
  value: string;
}

export function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="flex flex-col justify-between gap-[30px] lg:gap-6 p-4 lg:p-5 border border-neutral-900 bg-bg-dark-muda rounded-[20px] h-[151px] w-full lg:w-[250px]">
      <h3 className="font-machina text-base text-neutral-50">{title}</h3>
      <div className="font-machina text-[30px] text-accent-cyan leading-[130%]">{value}</div>
    </div>
  );
}
