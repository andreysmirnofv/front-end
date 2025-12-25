import { useState } from "react";

export function Sidebar() {
  const [isProductsOpen, setIsProductsOpen] = useState(true);

  return (
    <div className="hidden lg:flex w-[279px] h-screen bg-bg-dark-muda flex-col gap-[45px] p-8 fixed left-0 top-0 overflow-y-auto">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-[5px]">
          <svg width="185" height="26" viewBox="0 0 185 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M25.7578 26L33.5901 0H47.7205C50.0352 0.349896 54.4062 2.5677 53.3727 8.63975C52.0807 16.2298 46.5093 20.7516 34.3975 19.1366L32.5404 26H25.7578ZM38.0311 5.40994L35.8509 14.0497H40.8571C42.6605 14.0497 46.3963 13.1938 46.913 9.77019C47.4298 6.34658 45.5673 5.43685 44.5714 5.40994H38.0311Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M24.7081 26L32.2981 0H23.5776L0 26H8.31677L12.4348 21.0745H18.8944L16.5528 26H24.7081ZM22.1242 7.99379L15.1801 16.8758H20.1863L23.9814 7.99379H22.1242Z" fill="white" />
            <path d="M18.6502 20.19L17.8428 20.5938L19.7807 22.7739C20.4912 23.1615 24.76 21.6435 26.8055 20.836L25.7558 24.7925C26.2726 24.7925 26.9401 24.3081 27.2092 24.0658L30.439 19.3018C32.3769 18.4675 36.3496 16.6211 36.7372 15.9105C37.1248 15.2 35.4991 15.1838 34.6378 15.2646C32.7537 16.0989 28.9695 17.7515 28.9049 17.6869C28.8403 17.6223 23.9794 16.2066 21.5571 15.5068C21.4279 15.4422 20.5881 15.8567 20.1844 16.072L25.4328 19.2211L21.1533 21.159C20.9595 20.9006 19.4038 20.4054 18.6502 20.19Z" fill="black" />
            <text fill="white" xmlSpace="preserve" style={{ whiteSpace: 'pre' }} fontFamily="system-ui" fontSize="18" fontWeight="bold" letterSpacing="0em">
              <tspan x="58.5283" y="22.45">AVIAPIC</tspan>
            </text>
          </svg>
        </div>

      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-[10px]">
          <div className="px-2">
            <span className="text-neutral-500 font-machina text-sm">GENERAL</span>
          </div>

          <button className="flex items-center gap-2 px-2 py-2 rounded-lg bg-[#D9EDFF] h-10">
            <span className="font-machina text-sm text-black">Dashboard</span>
          </button>

          <div className="flex flex-col gap-1">
            <button
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              className="flex items-center gap-2 px-2 py-2 rounded-lg h-10 justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="font-machina text-sm text-neutral-300">Товары</span>
              </div>
            </button>

            {isProductsOpen && (
              <div className="flex flex-col pl-6 relative">
                <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-neutral-300 rounded-full h-[155px]">
                  <svg className="absolute left-0 top-[24px]" width="15" height="2" viewBox="0 0 15 2" fill="none">
                    <path d="M1.02412 1C1.0243 1 0.0796485 1 10 1" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <svg className="absolute left-0 top-[68px]" width="15" height="2" viewBox="0 0 15 2" fill="none">
                    <path d="M1.0268 1C1.027 1 -0.0226129 1 11 1" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <svg className="absolute left-0 top-[112px]" width="15" height="2" viewBox="0 0 15 2" fill="none">
                    <path d="M1.02399 1C1.02417 1 0.079271 1 10 1" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <svg className="absolute left-0 top-[156px]" width="15" height="2" viewBox="0 0 15 2" fill="none">
                    <path d="M1.02132 1C1.02148 1 0.181574 1 9 1" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <button className="flex items-center h-10 px-2 rounded-xl">
                  <span className="font-machina text-sm text-neutral-300">Boeing</span>
                </button>
                <button className="flex items-center h-10 px-2 rounded-xl">
                  <span className="font-machina text-sm text-neutral-300">Airbus</span>
                </button>
                <button className="flex items-center h-10 px-2 rounded-xl">
                  <span className="font-machina text-sm text-neutral-300">Embraer</span>
                </button>
                <button className="flex items-center h-10 px-2 rounded-xl">
                  <span className="font-machina text-sm text-neutral-300">SSJ-100</span>
                </button>
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 px-2 py-2 rounded-lg h-10">
            <span className="font-machina text-sm text-neutral-300">Заказы (441)</span>
          </button>

          <button className="flex items-center gap-2 px-2 py-2 rounded-lg h-10">
            <span className="font-machina text-sm text-neutral-300">Клиенты</span>
          </button>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="px-2">
            <span className="text-neutral-500 font-machina text-sm">TOOLS</span>
          </div>

          <button className="flex items-center gap-2 px-2 py-2 rounded-xl h-10">
            <span className="font-machina text-sm text-neutral-300">Account & Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
