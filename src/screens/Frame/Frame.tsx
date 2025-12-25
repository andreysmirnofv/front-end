import { Routes, Route, Navigate } from "react-router-dom";
import {
  DashboardPage,
  LoginPage,
  ProductListPage,
  AddProductPage,
  EditProductPage,
  OrderManagementPage,
  EditProductDetailsPage,
  CustomerManagementPage,
  AccountPage,
} from "./pages";


export const Frame = (): JSX.Element => {
  return (
    <main className="w-full flex flex-col">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/add" element={<AddProductPage />} />
        <Route path="/products/edit" element={<EditProductPage />} />
        <Route path="/products/edit/:id" element={<EditProductDetailsPage />} />
        <Route path="/orders" element={<OrderManagementPage />} />
        <Route path="/customers" element={<CustomerManagementPage />} />\        
        <Route path="/account" element={<AccountPage />} />

      </Routes>
    </main>
  );
};
