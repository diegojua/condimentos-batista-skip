import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { CartProvider } from '@/contexts/CartContext'
import { SettingsProvider } from '@/contexts/SettingsContext'
import { LoyaltyProvider } from '@/contexts/LoyaltyContext'

import Layout from './components/Layout'
import Index from './pages/Index'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import About from './pages/About'
import Contact from './pages/Contact'
import LoyaltyPage from './pages/Loyalty'
import AdminLogin from './pages/admin/Login'
import AdminForgotPassword from './pages/admin/ForgotPassword'
import AdminResetPassword from './pages/admin/ResetPassword'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import AdminProductEdit from './pages/admin/ProductEdit'
import AdminOrders from './pages/admin/Orders'
import AdminCustomers from './pages/admin/Customers'
import AdminPromotions from './pages/admin/Promotions'
import AdminPromotionEdit from './pages/admin/PromotionEdit'
import AdminSettings from './pages/admin/Settings'
import NotFound from './pages/NotFound'

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <SettingsProvider>
        <CartProvider>
          <LoyaltyProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/produtos" element={<Products />} />
                <Route path="/produtos/:id" element={<ProductDetail />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/confirmacao-pedido"
                  element={<OrderConfirmation />}
                />
                <Route path="/sobre" element={<About />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="/fidelidade" element={<LoyaltyPage />} />
              </Route>

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/forgot-password"
                element={<AdminForgotPassword />}
              />
              <Route
                path="/admin/reset-password"
                element={<AdminResetPassword />}
              />
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route
                  path="/admin/products/new"
                  element={<AdminProductEdit />}
                />
                <Route
                  path="/admin/products/edit/:id"
                  element={<AdminProductEdit />}
                />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/customers" element={<AdminCustomers />} />
                <Route path="/admin/promotions" element={<AdminPromotions />} />
                <Route
                  path="/admin/promotions/new"
                  element={<AdminPromotionEdit />}
                />
                <Route
                  path="/admin/promotions/edit/:id"
                  element={<AdminPromotionEdit />}
                />
                <Route path="/admin/settings" element={<AdminSettings />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </LoyaltyProvider>
        </CartProvider>
      </SettingsProvider>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
