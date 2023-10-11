// named imports
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { NFT, useAddress, useContract } from '@thirdweb-dev/react'
// default imports
import DashboardLayout from '@/components/globals/DashboardLayout'
import FIRTable from '@/components/police/FIRTable'
import NotAuthorized from '@/components/globals/NotAuthorized'

const FIRListing = () => {
  const address = useAddress()
  const isAuthenicated = useAuth(process.env.NEXT_PUBLIC_POLICE_NFT_CONTRACT_ADDRESS!, address!)

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
