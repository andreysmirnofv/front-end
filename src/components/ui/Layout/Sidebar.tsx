import { Link, useLocation } from "react-router-dom";
import { Home, Store, FileText, Users, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [productsOpen, setProductsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden desktop:flex w-[279px] h-screen flex-col gap-[45px] flex-shrink-0 bg-background-dark-tua p-6">
      {/* Logo */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-white font-bold text-lg tracking-wider">
            <span className="text-primary-accent">AP</span> AVIAPIC
          </div>
        </div>
        <button className="text-neutral-50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 3H3C2.175 3 1.5 3.675 1.5 4.5V19.5C1.5 20.325 2.175 21 3 21H21C21.825 21 22.5 20.325 22.5 19.5V4.5C22.5 3.675 21.825 3 21 3ZM7.5 19.5H3V4.5H7.5V19.5ZM21 11.25H13.35L16.05 8.55L15 7.5L10.5 12L15 16.5L16.05 15.45L13.35 12.75H21V19.5H9V4.5H21V11.25Z" fill="#F6F6F6"/>
          </svg>
        </button>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-8">
        {/* GENERAL Section */}
        <div className="flex flex-col gap-2.5">
          <div className="text-neutral-500 text-sm font-neue-machina">GENERAL</div>
          
          <Link
            to="/"
            className={`flex h-10 px-2 items-center gap-2 rounded-lg ${
              isActive("/") ? "bg-cerulean-blue-100" : ""
            }`}
          >
            <Home className={`w-6 h-6 ${isActive("/") ? "text-black" : "text-neutral-300"}`} />
            <span className={`text-sm font-neue-machina ${isActive("/") ? "text-black" : "text-neutral-300"}`}>
              Dashboard
            </span>
          </Link>

          {/* Products with submenu */}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="flex h-10 px-2 items-center gap-2 rounded-lg justify-between"
            >
              <div className="flex items-center gap-2">
                <Store className="w-6 h-6 text-neutral-300" />
                <span className="text-sm font-neue-machina text-neutral-300">Товары</span>
              </div>
              {productsOpen ? (
                <ChevronUp className="w-6 h-6 text-neutral-300" />
              ) : (
                <ChevronDown className="w-6 h-6 text-neutral-300" />
              )}
            </button>

            {productsOpen && (
              <div className="flex flex-col pl-8 relative">
                <div className="absolute left-[18px] top-0 w-0.5 h-full bg-neutral-300 rounded"></div>
                {["Boeing", "Airbus", "Embraer", "SSJ-100"].map((item, idx) => (
                  <Link
                    key={item}
                    to={`/products/${item.toLowerCase()}`}
                    className="flex h-10 px-2 items-center text-sm font-neue-machina text-neutral-300 hover:text-neutral-50 relative"
                  >
                    <div className="absolute left-[-14px] w-3 h-0.5 bg-neutral-300 rounded"></div>
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/orders"
            className={`flex h-10 px-2 items-center gap-2 rounded-lg ${
              isActive("/orders") ? "bg-cerulean-blue-100" : ""
            }`}
          >
            <FileText className={`w-6 h-6 ${isActive("/orders") ? "text-black" : "text-neutral-300"}`} />
            <span className={`text-sm font-neue-machina ${isActive("/orders") ? "text-black" : "text-neutral-300"}`}>
              Заказы (441)
            </span>
          </Link>

          <Link
            to="/customers"
            className={`flex h-10 px-2 items-center gap-2 rounded-lg ${
              isActive("/customers") ? "bg-cerulean-blue-100" : ""
            }`}
          >
            <Users className={`w-6 h-6 ${isActive("/customers") ? "text-black" : "text-neutral-300"}`} />
            <span className={`text-sm font-neue-machina ${isActive("/customers") ? "text-black" : "text-neutral-300"}`}>
              Клиенты
            </span>
          </Link>
        </div>

        {/* TOOLS Section */}
        <div className="flex flex-col gap-2.5">
          <div className="text-neutral-500 text-sm font-neue-machina">TOOLS</div>
          
          <Link
            to="/settings"
            className="flex h-10 px-2 items-center gap-2 rounded-lg"
          >
            <Settings className="w-6 h-6 text-neutral-300" />
            <span className="text-sm font-neue-machina text-neutral-300">
              Account & Settings
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
