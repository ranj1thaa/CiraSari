import { useContexts } from '../../contexts/Context'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const { user } = useContexts()
  if (user) return <Navigate to={`/${user.role}/dashboard`} replace />
  return children
}

export default PublicRoute
