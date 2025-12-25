import {
  BellIcon,
  ChevronUpIcon,
  FileTextIcon,
  HomeIcon,
  ImageIcon,
  SearchIcon,
  SettingsIcon,
  StoreIcon,
  UsersIcon,
  XIcon,
  MenuIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import Header from "../../../components/ui/header";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const sidebarSubItems = [
  { label: "Boeing" },
  { label: "Airbus" },
  { label: "Embraer" },
  { label: "SSJ-100" },
];

const photoPlaceholders = [
  { id: 1, label: "Photo 1" },
  { id: 2, label: "Photo 2" },
  { id: 3, label: "Photo 3" },
  { id: 4, label: "Photo 4" },
];

export const AddProductPage = (): JSX.Element => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentBrand = searchParams.get('brand') || 'boeing';

  const breadcrumbItems = [
    { label: "Dashboard", active: false, path: "/dashboard" },
    { label: "товары", active: false, path: `/products?brand=${currentBrand}` },
    { label: currentBrand, active: false, path: `/products?brand=${currentBrand}` },
    { label: "добавить товар", active: true, path: null },
  ];

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
        <Header onClose={() => setIsSidebarOpen(false)} />

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
                      setIsSidebarOpen(false);
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
              className="justify-start gap-2 h-10 px-2 [font-family:'PPNeueMachina-Regular',Helvetica] text-black bg-[#d9edff] hover:bg-[#d9edff] transition-colors"
            >
              <img className="w-6 h-6" alt="Orders" src="/note-02.svg" />
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

      <main className="flex flex-col items-center flex-1">
        <header className="flex flex-col items-start justify-center gap-2.5 px-4 lg:px-8 py-6 w-full bg-[#1a1a1b] border-b border-[#3d3d3d]">
          <div className="flex items-center justify-between w-full gap-4">
            {/* Burger Menu Button - Mobile Only */}
            <button
              title="Menu"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-white hover:text-[#09b9d9] transition-colors"
            >
              <MenuIcon className="w-6 h-6" />
            </button>

            <div className="relative flex-1 lg:flex-none lg:w-[300px]">
              <Input
                placeholder="Найти товар"
                className="w-full h-10 px-4 rounded-xl border-[1.6px] border-[#d1d1d1] bg-transparent text-[#949494] [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-sm pr-10"
              />
              <img className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#949494]" alt="Line" src="/search.svg" />
            </div>

            <div className="inline-flex items-center justify-end gap-4">
              <div className="inline-flex items-center justify-end gap-1 p-1.5 bg-[#3d3d3d] rounded-[9px] relative cursor-pointer hover:bg-[#4d4d4d] transition-colors">
                <BellIcon className="w-6 h-6 text-white" />
                <div className="inline-flex flex-col items-center gap-1 pt-px pb-0.5 px-1 absolute top-1 left-[19px] bg-[#ec4747] rounded-sm">
                  <div className="flex items-center justify-center [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#0c0c0c] text-[8px] tracking-[0] leading-[8.8px] whitespace-nowrap">
                    8
                  </div>
                </div>
              </div>
              <img className="hidden lg:block w-px h-[34px]" alt="Line" src="/line-1-1.svg" />
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-[22px] p-4 lg:p-8 w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-[#f6f6f6] text-2xl leading-[31.2px] [font-family:'PPNeueMachina-Regular',Helvetica] font-normal tracking-[0] whitespace-nowrap">
              Товары
            </h1>

            <nav className="inline-flex items-center gap-1 flex-wrap">
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    onClick={() => !item.active && item.path && navigate(item.path)}
                    className={`items-center justify-center [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-sm tracking-[0] leading-[21px] whitespace-nowrap flex ${
                      item.active 
                        ? "text-[#09b9d9]" 
                        : "text-[#b0b0b0] cursor-pointer transition-colors"
                    }`}
                  >
                    {item.label}
                  </div>
                  {index < breadcrumbItems.length - 1 && (
                    <img
                      className="w-4 h-4 mx-1 inline-block"
                      alt="Arrow"
                      src="/arrow-solid---right1.svg"
                    />
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-[22px] w-full">
            <Card className="w-full lg:w-[600px] bg-[#1a1a1b] rounded-3xl border border-solid border-[#3d3d3d]">
              <CardContent className="flex flex-col items-start gap-4 p-4 lg:p-6">
                <div className="inline-flex flex-col items-start gap-2">
                  <h2 className="flex items-center justify-center [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-[22px] tracking-[0] leading-[28.6px] whitespace-nowrap">
                    Информация о продукте
                  </h2>
                </div>

                <div className="flex flex-col items-start gap-4 w-full">
                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <Label className="[font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm tracking-[0] leading-[21px]">
                      ID
                    </Label>
                    <Input
                      placeholder="введи ID"
                      className="h-[52px] px-4 py-2 w-full border-[1.6px] border-solid border-[#d1d1d1] rounded-xl bg-transparent [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm tracking-[0] leading-[21px]"
                    />
                  </div>

                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <Label className="[font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm tracking-[0] leading-[21px]">
                      Имя товара
                    </Label>
                    <Input
                      placeholder="введи имя товара"
                      className="h-[52px] px-4 py-2 w-full border-[1.6px] border-solid border-[#d1d1d1] rounded-xl bg-transparent [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm tracking-[0] leading-[21px]"
                    />
                  </div>

                  <div className="flex items-start gap-4 w-full">
                    <div className="flex flex-col items-start gap-1.5 flex-1">
                      <Label className="[font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm tracking-[0] leading-[21px]">
                        Размер
                      </Label>
                      <Input
                        placeholder="введи размер"
                        className="h-[52px] px-4 py-2 w-full border-[1.6px] border-solid border-[#d1d1d1] rounded-xl bg-transparent [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm tracking-[0] leading-[21px]"
                      />
                    </div>

                    <div className="flex flex-col items-start gap-1.5 flex-1">
                      <Label className="[font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm tracking-[0] leading-[21px]">
                        Цвет
                      </Label>
                      <Input
                        placeholder="введи цвет"
                        className="h-[52px] px-4 py-2 w-full border-[1.6px] border-solid border-[#d1d1d1] rounded-xl bg-transparent [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm tracking-[0] leading-[21px]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-start gap-4 w-full">
                    <div className="flex flex-col items-start gap-1.5 w-full lg:flex-1">
                      <Label className="[font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm tracking-[0] leading-[21px]">
                        Категория товара
                      </Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className={`h-[52px] px-4 py-2 w-full border-[1.6px] border-solid rounded-xl bg-transparent [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-sm tracking-[0] leading-[21px] transition-all ${
                          selectedCategory 
                            ? "border-[#09b9d9] text-[#f6f6f6]" 
                            : "border-[#d1d1d1] text-neutral-500"
                        }`}>
                          <SelectValue placeholder="выбери категорию товара" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="category1">Category 1</SelectItem>
                          <SelectItem value="category2">Category 2</SelectItem>
                          <SelectItem value="category3">Category 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col items-start gap-1.5 w-full lg:flex-1">
                      <Label className="[font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm tracking-[0] leading-[21px]">
                        Цена
                      </Label>
                      <Input
                        placeholder="введи цену"
                        className="h-[52px] px-4 py-2 w-full border-[1.6px] border-solid border-[#d1d1d1] rounded-xl bg-transparent [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm tracking-[0] leading-[21px]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <Label className="[font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm tracking-[0] leading-[21px]">
                      Статус товара
                    </Label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className={`h-[52px] px-4 py-2 w-full border-[1.6px] border-solid rounded-xl bg-transparent [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-sm tracking-[0] leading-[21px] transition-all ${
                        selectedStatus 
                          ? "border-[#09b9d9] text-[#f6f6f6]" 
                          : "border-[#d1d1d1] text-neutral-500"
                      }`}>
                        <SelectValue placeholder="выбери статус товара" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="status1">Status 1</SelectItem>
                        <SelectItem value="status2">Status 2</SelectItem>
                        <SelectItem value="status3">Status 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col items-start gap-6 w-full lg:flex-1">
              <Card className="bg-[#1a1a1b] rounded-3xl border border-solid border-[#3d3d3d] w-full">
                <CardContent className="flex flex-col items-start gap-4 p-4 lg:p-6">
                  <div className="flex flex-col items-start gap-2 w-full">
                    <h2 className="flex items-center justify-center [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-[22px] tracking-[0] leading-[28.6px] whitespace-nowrap">
                      Картинки
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                    {photoPlaceholders.slice(0, 4).map((photo) => (
                      <div
                        key={photo.id}
                        className="flex flex-col items-center justify-center gap-4 p-5 bg-[#eef7ff] rounded-lg border border-dashed border-[#09b9d9] hover:bg-[#dceeff] transition-colors cursor-pointer lg:w-[94px] lg:h-[97px] w-[108px] h-[112px]"
                      >
                        <ImageIcon className="w-8 h-8 text-neutral-500" />
                        <div className="flex items-center justify-center [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-neutral-500 text-xs text-center tracking-[0] leading-[16.8px]">
                          {photo.label}
                        </div>
                      </div>
                    ))}
                  </div>

                </CardContent>
              </Card>

              <div className="flex items-start justify-end gap-1 w-full">
                <Button className="flex justify-center gap-2.5 h-auto px-6 py-3 w-full lg:flex-1 bg-[#09b9d9] rounded-xl hover:bg-[#08a5c2] transition-colors [font-family:'PPNeueMachina-Regular',Helvetica]">
                  <span className="font-normal text-white text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
                    Сохранить
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};