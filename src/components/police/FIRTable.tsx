// named imports
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Button } from '../ui/button'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import RegisterFIRForm from './RegisterFIRForm'
import { useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react'
import Loading from '../globals/Loading'
import UpdateFIRForm from './UpdateFIRForm'

const FIRTable = () => {
  const [selectedStatus, setSelectedStatus] = useState('New')
  const address = useAddress()

  const { contract: newFIRsCollection } = useContract(process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS)
  const { contract: pendingFIRsCollection } = useContract(process.env.NEXT_PUBLIC_FIR_PENDING_CONTRACT_ADDRESS)
  const { contract: resolvedFIRsCollection } = useContract(process.env.NEXT_PUBLIC_FIR_RESOLVED_CONTRACT_ADDRESS)

  const { data: newFIRsData, isLoading: newFIRsDataLoading } = useOwnedNFTs(newFIRsCollection, address)
  const { data: pendingCollectionData } = useOwnedNFTs(pendingFIRsCollection, address)
  const { data: resolvedFIRsData } = useOwnedNFTs(resolvedFIRsCollection, address)

  let newFIRsMetadata: FIR[] = []
  let pendingFIRsMetadata: FIR[] = []
  let resolvedFIRsMetadata: FIR[] = []

  if (newFIRsDataLoading) return <Loading />

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
    <>
      <div className='py-3 px-5 mt-5 border border-gray-300 rounded-md text-gray-800'>

        <div className='my-3 flex justify-between items-center'>
          <div className='border border-gray-200 rounded-md p-2'>
            <button onClick={() => setSelectedStatus('New')} className={`badge-btn ${selectedStatus === 'New' ? 'bg-sky-100' : 'bg-white'}`}>New</button>
            <button onClick={() => setSelectedStatus('Pending')} className={`badge-btn ${selectedStatus === 'Pending' ? 'bg-sky-100' : 'bg-white'}`}>Pending</button>
            <button onClick={() => setSelectedStatus('Resolved')} className={`badge-btn ${selectedStatus === 'Resolved' ? 'bg-sky-100' : 'bg-white'}`}>Resolved</button>
          </div>
          <RegisterFIRForm />

        </div>

        <table className='w-full mt-7'>
          <thead className='w-full border-b border-gray-300'>
            <tr className='bg-gray-200'>
              <th className='table-header rounded-tl-lg'>FIR ID.</th>
              <th className='table-header'>Victim Name</th>
              <th className='table-header'>Victim Contact</th>
              <th className='table-header'>Wallet Address</th>
              <th className='table-header'>Status</th>
              <th className='table-header rounded-tr-lg'>Actions</th>
            </tr>
          </thead>

          <tbody className=''>
            {(selectedStatus === 'New' ? newFIRsMetadata :
              selectedStatus === 'Pending' ? pendingFIRsMetadata :
                resolvedFIRsMetadata)?.map((fir, index: number) => (
                  <tr
                    key={fir.id}
                    className={`w-full hover:cursor-pointer ${index % 2 === 1 ? 'bg-sky-50' : 'bg-white'} text-sm border-b border-gray-300`}
                  >
                    <td className='table-data'>
                      {fir.properties.firId.slice(0, 6)}...{fir.properties.firId.slice(-6)}
                    </td>
                    <td className='table-data text-sm'>
                      <p>{fir.properties.name}</p>
                      <p className='text-xs'>{fir.properties.email}</p>
                    </td>
                    <td className='table-data'>{fir.properties.contact}</td>
                    <td className='table-data'>
                      {fir.properties.walletAddress.slice(0, 6)}...{fir.properties.walletAddress.slice(-6)}
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
                    <td className='table-data'>
                      <Dialog>
                        <DialogTrigger>
                          <EllipsisHorizontalIcon className='h-6 w-6' />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Status</DialogTitle>
                            <DialogDescription>
                              <p className='font-semibold text-sky-700'>FIR ID: {fir.properties.firId}</p>
                            </DialogDescription>
                            <UpdateFIRForm fir={fir} />
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </td>

                  </tr>
                ))}
          </tbody>
        </table>

      </div>
    </>
  )
}

export default FIRTable
