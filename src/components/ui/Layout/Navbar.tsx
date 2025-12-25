import { Search, Bell, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="flex flex-col justify-center items-start gap-2.5 self-stretch border-b-2 border-neutral-900 bg-background-dark-muda">
      <div className="flex justify-between items-center self-stretch px-8 py-6 desktop:px-8 mobile:px-4">
        {/* Search */}
        <div className="hidden desktop:flex w-[300px] items-center gap-1 px-3 py-2 rounded-xl border-[1.6px] border-neutral-200">
          <input
            type="text"
            placeholder="Найти товар"
            className="flex-1 bg-transparent text-sm font-neue-machina text-medium-grey outline-none placeholder:text-medium-grey"
          />
          <Search className="w-6 h-6 text-neutral-50" />
        </div>

        {/* Mobile icons */}
        <div className="desktop:hidden flex items-center gap-4 ml-auto">
          <Search className="w-7 h-7 text-neutral-50" />
          <Menu 
            className="w-7 h-7 text-neutral-50 cursor-pointer" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>

        {/* Right content - desktop only */}
        <div className="hidden desktop:flex justify-end items-center gap-4">
          <div className="flex justify-end items-center gap-1 relative">
            <Bell className="w-6 h-6 text-neutral-50" />
            <div className="absolute -top-1 -right-1 bg-primary-accent rounded-sm px-1">
              <span className="text-[8px] font-plus-jakarta font-semibold text-background-dark-tua">
                8
              </span>
            </div>
          </div>
          <div className="w-px h-[34px] bg-neutral-900"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
