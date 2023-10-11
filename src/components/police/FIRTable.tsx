// named imports
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// default imports
import RegisterFIRForm from './RegisterFIRForm'
import Loading from '../globals/Loading'
import UpdateFIRForm from './UpdateFIRForm'
import FIRDetail from '../globals/FIRDetail'

const FIRTable = () => {
  const address = useAddress()
  const [selectedStatus, setSelectedStatus] = useState('New')

  // loading contracts
  const { contract: newFIRsCollection } = useContract(process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS)
  const { contract: pendingFIRsCollection } = useContract(process.env.NEXT_PUBLIC_FIR_PENDING_CONTRACT_ADDRESS)
  const { contract: resolvedFIRsCollection } = useContract(process.env.NEXT_PUBLIC_FIR_RESOLVED_CONTRACT_ADDRESS)

  // loading NFTs
  const { data: newFIRsData, isLoading: newFIRsDataLoading } = useOwnedNFTs(newFIRsCollection, address)
  const { data: pendingFIRsData, isLoading: pendingFIRsDataLoading } = useOwnedNFTs(pendingFIRsCollection, address)
  const { data: resolvedFIRsData, isLoading: resolvedFIRsDataLoading } = useOwnedNFTs(resolvedFIRsCollection, address)

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
  pendingFIRsData?.map(async (fir: any) => {
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
            <tr className='bg-slate-800'>
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
                    className={`w-full border-l border-gray-300 hover:cursor-pointer ${index % 2 === 1 ? 'bg-sky-50' : 'bg-white'} text-sm border-b border-gray-300`}
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
                    <td
                      onClick={(e) => e.stopPropagation()}
                      className='table-data border-r border-gray-300'>
                      <Popover>
                        <PopoverTrigger>
                          <EllipsisHorizontalIcon className='h-6 w-6' />
                        </PopoverTrigger>
                        <PopoverContent className='w-36'>

                          <Dialog>
                            <DialogTrigger className='hover:bg-gray-100 text-left p-1 text-sm rounded-md'>
                              <p>View FIR</p>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader className='bg-slate-950 -mb-10 text-white rounded-md p-1 m-1'>
                                <DialogTitle className='text-center font-semibold text-xl'>FIR Details</DialogTitle>
                                <DialogDescription>
                                  <p className='font-semibold text-sky-300 text-center -mb-8'>FIR ID: {fir?.properties?.firId}</p>
                                </DialogDescription>
                              </DialogHeader>
                              <FIRDetail
                                newFIRsMetadata={newFIRsMetadata}
                                pendingFIRsMetadata={pendingFIRsMetadata}
                                resolvedFIRsMetadata={resolvedFIRsMetadata}
                                fir={fir} />
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger className='hover:bg-gray-100 text-left p-1 text-sm rounded-md'>
                              {selectedStatus !== 'Resolved' && (
                                <p>Update Status</p>
                              )}
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader className='bg-slate-950 text-white rounded-md p-2 m-1'>
                                <DialogTitle className='text-center'>Update Status</DialogTitle>
                                <DialogDescription>
                                  <p className='text-center text-sky-300 font-semibold'>FIR ID: {fir?.properties?.firId}</p>
                                  <p className='text-center -mb-14 mt-2 text-gray-300'>
                                    You are about to update the status of FIR. Please make sure you are updating the status correctly.
                                  </p>
                                </DialogDescription>
                              </DialogHeader>
                              <UpdateFIRForm selectedStatus={selectedStatus} fir={fir} />
                            </DialogContent>
                          </Dialog>

                        </PopoverContent>
                      </Popover>
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
