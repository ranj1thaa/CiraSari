import { useContexts } from '../../contexts/Context'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContexts()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-white/70">Loading, please wait…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== requiredRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />
  }

  return children
}

export default ProtectedRoute
