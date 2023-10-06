import NotAuthorized from '@/components/globals/NotAuthorized'
import PoliceDashboard from '@/components/police/PoliceDashboard'
import { userUserStore } from '@/store/useUserStore'

const PoliceView = () => {
  const [role] = userUserStore(state => [state.role])

  if (role !== 'Police') {
    return <NotAuthorized />
  }

  return (
    <>
      <PoliceDashboard />
    </>
  )
}

export default PoliceView