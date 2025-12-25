import { ArrowUpRight } from "lucide-react";

interface Order {
  id: string;
  product: string;
  customer: string;
  price: string;
  date: string;
  status: "processing" | "shipping" | "cancelled";
}

const orders: Order[] = [
  { id: "021231", product: "Kanky Kitadakate (Green)", customer: "Leslie Alexander", price: "$21.78", date: "04/17/23", status: "processing" },
  { id: "021231", product: "Story Honzo (Cream)", customer: "Jenny Wilson", price: "$21.78", date: "04/17/23", status: "shipping" },
  { id: "021231", product: "Story Honzo (Cream)", customer: "Esther Howard", price: "$21.78", date: "04/17/23", status: "shipping" },
  { id: "021231", product: "Kanky Kitadakate (Green)", customer: "Robert Fox", price: "$21.78", date: "04/17/23", status: "cancelled" },
];

const statusStyles = {
  processing: "bg-orange-200 text-orange-600",
  shipping: "bg-violet-200 text-violet-600",
  cancelled: "bg-orange-200 text-orange-600",
};

const statusLabels = {
  processing: "в сборке",
  shipping: "Shipping",
  cancelled: "Cancelled",
};

export function OrdersTable() {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-5 border border-neutral-900 bg-bg-dark-muda rounded-3xl">
      <div className="flex justify-between items-center">
        <h3 className="font-machina text-base text-neutral-50">Заказы</h3>
        <button className="flex items-center gap-1">
          <span className="font-machina text-sm text-neutral-50">все заказы</span>
          <ArrowUpRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="border border-neutral-900/75 rounded-2xl overflow-hidden">
        <div className="hidden lg:block overflow-x-auto">
          {orders.map((order, index) => (
            <div 
              key={index} 
              className="flex items-center px-3 py-1.5 border-b border-neutral-900/75 last:border-b-0"
            >
              <div className="flex items-start gap-2 w-[250px] p-3">
                <div className="w-[42px] h-[42px] bg-neutral-50 rounded flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="font-jakarta text-xs text-accent-cyan">{order.id}</span>
                  <span className="font-manrope text-sm font-semibold text-neutral-50">{order.product}</span>
                </div>
              </div>
              
              <div className="w-[130px] p-3">
                <span className="font-manrope text-sm font-semibold text-neutral-50">{order.customer}</span>
              </div>
              
              <div className="w-[120px] p-3">
                <span className="font-manrope text-sm font-semibold text-neutral-50">{order.price}</span>
              </div>
              
              <div className="w-[120px] p-3">
                <span className="font-machina text-sm text-neutral-50">{order.date}</span>
              </div>
              
              <div className="flex-1 flex justify-end p-3">
                <div className={`px-3 py-1.5 rounded-lg ${statusStyles[order.status]}`}>
                  <span className="font-machina text-xs">{statusLabels[order.status]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:hidden flex flex-col">
          {orders.map((order, index) => (
            <div 
              key={index}
              className="p-4 border-b border-neutral-900 last:border-b-0 flex flex-col gap-3"
            >
              <div className="flex items-start gap-2">
                <div className="w-[42px] h-[42px] bg-neutral-50 rounded flex-shrink-0" />
                <div className="flex-1 flex flex-col gap-1">
                  <span className="font-jakarta text-xs text-accent-cyan">{order.id}</span>
                  <span className="font-manrope text-sm font-semibold text-neutral-50">{order.product}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex flex-col gap-1">
                  <span className="font-machina text-xs text-neutral-300">Customer</span>
                  <span className="font-manrope font-semibold text-neutral-50">{order.customer}</span>
                </div>
                <div className={`px-3 py-1.5 rounded-lg ${statusStyles[order.status]}`}>
                  <span className="font-machina text-xs">{statusLabels[order.status]}</span>
                </div>
              </div>
              
              <div className="flex gap-4 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="font-machina text-xs text-neutral-300">Price</span>
                  <span className="font-manrope font-semibold text-neutral-50">{order.price}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-machina text-xs text-neutral-300">Date</span>
                  <span className="font-machina text-neutral-50">{order.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
