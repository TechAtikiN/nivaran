import { useAuth } from '@/hooks/useAuth'
import { useAddress } from '@thirdweb-dev/react'
import NotAuthorized from '@/components/globals/NotAuthorized'
import PoliceDashboard from '@/components/police/PoliceDashboard'

const PoliceView = () => {
  const address = useAddress()
  const isAuthenicated = useAuth(process.env.NEXT_PUBLIC_POLICE_NFT_CONTRACT_ADDRESS!, address!)

  if (!isAuthenicated) return <NotAuthorized />

  return (
    <>
      <PoliceDashboard />
    </>
  )
}

export default PoliceView