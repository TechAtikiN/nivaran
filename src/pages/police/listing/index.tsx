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
  const address = useAddress()

  const { contract: newFIRsCollection } = useContract(process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS)
  const [newFIRs, setNewFIRs] = useState<NFT[]>([])

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
