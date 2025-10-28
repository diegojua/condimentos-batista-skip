import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, ShoppingCart, User, Menu, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/contexts/CartContext'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLoyalty } from '@/contexts/LoyaltyContext'

export const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { cartCount } = useCart()
  const { points } = useLoyalty()

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Produtos', path: '/produtos' },
    { name: 'Sobre Nós', path: '/sobre' },
    { name: 'Contato', path: '/contato' },
  ]

  const NavLinksContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav
      className={cn(
        'flex items-center gap-6',
        isMobile ? 'flex-col items-start gap-4 mt-8' : 'hidden md:flex',
      )}
    >
      {navLinks.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          onClick={() => isMobile && setIsSheetOpen(false)}
          className={({ isActive }) =>
            cn(
              'text-base font-medium transition-colors',
              'hover:text-primary',
              isActive ? 'text-primary font-bold' : 'text-foreground/80',
              isMobile && 'text-xl',
            )
          }
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="text-2xl font-display font-bold text-primary">
          Condimentos Batista
        </Link>

        <NavLinksContent />

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 relative">
            <Input
              type="search"
              placeholder="Buscar produtos..."
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Link to="/carrinho">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center text-xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  to="/fidelidade"
                  className="flex justify-between w-full cursor-pointer"
                >
                  <span>Fidelidade</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />{' '}
                    {points}
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/admin/login" className="cursor-pointer">
                  Área Administrativa
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="p-4">
                <NavLinksContent isMobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
