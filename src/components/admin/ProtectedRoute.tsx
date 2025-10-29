import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Skeleton } from '@/components/ui/skeleton'

export const ProtectedRoute = () => {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  if (profile?.role !== 'admin') {
    return (
      <Navigate
        to="/admin/login"
        state={{
          from: location,
          error:
            'Acesso negado. Você não tem permissão para acessar esta área.',
        }}
        replace
      />
    )
  }

  return <Outlet />
}
