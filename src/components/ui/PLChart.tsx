import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { day: "21", revenue: 86.5, income: 102 },
  { day: "22", revenue: 80, income: 95 },
  { day: "23", revenue: 74, income: 88 },
  { day: "24", revenue: 68, income: 82 },
  { day: "25", revenue: 59, income: 73 },
  { day: "26", revenue: 59, income: 71 },
  { day: "27", revenue: 79, income: 59 },
  { day: "28", revenue: 74, income: 58 },
  { day: "29", revenue: 97, income: 74 },
  { day: "30", revenue: 100, income: 100 },
  { day: "31", revenue: 2, income: 19 },
];

export function PLChart() {
  return (
    <div className="flex flex-col gap-6 lg:gap-6 p-4 lg:p-5 border border-neutral-900 bg-bg-dark-muda rounded-3xl h-[355px] lg:h-[382px]">
      <div className="flex flex-col gap-3">
        <h3 className="font-jakarta text-base font-semibold text-neutral-50">P&L</h3>
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-white" />
            <span className="font-machina text-xs text-neutral-300">Выручка</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-accent-cyan" />
            <span className="font-machina text-xs text-neutral-300">Доход</span>
          </div>
        </div>
      </div>

      <div className="relative flex-1 -mx-4 lg:-mx-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#ffffff" 
              strokeWidth={4} 
              dot={false}
              strokeLinecap="round"
            />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#09BAD9" 
              strokeWidth={4} 
              dot={false}
              strokeDasharray="7 7"
              strokeLinecap="round"
            />
            <Tooltip 
              contentStyle={{ 
                background: '#09BAD9', 
                border: 'none', 
                borderRadius: '12px',
                padding: '8px 12px',
                fontSize: '14px',
                fontFamily: 'PP Neue Machina'
              }}
              labelStyle={{ display: 'none' }}
              itemStyle={{ color: '#fff', padding: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="absolute left-[140px] lg:left-[140px] top-[13px] inline-flex flex-col gap-1 px-3 py-2 rounded-xl border border-dashed border-[#3381F7] bg-neutral-50">
          <span className="font-machina text-sm text-black">$ 211,411,223</span>
        </div>

        <div className="absolute left-[190px] lg:left-[271px] top-[13px] inline-flex flex-col gap-1 px-3 py-2 rounded-xl bg-accent-cyan">
          <span className="font-machina text-sm text-white">$ 339,091,888</span>
        </div>
      </div>

      <div className="flex justify-between items-center px-0 lg:px-4">
        {data.map((item) => (
          <div key={item.day} className="flex flex-col items-center">
            <span className="font-machina lg:font-machina font-jakarta lg:text-sm text-xs text-neutral-300">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
