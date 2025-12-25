import {
  BellIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
  MenuIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
import Header from "../../../components/ui/header";
import { useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

const sidebarSubItems = [
  { label: "Boeing", slug: "boeing" },
  { label: "Airbus", slug: "airbus" },
  { label: "Embraer", slug: "embraer" },
  { label: "SSJ-100", slug: "ssj-100" },
];


const customerData = [
  {
    id: "ID 12451",
    name: "Leslie Alexander",
    email: "georgia@examp....",
    phone: "+62 819 1314 1435",
    amount: "$21.78",
    orders: "30 заказов",
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
  },
  {
    id: "ID 12452",
    name: "Guy Hawkins",
    email: "guys@examp.com",
    phone: "+62 819 1314 1435",
    amount: "$21.78",
    orders: "30 заказов",
    address: "4517 Washington Ave. Manchester, Kentucky 39495",
  },
  {
    id: "ID 12453",
    name: "Kristin Watson",
    email: "kristin@examp....",
    phone: "+62 819 1314 1435",
    amount: "$21.78",
    orders: "30 заказов",
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
  },
  {
    id: "ID 12453",
    name: "Kristin Watson",
    email: "kristin@examp....",
    phone: "+62 819 1314 1435",
    amount: "$21.78",
    orders: "30 заказов",
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
  },
  {
    id: "ID 12452",
    name: "Guy Hawkins",
    email: "guys@examp.com",
    phone: "+62 819 1314 1435",
    amount: "$21.78",
    orders: "30 заказов",
    address: "4517 Washington Ave. Manchester, Kentucky 39495",
  },
  {
    id: "ID 12451",
    name: "Leslie Alexander",
    email: "georgia@examp....",
    phone: "+62 819 1314 1435",
    amount: "$21.78",
    orders: "30 Order",
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
  },
  {
    id: "ID 12453",
    name: "Kristin Watson",
    email: "kristin@examp....",
    phone: "+62 819 1314 1435",
    amount: "$21.78",
    orders: "30 Order",
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
  },
];

export const CustomerManagementPage = (): JSX.Element => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      setSelectedRows(new Set(customerData.map((_, i) => i)));
      setSelectAll(true);
    }
  };

  const handleSelectRow = (index: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
    setSelectAll(newSelected.size === customerData.length);
  };

  const filteredCustomers = customerData.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const navigate = useNavigate();

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex w-full min-h-screen bg-[#101011]">
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
              className="justify-start gap-2 h-10 px-2 [font-family:'PPNeueMachina-Regular',Helvetica] text-[#b0b0b0] hover:text-white hover:bg-transparent transition-colors"
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
              className="justify-start gap-2 h-10 px-2 [font-family:'PPNeueMachina-Regular',Helvetica] text-black bg-[#d9edff] hover:bg-[#d9edff] transition-colors"
            >
              <img className="w-6 h-6" alt="Clients" src="/user-group1.svg" />
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

      <main className="flex flex-col flex-1">
        {/* Desktop Header */}
        <header className="hidden lg:flex flex-col gap-2.5 px-8 py-6 bg-[#1a1a1b] border-b-2 border-[#3d3d3d]">
          <div className="flex items-center justify-between">
            <div className="relative w-[300px]">
              <Input
                placeholder="Найти товар"
                className="w-full h-10 px-4 rounded-xl border-[1.6px] border-[#d1d1d1] bg-transparent text-[#949494] placeholder:text-[#949494] [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-sm pr-10"
              />
              <img
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6"
                alt="Line"
                src="/search.svg"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="relative p-1.5 bg-[#3d3d3d] rounded-[9px] cursor-pointer hover:bg-[#4d4d4d] transition-colors">
                <BellIcon className="w-6 h-6 text-white" />
                <div className="absolute top-1 left-[19px] bg-[#ec4747] rounded-sm px-1 pt-px pb-0.5">
                  <div className="[font-family:'PlusJakartaSans',Helvetica] font-semibold text-[#0c0c0c] text-[8px] leading-[8.8px]">
                    8
                  </div>
                </div>
              </div>
              <img className="w-px h-[34px]" alt="Line" src="/line-1-1.svg" />
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-4 bg-[#1a1a1b]">
          <button
            title="Menu"
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-white hover:text-[#09b9d9] transition-colors"
          >
            <MenuIcon className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4">
            <SearchIcon className="w-6 h-6 text-white cursor-pointer" />
            <div className="relative p-1.5 bg-[#3d3d3d] rounded-[9px] cursor-pointer">
              <BellIcon className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 bg-[#ec4747] rounded-full w-4 h-4 flex items-center justify-center">
                <span className="text-[#0c0c0c] text-[8px] font-semibold">8</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-[22px] p-4 lg:p-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-[#f6f6f6] text-2xl [font-family:'PPNeueMachina-Regular',Helvetica]">
              <span className="hidden lg:inline">Клиенты</span>
              <span className="lg:hidden">Customers</span>
            </h1>
            <div className="flex items-center gap-1">
              <span className="text-[#b0b0b0] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]" onClick={() => navigate("/dashboard")}>
                Dashboard
              </span>
              <img
                className="w-4 h-4"
                alt="Arrow solid right"
                src="/arrow-solid---right1.svg"
              />
              <span className="text-[#09b9d9] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">
                <span className="hidden lg:inline">клиенты</span>
                <span className="lg:hidden">Customers</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6 p-4 lg:p-6 bg-[#1a1a1b] rounded-3xl border-2 border-[#3d3d3d]">
            <div className="relative w-full lg:w-[500px]">
              <Input
                placeholder="Найти клиента"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-10 px-4 rounded-xl border-[1.6px] border-[#d1d1d1] bg-transparent text-[#f6f6f6] [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-sm pr-10 placeholder:text-[#949494]"
              />
              <img
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6"
                alt="Line"
                src="/search.svg"
              />
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block rounded-2xl border border-[#3d3d3d] overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#101011] border-[#3d3d3d] hover:bg-[#101011] h-[49px]">
                    <TableHead className="w-[48px] px-4">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectAll}
                          onCheckedChange={handleSelectAll}
                          className="border-[#d1d1d1] border-[2px] data-[state=checked]:bg-[#09b9d9] data-[state=checked]:border-[#09b9d9]"
                        />
                      </div>
                    </TableHead>

                    <TableHead className="max-w-[200px] px-4">
                      <div className="flex items-center gap-1">
                        <span className="flex-1 [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm">
                          Имя клиента
                        </span>
                        <div className="flex flex-col w-[11px] gap-[1px]">
                          <img className="w-[11px] h-[5px] cursor-pointer hover:opacity-70" alt="Up Icon" src="/caret-up.svg" />
                          <img className="w-[11px] h-[5px] cursor-pointer hover:opacity-70" alt="Down Icon" src="/caret-down.svg" />
                        </div>
                      </div>
                    </TableHead>

                    <TableHead className="max-w-[160px] px-4">
                      <div className="flex items-center gap-1">
                        <span className="flex-1 [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm">
                          Контакт
                        </span>
                        <div className="flex flex-col w-[11px] gap-[1px]">
                          <img className="w-[11px] h-[5px] cursor-pointer hover:opacity-70" alt="Up Icon" src="/caret-up.svg" />
                          <img className="w-[11px] h-[5px] cursor-pointer hover:opacity-70" alt="Down Icon" src="/caret-down.svg" />
                        </div>
                      </div>
                    </TableHead>

                    <TableHead className="w-[150px] px-4">
                      <div className="flex items-center gap-1">
                        <span className="flex-1 [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm">
                          Сумма
                        </span>
                        <div className="flex flex-col w-[11px] gap-[1px]">
                          <img className="w-[11px] h-[5px] cursor-pointer hover:opacity-70" alt="Up Icon" src="/caret-up.svg" />
                          <img className="w-[11px] h-[5px] cursor-pointer hover:opacity-70" alt="Down Icon" src="/caret-down.svg" />
                        </div>
                      </div>
                    </TableHead>

                    <TableHead className="w-[120px] px-4">
                      <div className="flex items-center gap-1">
                        <span className="flex-1 [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm">
                          Кол-во
                        </span>
                        <div className="flex flex-col w-[11px] gap-[1px]">
                          <img className="w-[11px] h-[5px] cursor-pointer hover:opacity-70" alt="Up Icon" src="/caret-up.svg" />
                          <img className="w-[11px] h-[5px] cursor-pointer hover:opacity-70" alt="Down Icon" src="/caret-down.svg" />
                        </div>
                      </div>
                    </TableHead>

                    <TableHead className="w-[370px] px-4">
                      <div className="flex items-center gap-1">
                        <span className="flex-1 text-[#f6f6f6] [font-family:'PPNeueMachina-Regular',Helvetica]">
                          Адрес
                        </span>
                        <div className="flex flex-col w-[11px] gap-[1px]">
                          <img className="w-[11px] h-[5px] cursor-pointer hover:opacity-70" alt="Up Icon" src="/caret-up.svg" />
                          <img className="w-[11px] h-[5px] cursor-pointer hover:opacity-70" alt="Down Icon" src="/caret-down.svg" />
                        </div>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedCustomers.map((customer, index) => (
                    <TableRow
                      key={index}
                      className={`h-[72px] border-[#3d3d3d] transition-colors ${
                        selectedRows.has(startIndex + index)
                          ? "bg-[#09b9d9]/10"
                          : "hover:bg-[#1a1a1b]/50"
                      }`}
                    >
                      <TableCell className="w-12 px-4">
                        <div className="flex items-center justify-center h-full">
                          <Checkbox
                            checked={selectedRows.has(startIndex + index)}
                            onCheckedChange={() =>
                              handleSelectRow(startIndex + index)
                            }
                            className="border-[#d1d1d1] border-[2px] data-[state=checked]:bg-[#09b9d9] data-[state=checked]:border-[#09b9d9]"
                          />
                        </div>
                      </TableCell>

                      <TableCell className="w-[200px] px-4">
                        <div className="flex flex-col justify-center h-full gap-1">
                          <span className="text-[#09b9d9] text-xs [font-family:'PPNeueMachina-Regular',Helvetica]">
                            {customer.id}
                          </span>
                          <span className="text-[#f6f6f6] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">
                            {customer.name}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="max-w-[160px] px-4">
                        <div className="flex flex-col justify-center h-full gap-1">
                          <div className="text-[#f6f6f6] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">
                            {customer.email}
                          </div>
                          <div className="text-[#f6f6f6] text-xs [font-family:'PPNeueMachina-Regular',Helvetica]">
                            {customer.phone}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="max-w-[150px] px-4">
                        <div className="flex items-center h-full">
                          <span className="text-[#f6f6f6] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">
                            {customer.amount}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="w-[120px] px-4">
                        <div className="flex items-center h-full">
                          <span className="text-[#f6f6f6] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">
                            {customer.orders}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="px-[12px]">
                        <div className="flex items-center h-full">
                          <span className="text-[#f6f6f6] text-sm [font-family:'PPNeueMachina-Regular',Helvetica] line-clamp-1">
                            {customer.address}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile List */}
            <div className="lg:hidden flex flex-col items-start self-stretch rounded-2xl border border-[#3d3d3d] overflow-hidden">
              <div className="flex items-center gap-1 self-stretch p-3.5 border-b border-[#3d3d3d]">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                  className="border-[#d1d1d1] border-[2px] data-[state=checked]:bg-[#09b9d9] data-[state=checked]:border-[#09b9d9]"
                />
                <span className="flex-1 text-neutral-50 font-montserrat text-sm font-medium ml-2">Имя клиента</span>
                <div className="flex flex-col w-[11px] justify-center items-start gap-px">
                  <img src="/caret-up.svg" alt="" />
                  <img src="/caret-down.svg" alt="" />
                </div>
              </div>

              {paginatedCustomers.map((customer, idx) => {
                const isExpanded = expandedCustomer === customer.id + idx;
                return (
                  <div key={idx} className="flex items-start self-stretch border-b border-[#3d3d3d] last:border-b-0 p-3 gap-3">
                    <Checkbox
                      checked={selectedRows.has(startIndex + idx)}
                      onCheckedChange={() => handleSelectRow(startIndex + idx)}
                      className="border-[#d1d1d1] border-[2px] data-[state=checked]:bg-[#09b9d9] data-[state=checked]:border-[#09b9d9] flex-shrink-0"
                    />
                    <div className="flex flex-col items-start gap-3 flex-1">
                      {isExpanded ? (
                        <>
                          <div className="flex flex-col items-start gap-1">
                            <span className="text-[#09b9d9] font-plus-jakarta text-xs">{customer.id}</span>
                            <span className="text-neutral-50 font-manrope text-sm">{customer.name}</span>
                          </div>
                          <div className="grid grid-cols-[90px_1fr] gap-y-1 w-full">
                            <span className="text-[#B0B0B0] text-sm opacity-70">
                              Contact
                            </span>
                            <div className="flex flex-col gap-1">
                              <span className="text-neutral-50 text-sm">{customer.email}</span>
                              <span className="text-neutral-50 text-sm">{customer.phone}</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-[90px_1fr] w-full">
                            <span className="text-[#B0B0B0] [font-family:'PPNeueMachina-Regular',Helvetica] text-sm">Purchases</span>
                            <span className="text-neutral-50 [font-family:'PPNeueMachina-Regular',Helvetica] text-sm">{customer.amount}</span>
                          </div>
                          <div className="grid grid-cols-[90px_1fr] w-full">
                            <span className="text-[#B0B0B0] [font-family:'PPNeueMachina-Regular',Helvetica] text-sm">Order</span>
                            <span className="text-neutral-50 [font-family:'PPNeueMachina-Regular',Helvetica] text-sm">{customer.orders}</span>
                          </div>
                          <div className="grid grid-cols-[90px_1fr] w-full">
                            <span className="text-[#B0B0B0] [font-family:'PPNeueMachina-Regular',Helvetica] text-sm">Address</span>
                            <span className="text-neutral-50 [font-family:'PPNeueMachina-Regular',Helvetica] text-sm">{customer.address}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-start gap-1">
                          <span className="text-[#09b9d9] font-plus-jakarta text-xs">{customer.id}</span>
                          <span className="text-neutral-50 font-manrope text-sm ">{customer.name}</span>
                        </div>
                      )}
                    </div>
                    <button
                      title="Down"
                      onClick={() => setExpandedCustomer(isExpanded ? null : customer.id + idx)}
                      className="flex items-start p-1 rounded-lg bg-[#3d3d3d]"
                    >
                      <ChevronDownIcon className={`w-5 h-5 text-neutral-50 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-[3px]">
                <span className="text-[#09b9d9] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">
                  {startIndex + 1}
                </span>
                <span className="text-neutral-500 text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">
                  -
                </span>
                <span className="text-[#b0b0b0] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">
                  {Math.min(startIndex + itemsPerPage, filteredCustomers.length)}
                </span>
                <span className="text-[#b0b0b0] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">
                  из {filteredCustomers.length}
                </span>
              </div>

              <div className="flex items-start lg:items-center gap-4 w-full lg:w-auto justify-between lg:justify-start">
                <div className="flex items-center gap-[13px]">
                  <span className="text-[#b0b0b0] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">
                    Выбрать страницу
                  </span>
                  <Select
                    value={currentPage.toString()}
                    onValueChange={(value) => setCurrentPage(parseInt(value))}
                  >
                    <SelectTrigger className="w-auto h-[29px] gap-0.5 pl-2 pr-1.5 py-1 border-[#b0b0b0] text-[#F6F6F6] [font-family:'Inter',Helvetica]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-1.5">
                  <Button variant="outline" size="icon" disabled={currentPage === 1} className="
                    h-7 w-8 border-[#B0B0B0] bg-transparent text-[#f6f6f6] disabled:opacity-100 disabled:text-[#6a6a6a] disabled:hover:bg-transparent disabled:hover:text-[#6a6a6a]"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  >
                    <img className="h-5 w-5" alt='Arrow Back' src='/arrow-back-simple.svg'/>
                  </Button>
                  <Button variant="outline" size="icon" disabled={currentPage === totalPages} className="
                    h-7 w-8 border-[#B0B0B0] bg-transparent text-[#f6f6f6] disabled:opacity-100 disabled:hover:bg-transparent disabled:hover:text-[#6a6a6a]"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  >
                    <img className="h-5 w-5" alt='Arrow Forward' src='/arrow-forward-simple.svg'/>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};