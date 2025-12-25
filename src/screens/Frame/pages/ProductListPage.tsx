import {
  Bell,
  ChevronUp,
  ChevronDown,
  Edit3,
  Eye,
  Menu,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../components/ui/header";


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
const categoryTabs = [
  { label: "Boeing", value: "boeing" },
  { label: "Airbus", value: "airbus" },
  { label: "Embraer", value: "embraer" },
  { label: "SSJ-100", value: "ssj-100" },
];

const productData = [
  {
    id: "021231",
    name: "Boeing 773 (Rossiya)",
    price: "$20.00",
    size: "A3S",
    status: "в продаже",
    statusType: "available",
  },
  {
    id: "021231",
    name: "Beigi Coffe (Navy)",
    price: "$20.00",
    size: "A3S",
    status: "в ожидании",
    statusType: "pending",
  },
  {
    id: "021231",
    name: "Story Honzo (Cream)",
    price: "$20.00",
    size: "A3S",
    status: "Available",
    statusType: "available",
  },
  {
    id: "021231",
    name: "Kanky Kitadakate (Green)",
    price: "$20.00",
    size: "A3S",
    status: "Out of Stock",
    statusType: "outOfStock",
  },
  {
    id: "021231",
    name: "Story Honzo (Black)",
    price: "$20.00",
    size: "40",
    status: "Available",
    statusType: "available",
  },
];


export const ProductListPage = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBrand, setCurrentBrand] = useState("boeing");
  const [activeTab, setActiveTab] = useState("Boeing (50)");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedProduct, setExpandedProduct] = useState(null);

  const navigate = useNavigate();

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      setSelectedRows(new Set(productData.map((_, i) => i)));
      setSelectAll(true);
    }
  };

  const handleSelectRow = (index) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
    setSelectAll(newSelected.size === productData.length);
  };

  const filteredProducts = productData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex min-h-screen bg-[#101011]">
      {/* Sidebar Overlay */}
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
              className="justify-start gap-2 h-10 px-2 [font-family:'PPNeueMachina-Regular',Helvetica] text-[#b0b0b0] hover:text-white hover:bg-transparent transition-colors"
            >
              <img className="w-6 h-6" alt="Orders" src="/note-01.svg" />
              <span className="text-sm">Заказы  (441)</span>
            </Button>

            {/* Клиенты */}
            <Button
              onClick={() => navigate("/customers")}
              variant="ghost"
              className="justify-start gap-2 h-10 px-2 [font-family:'PPNeueMachina-Regular',Helvetica] text-[#b0b0b0] hover:text-white hover:bg-transparent transition-colors"
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
      </aside>

      <main className="flex flex-col flex-1 min-w-0">
        {/* Desktop Header */}
        <header className="hidden lg:flex flex-col gap-2.5 px-8 py-6 bg-[#1a1a1b] border-b-2 border-[#3d3d3d]">
          <div className="flex items-center justify-between">
            <div className="relative w-[300px]">
              <Input
                placeholder="Найти товар"
                className="w-full h-10 px-4 rounded-xl border-[1.6px] border-[#d1d1d1] bg-transparent text-[#f6f6f6] text-sm pr-10"
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
            className="p-2 text-white hover:text-[#09b9d9]"
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

        <div className="flex flex-col gap-4 lg:gap-[22px] p-4 lg:p-8">
          {/* Page Title */}
          <div className="flex flex-col gap-2 [font-family:'PPNeueMachina-Regular',Helvetica]">
            <h1 className="text-[#f6f6f6] text-2xl">Товары</h1>
            <nav className="flex items-center gap-1 text-xs lg:text-sm">
              <span className="text-[#b0b0b0]" onClick={() => navigate("/dashboard")}>Dashboard</span>
              <img
                className="w-4 h-4"
                alt="Arrow solid right"
                src="/arrow-solid---right1.svg"
              />
              <span className="text-[#b0b0b0] cursor-pointer hover:text-white" onClick={() => window.location.href = "/products"}>товары</span>
              <img
                className="w-4 h-4"
                alt="Arrow solid right"
                src="/arrow-solid---right1.svg"
              />
              <span className="text-[#09b9d9]">{currentBrand}</span>
            </nav>
          </div>

          <div className="flex flex-col gap-4 lg:gap-6 p-4 lg:p-6 bg-[#1a1a1b] rounded-2xl lg:rounded-3xl border-2 border-[#3d3d3d]">
            {/* Desktop Search & Actions */}
            <div className="hidden lg:flex items-center justify-between">
              <div className="relative w-[500px]">
              <Input
                placeholder="Найти товар"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-10 px-4 rounded-xl border-[1.6px] border-[#d1d1d1] bg-transparent text-[#f6f6f6] placeholder:text-[#949494] text-sm pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#949494]" />
            </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-50">
                  <span className="text-neutral-50 font-neue-machina text-xs">фильтр</span>
                  <img src="/filter-list.svg" alt="Filter" className="w-6 h-6 text-neutral-50" />
                </button>

                <button
                  onClick={() => navigate('/products/add')}
                  className="flex h-10 px-2 justify-center items-center gap-1.5 rounded-xl bg-primary-accent whitespace-nowrap bg-[#09b9d9] text-white hover:bg-[#09b9d9]"
                >
                  <span className="text-sm">Добавить товар</span>
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="lg:hidden flex justify-between items-center px-3 py-2 rounded-xl border border-neutral-200">
              <input
                type="text"
                placeholder="Найти товар"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm font-neue-machina text-medium-grey outline-none placeholder:text-medium-grey"
              />
              <Search className="w-6 h-6 text-neutral-50" />
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-center gap-2 px-3 py-2 bg-[#1a1a1b] rounded-[8px] lg:h-[45px] h-auto border border-[#3d3d3d] overflow-x-auto">
              {categoryTabs.map((tab) => (
                <Button
                  key={tab.label}
                  onClick={() => setCurrentBrand(tab.value)}
                  className={`flex-shrink-0 px-3 py-1 rounded-md [font-family:'PPNeueMachina-Regular',Helvetica] lg:flex-1 lg:h-[29px] w-[77.5px] h-[42px] flex flex-col items-center justify-center gap-0 ${
                    currentBrand === tab.value
                      ? "bg-[#d9edff] text-[#09b9d9] hover:bg-[#d9edff]"
                      : "bg-transparent text-[#b0b0b0] hover:text-white hover:bg-transparent"
                  }`}
                >
                  <span className="text-[13px] leading-[16px] font-medium">
                    {tab.label}
                  </span>
                </Button>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center justify-between">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-50">
                <span className="text-neutral-50 font-neue-machina text-xs">фильтр</span>
                <img src="/filter-list.svg" alt="Filter" className="w-6 h-6 text-neutral-50" />
              </button>

              <button
                onClick={() => navigate('/products/add')}
                className="gap-1.5 px-3 py-2 rounded-xl bg-[#09b9d9] hover:bg-[#09b9d9]/90 text-white flex items-center justify-center"
              >
                <span className="text-sm">Добавить товар</span>
                <Plus className="w-6 h-6" />
              </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block rounded-2xl border border-[#3d3d3d] overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#101011] border-[#3d3d3d] hover:bg-[#101011] h-[50px]">
                    <TableHead className="w-[50px] px-4">
                      <Checkbox
                        checked={selectAll}
                        onCheckedChange={handleSelectAll}
                        className="border-[#F6F6F6] border-[2px] data-[state=checked]:bg-[#09b9d9] data-[state=checked]:border-[#09b9d9]"
                      />
                    </TableHead>
                    <TableHead className="w-[250px] px-2">
                      <span className="flex-1 text-[#f6f6f6] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">Товар</span>
                    </TableHead>
                    <TableHead className="w-[120px] px-2">
                      <span className="flex-1 text-[#f6f6f6] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">Цена</span>
                    </TableHead>
                    <TableHead className="w-[120px] px-2">
                      <span className="flex-1 text-[#f6f6f6] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">Размер</span>
                    </TableHead>
                    <TableHead className="w-[130px] px-2">
                      <span className="flex-1 text-[#f6f6f6] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">Статус</span>
                    </TableHead>
                    <TableHead className="text-right pr-4"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map((product, index) => (
                    <TableRow
                      key={index}
                      className={`h-[66px] border-[#3d3d3d] ${
                        selectedRows.has(startIndex + index)
                          ? "bg-[#09b9d9]/10"
                          : "hover:bg-[#1a1a1b]/50"
                      }`}
                    >
                      <TableCell className="w-12 px-4">
                        <Checkbox
                          checked={selectedRows.has(startIndex + index)}
                          onCheckedChange={() => handleSelectRow(startIndex + index)}
                          className="border-[#F6F6F6] border-[2px] data-[state=checked]:bg-[#09b9d9] data-[state=checked]:border-[#09b9d9]"
                        />
                      </TableCell>

                      <TableCell>
                        <div className="flex items-start gap-2 [font-family:'PPNeueMachina-Regular',Helvetica]">
                          <div className="w-[42px] h-[42px] bg-[#f6f6f6] rounded-md" />
                          <div className="flex flex-col gap-1">
                            <span className="text-[#09b9d9] text-xs">{product.id}</span>
                            <span className="text-[#f6f6f6] text-sm">{product.name}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-[#f6f6f6] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">{product.price}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-[#f6f6f6] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">{product.size}</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`px-2 py-1.5 rounded-lg text-xs [font-family:'PPNeueMachina-Regular',Helvetica] ${
                            product.statusType === "available"
                              ? "bg-[#b2ffb4] text-[#04910c] hover:bg-[#b2ffb4]"
                              : product.statusType === "pending"
                                ? "bg-[#ffdcdc] text-[#ff0000] hover:bg-[#ffdcdc]"
                                : "bg-[#ffdcdc] text-[#ff0000] hover:bg-[#ffdcdc]"
                          }`}
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-4">
                        <div className="flex items-center justify-end gap-4">
                            <button title="Eye" onClick={() => navigate("/products/edit/1")} className="flex items-center gap-1 text-[#b0b0b0] hover:text-white">
                              <img src="/eye-open.svg" alt="" />
                            </button>
                            <button title="Edit" onClick={() => navigate("/products/edit")} className="flex items-center gap-1 text-[#b0b0b0] hover:text-white">
                              <img src="/edit-03.svg" alt="Edit" />
                            </button>
                            <button title="Delete" className="flex items-center gap-1 text-[#b0b0b0] hover:text-white">
                              <img src="/delete-1.svg" alt="" />
                            </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile List */}
            <div className="lg:hidden flex flex-col rounded-2xl border border-[#3d3d3d]">
              <div className="flex items-center gap-1 p-3.5 border-b border-[#3d3d3d]">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                  className="border-[#454545] border-[2px] data-[state=checked]:bg-[#09b9d9] data-[state=checked]:border-[#09b9d9]"
                />
                <span className="flex-1 text-neutral-50 text-sm ml-2 [font-family:'PPNeueMachina-Regular',Helvetica]">Товар</span>
                <div className="flex flex-col w-3 gap-px">
                  <img src="/caret-up.svg" alt="" />
                  <img src="/caret-down.svg" alt="" />
                </div>
              </div>

              {paginatedProducts.map((product, idx) => {
                const filteredIndex = startIndex + idx;
                const isExpanded = expandedProduct === product.id + idx;
                return (
                  <div key={idx} className="border-b border-[#3d3d3d] last:border-b-0">
                    <div
                      className="flex items-start p-3 gap-3 cursor-pointer"
                      onClick={() => setExpandedProduct(isExpanded ? null : product.id + idx)}
                    >
                      <Checkbox
                        checked={selectedRows.has(filteredIndex)}
                        onCheckedChange={() => handleSelectRow(filteredIndex)}
                        className="border-[#454545] border-[2px] data-[state=checked]:bg-[#09b9d9] data-[state=checked]:border-[#09b9d9] mt-1"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="w-[42px] h-[42px] bg-[#f6f6f6] rounded-md flex-shrink-0" />

                      {!isExpanded ? (
                        <div className="flex flex-col items-start gap-1 flex-1 [font-family:'PPNeueMachina-Regular',Helvetica]">
                          <span className="text-[#09b9d9] text-xs">{product.id}</span>
                          <span className="text-neutral-50 text-sm font-semibold">{product.name}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-start gap-3 flex-1 [font-family:'PPNeueMachina-Regular',Helvetica]">
                          <div className="flex flex-col items-start gap-1 w-full">
                            <span className="text-[#09b9d9] text-xs">{product.id}</span>
                            <span className="text-neutral-50 text-sm font-semibold">{product.name}</span>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <div className="flex justify-between items-center">
                              <span className="text-[#b0b0b0] text-sm">Цена</span>
                              <span className="text-neutral-50 text-sm">{product.price}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[#b0b0b0] text-sm">Размер</span>
                              <span className="text-neutral-50 text-sm">{product.size}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[#b0b0b0] text-sm">Статус</span>
                              <Badge
                                className={`px-2 py-1 rounded-lg text-xs ${
                                  product.statusType === "available"
                                    ? "bg-[#b2ffb4] text-[#04910c]"
                                    : "bg-[#ffdcdc] text-[#ff0000]"
                                }`}
                              >
                                {product.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 w-full pt-2">
                            <button title="Eye" onClick={() => navigate("/products/edit/1")} className="flex items-center gap-1 text-[#b0b0b0] hover:text-white">
                              <img src="/eye-open.svg" alt="" />
                            </button>
                            <button title="Edit" onClick={() => navigate("/products/edit")} className="flex items-center gap-1 text-[#b0b0b0] hover:text-white">
                              <img src="/edit-03.svg" alt="Edit" />
                            </button>
                            <button title="Delete" className="flex items-center gap-1 text-[#b0b0b0] hover:text-white">
                              <img src="/delete-1.svg" alt="" />
                            </button>
                          </div>
                        </div>
                      )}
                      <ChevronUp className={`w-4 h-4 text-[#f6f6f6] transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-1 [font-family:'PPNeueMachina-Regular',Helvetica]">
                <span className="text-[#09b9d9] text-sm">{startIndex + 1}</span>
                <span className="text-neutral-500 text-sm">-</span>
                <span className="text-[#b0b0b0] text-sm">{Math.min(startIndex + itemsPerPage, filteredProducts.length)}</span>
                <span className="text-[#b0b0b0] text-sm">из {filteredProducts.length}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-[13px]">
                  <span className="text-[#b0b0b0] text-sm [font-family:'PPNeueMachina-Regular',Helvetica]">Выбрать страницу</span>
                  <Select value={currentPage.toString()} onValueChange={(v) => setCurrentPage(parseInt(v))}>
                    <SelectTrigger className="w-auto h-[29px] gap-0.5 pl-2 pr-1.5 py-1 border-[#b0b0b0] text-[#F6F6F6]">
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
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    className="h-7 w-8 border-[#B0B0B0] bg-transparent text-[#f6f6f6]"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  >
                    <img src="/arrow-back.svg" alt="" />
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