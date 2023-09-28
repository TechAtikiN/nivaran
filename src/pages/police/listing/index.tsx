import DashboardLayout from "@/components/globals/DashboardLayout"
import FIRTable from "@/components/police/FIRTable"
import { useAuth } from "@/hooks/useAuth"
import { userUserStore } from "@/store/useUserStore"
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react"
import { useEffect } from "react"

enum Role {
  POLICE = 'Police',
  ADMIN = 'Admin',
  NULL = 0 as const

}
const FIRListing = () => {
  const [role, userAddress, setRole] = userUserStore(state => [state.role, state.userAddress, state.setRole])
  const isAuthenicated = useAuth(process.env.NEXT_PUBLIC_POLICE_NFT_CONTRACT_ADDRESS!, userAddress)

  if (!isAuthenicated) return <div>Unauthorized Access</div>
  console.log(role)

  return (
    <DashboardLayout>
      <div className='p-4'>
        <h2 className='dashboard-heading'>FIR Listing</h2>

        <FIRTable />
      </div>
    </DashboardLayout>
  )
}

export default FIRListing
