import { ArrowUpRight, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: string;
  sales: string;
  status: string;
}

const products: Product[] = [
  { id: "021231", name: "Kanky Kitadakate (Green)", price: "$32,032", sales: "3000", status: "Success" },
  { id: "021231", name: "Kanky Kitadakate (Green)", price: "$32,032", sales: "3000", status: "Success" },
  { id: "021231", name: "Kanky Kitadakate (Green)", price: "$32,032", sales: "3000", status: "Success" },
  { id: "021231", name: "Kanky Kitadakate (Green)", price: "$32,032", sales: "3000", status: "Success" },
];

export function ProductPopular() {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-5 border border-neutral-900 bg-bg-dark-muda rounded-3xl lg:hidden">
      <div className="flex justify-between items-center">
        <h3 className="font-machina text-base text-neutral-50">Product Popular</h3>
        <button className="flex items-center gap-1">
          <span className="font-machina text-sm text-neutral-50">все заказы</span>
          <ArrowUpRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="border border-neutral-900 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-bg-dark rounded-t-2xl border-b border-neutral-900">
          <span className="font-machina text-base text-neutral-50">Заказы</span>
          <div className="flex flex-col gap-0.5">
            <ChevronUp className="w-[11px] h-[11px] text-[#A9A9A9]" />
            <ChevronDown className="w-[11px] h-[11px] text-[#A9A9A9]" />
          </div>
        </div>

        {products.map((product, index) => (
          <div key={index} className="border-b border-neutral-900 last:border-b-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-start gap-2 flex-1">
                <div className="w-[41px] h-[41px] bg-neutral-50 rounded-md flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="font-jakarta text-xs text-accent-cyan">{product.id}</span>
                  <span className="font-manrope text-sm font-semibold text-neutral-50">{product.name}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                className="flex items-center justify-center p-1.5 rounded-lg border border-neutral-900 bg-neutral-900"
              >
                {expandedIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-neutral-50" strokeWidth={2} />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-50" strokeWidth={2} />
                )}
              </button>
            </div>

            {expandedIndex === index && (
              <div className="px-4 pb-4 flex flex-col gap-3">
                <div className="flex items-center gap-5">
                  <span className="font-jakarta text-xs text-neutral-300">Price</span>
                  <span className="font-machina text-sm text-neutral-50">{product.price}</span>
                </div>
                <div className="flex items-center gap-5">
                  <span className="font-jakarta text-xs text-neutral-300">Sales</span>
                  <span className="font-machina text-sm text-neutral-50">{product.sales}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-jakarta text-xs text-neutral-300">Status</span>
                  <div className="px-2 py-1.5 rounded-xl bg-lime-100">
                    <span className="font-machina text-xs text-success">{product.status}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
