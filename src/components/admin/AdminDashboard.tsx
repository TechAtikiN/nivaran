// named imports
import { AddOfficerForm } from '@/components/admin/AddOfficerForm'
import { NFT, useContract } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'
// default imports
import OfficerListing from '@/components/admin/OfficerListing'
import Loading from '../globals/Loading'

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false)
  let [policeOfficers, setPoliceOfficers] = useState<NFT[]>([])
  const { contract: policeCollection, isLoading: policeCollectionLoading } = useContract(process.env.NEXT_PUBLIC_POLICE_NFT_CONTRACT_ADDRESS)

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true)
        const nftsData: NFT[] | undefined =
          await policeCollection?.erc721.getAll();
        setPoliceOfficers(nftsData!)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching NFTs", error);
      }
    };
    fetchNFTs()
  }, [policeCollection])

  if (policeCollectionLoading || loading) {
    return <Loading />
  }

  return (
    <div className="p-4 pr-10">
      <div className="mt-5 flex justify-between">
        <h2 className="dashboard-heading">Officer Listing</h2>
        <AddOfficerForm />
      </div>
      <OfficerListing policeOfficers={policeOfficers} />
    </div>
  )
}

export default AdminDashboard