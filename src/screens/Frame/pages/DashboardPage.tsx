import {
  Bell,
  ChevronUp,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Header from "../../../components/ui/header";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { ReactElement } from "react";
import { TooltipProps } from "recharts";


const sidebarSubItems = [
  { label: "Boeing", slug: "boeing" },
  { label: "Airbus", slug: "airbus" },
  { label: "Embraer", slug: "embraer" },
  { label: "SSJ-100", slug: "ssj-100" },
];

const statsCards = [
  { title: "Выручка", value: "$81.000" },
  { title: "Всего покупателей", value: "5.000" },
  { title: "Всего заказов", value: "12.000" },
  { title: "Активные заказы", value: "5.000" },
];

const chartDays = ["21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

const ordersData = [
  {
    id: "021231",
    product: "Kanky Kitadakate (Green)",
    customer: "Leslie Alexander",
    price: "$21.78",
    date: "04/17/23",
    status: "в сборке",
    statusColor: "bg-[#fec6aa] text-[#eb2b0b]",
  },
  {
    id: "021232",
    product: "Story Honzo (Cream)",
    customer: "Jenny Wilson",
    price: "$21.78",
    date: "04/17/23",
    status: "Shipping",
    statusColor: "bg-[#dcd2ff] text-[#7f27ff]",
  },
  {
    id: "021233",
    product: "Story Honzo (Cream)",
    customer: "Esther Howard",
    price: "$21.78",
    date: "04/17/23",
    status: "Shipping",
    statusColor: "bg-[#dcd2ff] text-[#7f27ff]",
  },
  {
    id: "021234",
    product: "Kanky Kitadakate (Green)",
    customer: "Robert Fox",
    price: "$21.78",
    date: "04/17/23",
    status: "Cancelled",
    statusColor: "bg-[#fec6aa] text-[#eb2b0b]",
  },
];

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

// Функция для создания плавной кривой Безье через точки
interface Point {
  x: number;
  y: number;
  value: number;
}

function createSmoothPath(points: Point[], tension = 0.3): string {
  if (points.length < 2) return "";
  
  let path = `M ${points[0].x},${points[0].y}`;
  
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const p_1 = i > 0 ? points[i - 1] : p0;
    const p2 = i < points.length - 2 ? points[i + 2] : p1;
    
    const cp1x = p0.x + (p1.x - p_1.x) * tension;
    const cp1y = p0.y + (p1.y - p_1.y) * tension;
    const cp2x = p1.x - (p2.x - p0.x) * tension;
    const cp2y = p1.y - (p2.y - p0.y) * tension;
    
    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
  }
  
  return path;
}

export const DashboardPage = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const revenueData = [211441, 214000, 218000, 225000, 240000, 255000, 268000, 285000, 310000, 325000, 339091];
  const incomeData = [120000, 145000, 165000, 185000, 210000, 235000, 255000, 275000, 295000, 315000, 330000];

  const [showRevenue, setShowRevenue] = useState(true);
  const [showIncome, setShowIncome] = useState(true);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);


  const maxValue = Math.max(...revenueData, ...incomeData);
  const minValue = Math.min(...revenueData, ...incomeData) * 0.9;
  const navigate = useNavigate();


  function pointsFor(data: number[], w: number, h: number): Point[] {
    const padX = 30;
    const padY = 20;
    const usableW = w - padX * 2;
    const usableH = h - padY * 2;
    const step = usableW / Math.max(1, data.length - 1);
    
    return data.map((v: number, i: number) => {
      const x = padX + step * i;
      const normalizedValue = (v - minValue) / (maxValue - minValue);
      const y = padY + usableH - (normalizedValue * usableH);
      return { x, y, value: v };
    });
  }

  const formatCurrency = (value: number): string => {
    return `$ ${(value / 1000).toFixed(0)},000`;
  };

