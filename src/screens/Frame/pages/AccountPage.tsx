import {
  Bell,
  ChevronUp,
  Menu,
  Search,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import Header from "../../../components/ui/header";

const sidebarSubItems = [
  { label: "Boeing", slug: "boeing" },
  { label: "Airbus", slug: "airbus" },
  { label: "Embraer", slug: "embraer" },
  { label: "SSJ-100", slug: "ssj-100" },
];

const breadcrumbItems = [
  { label: "Dashboard", path: "/dashboard", active: false },
  { label: "Profile", active: true },
];


export const AccountPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#101011]">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col w-[279px] gap-[45px] px-4 py-8 bg-[#1a1a1b]`}>
        <Header/>

        <nav className="flex flex-col gap-8">
          <div className="flex flex-col gap-2.5">
            <div className="px-2">
              <span className="text-neutral-500 text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">
                GENERAL
              </span>
            </div>

            {/* Dashboard */}
            <Button
              onClick={() => {
                navigate('/dashboard');
                setIsSidebarOpen(false);
              }}
              variant="ghost"
              className={`justify-start gap-2 h-10 px-2 [font-family:'PPNeueMachina-Regular',Helvetica] transition-colors ${
                location.pathname === '/dashboard'
                  ? 'text-black bg-[#d9edff] hover:bg-[#d9edff]'
                  : 'text-[#b0b0b0] hover:text-white hover:bg-transparent'
              }`}
            >
              <img className="w-6 h-6" alt="Dashboard" src="/home-2.svg" />
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
                <ChevronUp className={`w-6 h-6 transition-transform ${isSubmenuOpen ? "rotate-0" : "rotate-180"}`} />
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
              onClick={() => {
                navigate('/orders');
                setIsSidebarOpen(false);
              }}
              variant="ghost"
              className={`justify-start gap-2 h-10 px-2 [font-family:'PPNeueMachina-Regular',Helvetica] transition-colors ${
                location.pathname === '/orders'
                  ? 'text-black bg-[#d9edff] hover:bg-[#d9edff]'
                  : 'text-[#b0b0b0] hover:text-white hover:bg-transparent'
              }`}
            >
              <img className="w-6 h-6" alt="Orders" src="/note-01.svg" />
              <span className="text-sm">Заказы (441)</span>
            </Button>

            {/* Клиенты */}
            <Button
              onClick={() => {
                navigate('/customers');
                setIsSidebarOpen(false);
              }}
              variant="ghost"
              className={`justify-start gap-2 h-10 px-2 [font-family:'PPNeueMachina-Regular',Helvetica] transition-colors ${
                location.pathname === '/customers'
                  ? 'text-black bg-[#d9edff] hover:bg-[#d9edff]'
                  : 'text-[#b0b0b0] hover:text-white hover:bg-transparent'
              }`}
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
              onClick={() => {
                navigate('/account');
                setIsSidebarOpen(false);
              }}
              variant="ghost"
              className={`justify-start gap-2 h-10 px-2 [font-family:'PPNeueMachina-Regular',Helvetica] transition-colors ${
                location.pathname === '/account'
                  ? 'text-black bg-[#d9edff] hover:bg-[#d9edff]'
                  : 'text-[#b0b0b0] hover:text-white hover:bg-transparent'
              }`}
            >
              <img className="w-6 h-6" alt="Settings" src="/settings-1.svg" />
              <span className="text-sm">Account & Settings</span>
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex flex-col flex-1 min-w-0">
        {/* Desktop Header */}
        <header className="hidden lg:flex flex-col gap-2.5 px-8 py-6 bg-[#1a1a1b] border-b-2 border-[#3d3d3d]">
          <div className="flex items-center justify-between">
            <div className="relative w-[300px]">
              <Input
                placeholder="Найти товар"
                className="w-full h-10 px-4 rounded-xl border-[1.6px] border-[#d1d1d1] bg-transparent text-[#949494] font-normal text-sm pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#949494]" />
            </div>

            <div className="flex items-center gap-4">
              <div className="relative p-1.5 bg-[#3d3d3d] rounded-[9px] cursor-pointer hover:bg-[#4d4d4d] transition-colors">
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

        {/* Main Content */}
        <div className="flex flex-col gap-[22px] p-4 lg:p-8 w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-[#f6f6f6] text-2xl leading-[31.2px] [font-family:'PPNeueMachina-Regular',Helvetica] whitespace-nowrap">
              Account & Settings
            </h1>

            <nav className="inline-flex items-center gap-1 flex-wrap">
              {breadcrumbItems.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div className={`text-sm ${item.active ? "text-[#09b9d9]" : "text-[#b0b0b0]"}`}   onClick={() => navigate(item.path)}>
                    {item.label}
                  </div>
                  {index < breadcrumbItems.length - 1 && (
                    <img
                      className="w-4 h-4 mx-1 inline-block"
                      alt="Arrow"
                      src="/arrow-solid---right1.svg"
                    />
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 px-2 py-2 bg-[#1a1a1b] rounded-[8px] border border-[#3d3d3d] overflow-x-auto">
            <button
              onClick={() => setActiveTab("account")}
              className={`flex-shrink-0 flex-1 min-w-[90px] py-1 rounded-md [font-family:'PPNeueMachina-Regular',Helvetica] flex items-center justify-center text-sm sm:text-base ${
                activeTab === "account"
                  ? "bg-[#d9edff] text-[#09b9d9]"
                  : "bg-[#1a1a1b] text-[#b0b0b0] hover:text-white"
              }`}
            >
              Account
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex-shrink-0 flex-1 min-w-[90px] py-1 rounded-md [font-family:'PPNeueMachina-Regular',Helvetica] flex items-center justify-center text-sm sm:text-base ${
                activeTab === "security"
                  ? "bg-[#d9edff] text-[#09b9d9]"
                  : "bg-[#1a1a1b] text-[#b0b0b0] hover:text-white"
              }`}
            >
              Security
            </button>
          </div>

          {/* Profile Information Card - Account Tab */}
          {activeTab === "account" && (
            <Card className="w-full bg-[#1a1a1b] rounded-2xl lg:rounded-3xl border-2 border-[#3d3d3d]">
              <CardContent className="flex flex-col gap-6 p-4 lg:p-6">
                <h2 className="text-[#f6f6f6] text-lg lg:text-[22px] [font-family:'PPNeueMachina-Regular',Helvetica]">Profile Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 [font-family:'PPNeueMachina-Regular',Helvetica]">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[#f6f6f6] text-sm">First Name</Label>
                    <Input
                      defaultValue="Cameron"
                      className="h-[52px] px-4 py-2 border-[1.6px] border-[#d1d1d1] rounded-xl bg-transparent text-[#f6f6f6] text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[#f6f6f6] text-sm">Last Name</Label>
                    <Input
                      defaultValue="Williamson"
                      className="h-[52px] px-4 py-2 border-[1.6px] border-[#d1d1d1] rounded-xl bg-transparent text-[#f6f6f6] text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[#f6f6f6] text-sm">Email</Label>
                    <Input
                      defaultValue="cameron@example.com"
                      className="h-[52px] px-4 py-2 border-[1.6px] border-[#d1d1d1] rounded-xl bg-transparent text-neutral-500 text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[#f6f6f6] text-sm">Gender</Label>
                    <Input
                      defaultValue="Male"
                      className="h-[52px] px-4 py-2 border-[1.6px] border-[#d1d1d1] rounded-xl bg-transparent text-neutral-500 text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 md:col-span-2 lg:col-span-1">
                    <Label className="text-[#f6f6f6] text-sm">Date Birthday</Label>
                    <Input
                      defaultValue="23 December 2003"
                      className="h-[52px] px-4 py-2 border-[1.6px] border-[#d1d1d1] rounded-xl bg-transparent text-neutral-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-3 pt-2">
                  <Button className="flex-1 md:flex-none px-6 py-3 bg-[#09b9d9] rounded-xl hover:bg-[#08a5c2] text-white text-sm h-[45px] [font-family:'PPNeueMachina-Regular',Helvetica]">
                    Update
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="flex-1 md:flex-none px-6 underline py-3 rounded-xl text-[#09b9d9] hover:bg-transparent hover:text-[#09b9d9] h-[45px] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Password Card - Security Tab */}
          {activeTab === "security" && (
            <Card className="w-full bg-[#1a1a1b] rounded-2xl lg:rounded-3xl border-2 border-[#3d3d3d]">
              <CardContent className="flex flex-col gap-6 p-4 lg:p-6">
                <h2 className="text-[#f6f6f6] text-lg lg:text-[22px] [font-family:'PPNeueMachina-Regular',Helvetica]">Password</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 [font-family:'PPNeueMachina-Regular',Helvetica]">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[#f6f6f6] text-sm">Old Password</Label>
                    <div className="relative">
                      <Input
                        type={showOldPassword ? "text" : "password"}
                        defaultValue="••••••••••••"
                        className="h-[52px] px-4 py-2 border-[1.6px] border-[#d1d1d1] rounded-xl bg-transparent text-[#f6f6f6] text-sm pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b0b0b0] hover:text-[#f6f6f6]"
                      >
                        {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[#f6f6f6] text-sm">New Password</Label>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        defaultValue="••••••••••••"
                        className="h-[52px] px-4 py-2 border-[1.6px] border-[#d1d1d1] rounded-xl bg-transparent text-[#f6f6f6] text-sm pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b0b0b0] hover:text-[#f6f6f6]"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[#f6f6f6] text-sm">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="@(uyed)Y4n"
                        className="h-[52px] px-4 py-2 border-[1.6px] border-[#d1d1d1] rounded-xl bg-transparent text-[#f6f6f6] text-sm pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b0b0b0] hover:text-[#f6f6f6]"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-3 pt-2">
                  <Button className="flex-1 md:flex-none px-6 py-3 bg-[#09b9d9] rounded-xl hover:bg-[#08a5c2] text-white text-sm h-[45px] [font-family:'PPNeueMachina-Regular',Helvetica]">
                    Update Password
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="flex-1 md:flex-none px-6 underline py-3 rounded-xl text-[#09b9d9] hover:bg-transparent hover:text-[#09b9d9] h-[45px] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};