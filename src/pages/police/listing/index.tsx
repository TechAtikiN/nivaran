// named imports
import { useAuth } from '@/hooks/useAuth'
import { userUserStore } from '@/store/useUserStore'
// default imports
import DashboardLayout from '@/components/globals/DashboardLayout'
import FIRTable from '@/components/police/FIRTable'
import NotAuthorized from '@/components/globals/NotAuthorized'
import { NFT, useAccountsForAddress, useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'

const FIRListing = () => {
  const [role, userAddress, setRole] = userUserStore(state => [state.role, state.userAddress, state.setRole])
  const isAuthenicated = useAuth(process.env.NEXT_PUBLIC_POLICE_NFT_CONTRACT_ADDRESS!, userAddress)
  const address = useAddress()

  const { contract: newFIRsCollection } = useContract(process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS)
  const [newFIRs, setNewFIRs] = useState<NFT[]>([])
  const { data } = useOwnedNFTs(newFIRsCollection, '0x54dEBFf7Cd28bc52f95CA03B5B6ca4C4C313DF16')
  console.log('nfts', data)

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const nftsData: NFT[] | undefined =
          await newFIRsCollection?.erc721.getAll();
        setNewFIRs(nftsData!)
      } catch (error) {
        console.error("Error fetching NFTs", error);
      }
    };
    fetchNFTs()
  }, [newFIRsCollection])

  console.log(newFIRs)

  if (!isAuthenicated) return <NotAuthorized />
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