return (
    <div className="flex w-full min-h-screen bg-[#101011] overflow-x-hidden">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col w-[279px] gap-[45px] px-4 py-8 bg-[#1a1a1b]`}>
        <Header onClose={() => setIsSidebarOpen(false)} />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2.5">
        <nav className="flex flex-col gap-8">
          <div className="flex flex-col gap-2.5">
            <div className="px-2">
              <span className="text-neutral-500 text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">
                GENERAL
              </span>
            </div>

            {/* Dashboard */}
            <Button
              onClick={() => navigate("/dashboard")}
              variant="ghost"
              className="justify-start gap-2 h-10 px-2 [font-family:'PPNeueMachina-Regular',Helvetica] text-black bg-[#d9edff] transition-colors"
            >
              <img className="w-6 h-6" alt="Dashboard" src="/home-3.svg" />
              <span className="text-sm">Dashboard</span>
            </Button>

            {/* Товары with submenu */}
            <div className="flex flex-col gap-1 relative">
              <Button
                variant="secondary"
                onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                className="justify-between gap-2 h-10 px-2 bg-transparent text-[#ffffff] hover:bg-transparent [font-family:'PPNeueMachina-Regular',Helvetica] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <img className="w-6 h-6" alt="Store" src="/store.svg" />
                  <span className="text-sm">Товары</span>
                </div>
                <img src="/arrow-up-simple.svg" alt="Up" className={`w-6 h-6 transition-transform ${isSubmenuOpen ? "rotate-0" : "rotate-180"}`} />
              </Button>

              {isSubmenuOpen && (
              <>
                {sidebarSubItems.map((subItem, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => {
                      navigate(`/products?brand=${subItem.slug}`);
                      setIsSubmenuOpen(false);
                    }}
                    className="justify-start h-10 px-2 ml-6 text-[#b0b0b0] hover:text-white hover:bg-transparent [font-family:'PPNeueMachina-Regular',Helvetica] transition-colors"
                  >
                    <span className="text-sm">{subItem.label}</span>
                  </Button>
                ))}

                <img
                  className="absolute top-9 left-[18px] w-[15px] h-[180px]"
                  alt="Frame"
                  src="/frame-624774.svg"
                />
              </>
            )}
            </div>

            {/* Заказы */}
            <Button
              onClick={() => navigate("/orders")}
              variant="ghost"
              className="justify-start gap-2 h-10 px-2 text-[#b0b0b0] hover:text-white hover:bg-transparent [font-family:'PPNeueMachina-Regular',Helvetica] transition-colors"
            >
              <img className="w-6 h-6" alt="Orders" src="/note-01.svg" />
              <span className="text-sm">Заказы  (441)</span>
            </Button>

            {/* Клиенты */}
            <Button
              onClick={() => navigate("/customers")}
              variant="ghost"
              className="justify-start gap-2 h-10 px-2 text-[#b0b0b0] hover:text-white hover:bg-transparent [font-family:'PPNeueMachina-Regular',Helvetica] transition-colors"
            >
              <img className="w-6 h-6" alt="Clients" src="/user-group.svg" />
              <span className="text-sm">Клиенты</span>
            </Button>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="px-2">
              <span className="text-neutral-500 text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">
                TOOLS
              </span>
            </div>

            <Button
              onClick={() => navigate("/account")}
              variant="ghost"
              className="justify-start gap-2 h-10 px-2 text-[#b0b0b0] hover:text-white hover:bg-transparent [font-family:'PPNeueMachina-Regular',Helvetica] transition-colors"
            >
              <img className="w-6 h-6" alt="Settings" src="/settings.svg" />
              <span className="text-sm">Account &amp; Settings</span>
            </Button>
          </div>
        </nav>
          </div>
        </div>
      </aside>

      <main className="flex flex-col flex-1 min-w-0">
        {/* Desktop Header */}
        <header className="hidden lg:flex flex-col gap-2.5 px-4 xl:px-8 py-6 bg-[#1a1a1b] border-b-2 border-[#3d3d3d]">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-[300px]">
              <Input
                placeholder="Найти товар"
                className="w-full h-10 px-4 rounded-xl border-[1.6px] border-[#d1d1d1] bg-transparent text-[#949494] font-normal text-sm pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F6F6F6]" />
            </div>

            <div className="flex items-center gap-4">
              <div className="relative p-1.5 bg-[#3d3d3d] rounded-[9px] cursor-pointer transition-colors">
                <Bell className="w-6 h-6 text-white" />
                <div className="absolute top-1 left-[19px] bg-[#ec4747] rounded-sm px-1 pt-px pb-0.5">
                  <div className="font-semibold text-[#0c0c0c] text-[8px] leading-[8.8px]">8</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-4 bg-[#1a1a1b] border-b-2 border-[#3d3d3d]">
          <button
            title="Menu"
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-white hover:text-[#09b9d9] transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 text-white cursor-pointer" />
            <div className="relative p-1.5 bg-[#3d3d3d] rounded-[9px] cursor-pointer">
              <Bell className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 bg-[#ec4747] rounded-full w-4 h-4 flex items-center justify-center">
                <span className="text-[#0c0c0c] text-[8px] font-semibold">8</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-[22px] p-4 md:p-6 xl:p-8">
          <div className="flex flex-col gap-2">
            <div className="font-normal [font-family:'PPNeueMachina-Regular',Helvetica] text-[#f6f6f6] text-xl sm:text-2xl">Dashboard</div>
            <div className="flex items-center gap-1">
              <div className="font-normal text-[#b0b0b0] text-sm">Dashboard</div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-[22px]">
            {/* P&L Chart - Адаптивная ширина */}
            <div className="flex flex-col gap-[22px] flex-1 min-w-0">
              <Card className="bg-[#1a1a1b] border-[#3d3d3d] rounded-3xl w-full lg:w-50%">
                <CardContent className="p-4 sm:p-5 flex flex-col gap-4 sm:gap-6">
                  <div className="flex flex-col gap-6 border border-neutral-900 bg-bg-dark-muda rounded-3xl h-[320px] sm:h-[360px] xl:h-[362px]">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-jakarta text-base font-semibold text-neutral-50">P&L</h3>

                      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                        <button
                          onClick={() => setShowRevenue(!showRevenue)}
                          className="flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
                        >
                          <span className="w-3 h-3 bg-[#ffffff] rounded-full" />
                          <span className="font-normal [font-family:'PPNeueMachina-Regular',Helvetica] text-[#b0b0b0] text-xs">Выручка</span>
                        </button>

                        <button
                          onClick={() => setShowIncome(!showIncome)}
                          className="flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
                        >
                          <span className="w-3 h-3 bg-[#09b9d9] rounded-full" />
                          <span className="font-normal [font-family:'PPNeueMachina-Regular',Helvetica] text-[#b0b0b0] text-xs">Доход</span>
                        </button>
                      </div>
                    </div>

                    <div className="relative w-full overflow-hidden h-[180px] sm:h-[200px] xl:h-[223px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                          <Line type="monotone" dataKey="revenue" stroke="#ffffff" strokeWidth={4} dot={false} strokeLinecap="round"/>
                          <Line type="monotone" dataKey="income" stroke="#09BAD9" strokeWidth={4} dot={false} strokeDasharray="7 7" strokeLinecap="round"/>
                          <Tooltip cursor={false} content={({active, payload,}: TooltipProps<number, string>): ReactElement | null => {if (active && payload && payload.length) {
                                return (
                                  <div className="flex flex-row gap-2">
                                    <div className="px-3 py-2 rounded-xl border border-dashed border-[#3381F7] bg-neutral-50">
                                      <span className="font-machina text-sm text-black">
                                        $ {payload[0]?.value?.toLocaleString()}
                                      </span>
                                    </div>

                                    <div className="px-3 py-2 rounded-xl bg-[#09BAD9]">
                                      <span className="font-machina text-sm text-white">
                                        $ {payload[1]?.value?.toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />

                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex justify-between items-center px-2 sm:px-4">
                      {data.map((item) => (
                        <span
                          key={item.day}
                          className="font-machina text-[10px] sm:text-xs xl:text-sm text-neutral-300"
                        >
                          {item.day}
                        </span>
                      ))}
                    </div>
                  </div>

                </CardContent>
              </Card>
            </div>

            {/* Stats Cards - Адаптивная сетка */}
            <div className="flex flex-col gap-[22px]">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:w-[516px]">
                {statsCards.map((card, index) => (
                  <Card
                    key={index}
                    className="bg-[#1a1a1b] border-[#3d3d3d] rounded-[20px] min-h-[130px] sm:min-h-[151px]"
                  >
                    <CardContent className="p-4 sm:p-[18px] flex flex-col justify-between h-full">
                      <div className="[font-family:'PPNeueMachina-Regular',Helvetica] text-[#f6f6f6] text-sm sm:text-base">{card.title}</div>
                      <div className="[font-family:'PPNeueMachina-Regular',Helvetica] text-[#09b9d9] text-2xl sm:text-3xl">{card.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <Card className="bg-[#1a1a1b] border-[#3d3d3d] rounded-3xl">
            <CardContent className="p-4 lg:p-5 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="font-normal text-[#f6f6f6] text-base">
                  <span className="hidden lg:inline">Заказы</span>
                  <span className="lg:hidden [font-family:'PPNeueMachina-Regular',Helvetica]">Product Popular</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="[font-family:'PPNeueMachina-Regular',Helvetica] text-[#f6f6f6] text-sm">все заказы</div>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>

              {/* Desktop Orders Table */}
              <div className="hidden lg:flex flex-col rounded-2xl border border-[#3d3d3dc2] overflow-x-auto">
                {ordersData.map((order, index) => (
                  <div key={index} className="flex items-start px-0 py-[3px] hover:bg-[#232324] transition-colors min-w-[800px]">
                    <div className="w-[250px] flex items-start gap-2 p-3">
                      <div className="w-[42px] h-[42px] bg-[#f6f6f6] rounded-md flex-shrink-0" />
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="font-normal text-[#09b9d9] text-xs">{order.id}</div>
                        <div className="font-semibold text-[#f6f6f6] text-sm truncate">{order.product}</div>
                      </div>
                    </div>

                    <div className="w-[140px] flex flex-col gap-2 p-3">
                      <div className="font-semibold text-[#f6f6f6] text-sm truncate">{order.customer}</div>
                    </div>

                    <div className="w-[120px] flex flex-col gap-2 p-3">
                      <div className="font-semibold text-[#f6f6f6] text-sm">{order.price}</div>
                    </div>

                    <div className="w-[120px] flex flex-col gap-2 p-3">
                      <div className="font-normal text-[#f6f6f6] text-sm">{order.date}</div>
                    </div>

                    <div className="flex flex-col items-end justify-center gap-2 p-3 flex-1">
                      <Badge className={`${order.statusColor} rounded-[10px] px-2 py-1.5 font-normal text-xs`}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Orders List - Collapsible */}
              <div className="lg:hidden flex flex-col rounded-2xl border border-[#3d3d3dc2]">
                <div className="flex items-center gap-1 p-3.5 border-b border-[#3d3d3d]">
                  <span className="flex-1 text-neutral-50 text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">Заказы</span>
                  <div className="flex flex-col w-[11px] justify-center items-start gap-px">
                    <ChevronUp className="w-3 h-3 text-white" />
                    <ChevronDown className="w-3 h-3 text-white" />
                  </div>
                </div>

                {ordersData.map((order, idx) => {
                  const isExpanded = expandedOrder === order.id + idx;
                  return (
                    <div 
                      key={idx} 
                      className="border-b border-[#3d3d3d] last:border-b-0"
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id + idx)}
                    >
                      <div className="flex items-start p-3 gap-3 cursor-pointer">
                        <div className="w-[42px] h-[42px] bg-[#f6f6f6] rounded-md flex-shrink-0" />
                        {!isExpanded ? (
                          <div className="flex flex-col items-start gap-1 flex-1 min-w-0">
                            <span className="text-[#09b9d9] text-xs">{order.id}</span>
                            <span className="text-neutral-50 text-sm truncate w-full">{order.product}</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-start gap-3 flex-1 min-w-0">
                            <div className="flex flex-col items-start gap-1 w-full">
                              <span className="text-[#09b9d9] text-xs">{order.id}</span>
                              <span className="text-neutral-50 text-sm">{order.product}</span>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <div className="flex justify-between items-center">
                                <span className="text-[#b0b0b0] text-xs">Price</span>
                                <span className="text-neutral-50 text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">{order.price}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-[#b0b0b0] text-xs">Sales</span>
                                <span className="text-neutral-50 text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">3690</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-[#b0b0b0] text-xs">Status</span>
                                <Badge className={`${order.statusColor} rounded-lg px-2 py-1 text-xs [font-family:'PPNeueMachina-Regular',Helvetica]`}>
                                  {order.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        )}
                        <ChevronUp className={`w-4 h-4 text-[#f6f6f6] transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}