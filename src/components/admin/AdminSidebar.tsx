import { Link, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { LayoutDashboard, Package, ShoppingCart, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/admin/products',
    label: 'Produtos',
    icon: Package,
  },
  {
    href: '/admin/orders',
    label: 'Pedidos',
    icon: ShoppingCart,
  },
  {
    href: '/admin/customers',
    label: 'Clientes',
    icon: Users,
  },
]

export const AdminSidebar = () => {
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <h2 className="text-xl font-bold text-primary">Admin</h2>
        </SidebarHeader>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                className={cn(
                  location.pathname === item.href &&
                    'bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground',
                )}
              >
                <Link to={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
