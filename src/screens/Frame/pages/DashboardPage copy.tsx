import { Sidebar } from "../../../components/ui/sidebar";
import Header from "../../../components/ui/header";
import { PLChart } from "../../../components/ui/PLChart";
import { StatCard } from "../../../components/ui/StatCard";
import { OrdersTable } from "../../../components/ui/OrdersTable";
import { ProductPopular } from "../../../components/ui/ProductPopular";
import { Helmet } from "react-helmet";


export function DashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard - AVIAPIC</title>
        <meta name="description" content="AVIAPIC Dashboard - Track your revenue, orders, and customers in real-time" />
        <meta property="og:title" content="Dashboard - AVIAPIC" />
        <meta property="og:description" content="AVIAPIC Dashboard - Track your revenue, orders, and customers in real-time" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-bg-dark">
        <Sidebar />
        
        <div className="lg:ml-[279px] flex flex-col">
          <Header />
          
          <main className="flex-1 p-4 lg:p-8">
            <div className="flex flex-col gap-5 lg:gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="font-machina text-2xl text-neutral-50">Dashboard</h1>
                <div className="flex items-center gap-1">
                  <span className="font-machina text-sm text-neutral-300">Dashboard</span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-5 lg:gap-[22px]">
                <div className="flex-1 flex flex-col gap-5 lg:gap-[22px]">
                  <PLChart />
                </div>

                <div className="flex flex-col gap-4 lg:gap-[22px]">
                  <div className="grid grid-cols-2 lg:flex lg:flex-col gap-4 lg:gap-4">
                    <StatCard title="Выручка" value="$81.000" />
                    <StatCard title="Всего покупателей" value="5.000" />
                    <StatCard title="Всего заказов" value="12.000" />
                    <StatCard title="Активные заказы" value="5.000" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 lg:gap-[22px]">
                <OrdersTable />
                <ProductPopular />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
