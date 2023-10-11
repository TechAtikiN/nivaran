import { useAddress, useContract, useNFTs } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/globals/DashboardLayout'
import Loading from '@/components/globals/Loading'

const FIRListing = () => {
  const [selectedStatus, setSelectedStatus] = useState('New')

  // loading contracts
  const { contract: newFIRsCollection } = useContract(process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS)
  const { contract: pendingFIRsCollection } = useContract(process.env.NEXT_PUBLIC_FIR_PENDING_CONTRACT_ADDRESS)
  const { contract: resolvedFIRsCollection } = useContract(process.env.NEXT_PUBLIC_FIR_RESOLVED_CONTRACT_ADDRESS)

  // loading NFTs
  const { data: newFIRsData, isLoading: newFIRsDataLoading } = useNFTs(newFIRsCollection)
  const { data: pendingCollectionData, isLoading: pendingFIRsDataLoading } = useNFTs(pendingFIRsCollection)
  const { data: resolvedFIRsData, isLoading: resolvedFIRsDataLoading } = useNFTs(resolvedFIRsCollection)

  let newFIRsMetadata: FIR[] = []
  let pendingFIRsMetadata: FIR[] = []
  let resolvedFIRsMetadata: FIR[] = []

  if (newFIRsDataLoading || pendingFIRsDataLoading || resolvedFIRsDataLoading)
    return <Loading />

  // mapping NFTs to get metadata
  newFIRsData?.map(async (fir: any) => {
    const data = fir.metadata
    newFIRsMetadata.push(data)
  })
  pendingCollectionData?.map(async (fir: any) => {
    const data = fir.metadata
    pendingFIRsMetadata.push(data)
  })
  resolvedFIRsData?.map(async (fir: any) => {
    const data = fir.metadata
    resolvedFIRsMetadata.push(data)
  })

  return (
    <DashboardLayout>
      <div className='mt-5'>
        <h2 className='dashboard-heading mx-4'>FIR Listing</h2>

        <div className='py-3 px-5 mt-5 border border-gray-300 rounded-md text-gray-800'>

          <div className='border border-gray-200 rounded-md p-2'>
            <button
              onClick={() => setSelectedStatus('New')}
              className={`badge-btn ${selectedStatus === 'New' ? 'bg-sky-100' : 'bg-white'}`}
            >
              New
            </button>
            <button onClick={() => setSelectedStatus('Pending')} className={`badge-btn ${selectedStatus === 'Pending' ? 'bg-sky-100' : 'bg-white'}`}>Pending</button>
            <button onClick={() => setSelectedStatus('Resolved')} className={`badge-btn ${selectedStatus === 'Resolved' ? 'bg-sky-100' : 'bg-white'}`}>Resolved</button>
          </div>


          <table className='w-full mt-7'>
            <thead className='w-full border-b border-gray-300'>
              <tr className='bg-slate-800'>
                <th className='table-header rounded-tl-lg'>FIR ID.</th>
                <th className='table-header'>Victim Name</th>
                <th className='table-header'>Victim Contact</th>
                <th className='table-header'>Wallet Address</th>
                <th className='table-header'>Status</th>
              </tr>
            </thead>

            <tbody className=''>
              {(selectedStatus === 'New' ? newFIRsMetadata :
                selectedStatus === 'Pending' ? pendingFIRsMetadata :
                  resolvedFIRsMetadata)?.filter((fir) => {
                    return fir.properties.firId !== undefined
                  }).map((fir, index: number) => (
                    <tr
                      key={fir.id}
                      className={`w-full border-l border-gray-300 hover:cursor-pointer ${index % 2 === 1 ? 'bg-sky-50' : 'bg-white'} text-sm border-b border-gray-300`}
                    >
                      <td className='table-data'>
                        {fir.properties?.firId?.slice(0, 6)}...{fir.properties?.firId?.slice(-6)}
                      </td>
                      <td className='table-data text-sm'>
                        <p>{fir.properties?.name}</p>
                        <p className='text-xs'>{fir.properties?.email}</p>
                      </td>
                      <td className='table-data'>{fir.properties?.contact}</td>
                      <td className='table-data'>
                        {fir.properties?.walletAddress.slice(0, 6)}...{fir.properties?.walletAddress.slice(-6)}
                      </td>
                      <td className='table-data'>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${selectedStatus === 'Pending'
                            ? 'bg-rose-100 text-rose-600'
                            : selectedStatus === 'In-progress' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                            }`}
                        >
                          {selectedStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>

        </div>
      </div>
    </DashboardLayout>
  )
}

export default FIRListing