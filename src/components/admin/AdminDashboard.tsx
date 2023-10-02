// named imports
import { AddOfficerForm } from '@/components/admin/AddOfficerForm'
import { NFT, contractType, useContract } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'
// default imports
import DashboardLayout from '@/components/globals/DashboardLayout'
import OfficerListing from '@/components/admin/OfficerListing'

const AdminDashboard = () => {
  const { contract: policeCollection } = useContract(process.env.NEXT_PUBLIC_POLICE_NFT_CONTRACT_ADDRESS)
  let [policeOfficers, setPoliceOfficers] = useState<NFT[]>([])

  useEffect(() => {

    const fetchNFTs = async () => {
      try {
        const nftsData: NFT[] | undefined =
          await policeCollection?.erc721.getAll();
        setPoliceOfficers(nftsData!)
      } catch (error) {
        console.error("Error fetching NFTs", error);
      }
    };
    fetchNFTs()
  }, [policeCollection])

  return (
    <DashboardLayout>
      <div className="p-4 pr-10">
        <div className="mt-5 flex justify-between">
          <h2 className="dashboard-heading">Officer Listing</h2>
          <AddOfficerForm />
        </div>

        <OfficerListing policeOfficers={policeOfficers} />

      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard