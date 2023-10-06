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

const FIRTable = () => {
  const [selectedStatus, setSelectedStatus] = useState('New')
  const address = useAddress()

  const { contract: newFIRsCollection } = useContract(process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS)
  const { contract: pendingFIRsCollection } = useContract(process.env.NEXT_PUBLIC_FIR_PENDING_CONTRACT_ADDRESS)
  const { contract: resolvedFIRsCollection } = useContract(process.env.NEXT_PUBLIC_FIR_RESOLVED_CONTRACT_ADDRESS)

  const { data: newFIRsData } = useOwnedNFTs(newFIRsCollection, address)
  const { data: pendingCollectionData } = useOwnedNFTs(pendingFIRsCollection, address)
  const { data: resolvedFIRsData } = useOwnedNFTs(newFIRsCollection, address)

  let newFIRsMetadata: FIR[] = []
  let pendingFIRsMetadata: FIR[] = []
  let resolvedFIRsMetadata: FIR[] = []

  useEffect(() => {
    const fetchTableData = async (newFIRs: any, pendingFIRs: any, resolvedFIRs: any) => {
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
    }
    fetchTableData(newFIRsCollection, pendingFIRsCollection, resolvedFIRsCollection)
    console.log(newFIRsMetadata, pendingFIRsMetadata, resolvedFIRsMetadata)
  }, [])

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
              <th className='table-header'>Date</th>
              <th className='table-header'>Status</th>
              <th className='table-header rounded-tr-lg'>Actions</th>
            </tr>
          </thead>
          <tbody className=''>
            {(selectedStatus === 'New' ? newFIRsMetadata :
              selectedStatus === 'Pending' ? pendingFIRsMetadata :
                resolvedFIRsMetadata).map((fir: any, index: number) => (
                  <tr
                    key={fir.id}
                    className={`w-full hover:cursor-pointer ${index % 2 === 1 ? 'bg-sky-50' : 'bg-white'} text-sm border-b border-gray-300`}
                  >
                    <td className='table-data'>{fir.id}</td>
                    <td className='table-data text-sm'>
                      <p>{fir.victimName}</p>
                      <p className='text-xs'>{fir.victimEmail}</p>
                    </td>
                    <td className='table-data'>{fir.phone}</td>
                    <td className='table-data'>{fir.date}</td>
                    <td className='table-data'>
                      <Dialog>
                        <DialogTrigger>
                          <EllipsisHorizontalIcon className='h-6 w-6' />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Status</DialogTitle>
                            <DialogDescription>
                              Update the status of FIR with id {fir.id}
                            </DialogDescription>
                            <div className='grid gap-4 py-4 text-sm'>
                              <div className='grid grid-cols-4 items-center gap-4'>
                                <label htmlFor='description'>
                                  Description
                                </label>
                                <input
                                  id='description'
                                  className='form-input'
                                />
                              </div>
                              <div className='grid grid-cols-4 items-center gap-4'>
                                <label htmlFor='remark'>
                                  Remark
                                </label>
                                <input
                                  id='remark'
                                  className='form-input'
                                />
                              </div>
                              <div className='grid grid-cols-4 items-center gap-4'>
                                <label htmlFor='documents'>
                                  Documents
                                </label>
                                <input
                                  id='documents'
                                  type='file'
                                  className='form-input'
                                />
                              </div>
                              <div className='grid grid-cols-4 items-center gap-4'>
                                <label htmlFor="">Update Status:</label>
                                <select
                                  name='role'
                                  className='form-input'
                                >
                                  <option value='in-progress'>Pending</option>
                                  <option value='completed'>Resolved</option>
                                </select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type='submit'>Update FIR</Button>
                            </DialogFooter>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </td>
                    <td className='table-data'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${fir.status === 'Pending'
                          ? 'bg-rose-100 text-rose-600'
                          : fir.status === 'In-progress' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                          }`}
                      >
                        {fir.status}
                      </span>
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
