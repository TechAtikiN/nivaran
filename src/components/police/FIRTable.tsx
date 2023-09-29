import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

const FIRTable = () => {
  const router = useRouter()
  const [selectedStatus, setSelectedStatus] = useState('Pending')

  const firData: FIR[] = [
    {
      id: 1,
      date: '12/12/2021',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!',
      victimName: 'John Doe',
      phone: '1234567890',
      status: 'Pending'
    },
    {
      id: 2,
      date: '16/2/2021',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!',
      victimName: 'Adam Smith',
      phone: '1234567890',
      status: 'Pending'
    },
    {
      id: 3,
      date: '16/2/2021',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!',
      victimName: 'Christian Bale',
      phone: '1234567890',
      status: 'Pending'
    },
  ]

  return (
    <>
      <div className='py-3 px-5 mt-5 border border-gray-300 rounded-md text-gray-800'>

        <div className='my-3 flex justify-between items-center'>
          <div className='border border-gray-200 rounded-md p-2'>
            <button onClick={() => setSelectedStatus('Pending')} className={`badge-btn ${selectedStatus === 'Pending' ? 'bg-sky-100' : 'bg-white'}`}>Pending</button>
            <button onClick={() => setSelectedStatus('In-progress')} className={`badge-btn ${selectedStatus === 'In-progress' ? 'bg-sky-100' : 'bg-white'}`}>In progress</button>
            <button onClick={() => setSelectedStatus('Completed')} className={`badge-btn ${selectedStatus === 'Completed' ? 'bg-sky-100' : 'bg-white'}`}>Completed</button>
          </div>
          <button onClick={() => router.push('/police/register')} className='bg-sky-300 px-5 py-1 text-gray-700 font-semibold rounded-md'>Create FIR</button>
        </div>

        <table className='w-full mt-7'>
          <thead className='w-full border-b border-gray-300'>
            <tr className='bg-gray-200'>
              <th className='table-header rounded-tl-lg'>FIR Id.</th>
              <th className='table-header'>Victim Name</th>
              <th className='table-header'>Victim Contact</th>
              <th className='table-header'>Date</th>
              <th className='table-header rounded-tr-lg'>Status</th>
            </tr>
          </thead>

          <tbody className=''>
            {firData.map((fir: FIR, index) => (
              <tr
                key={fir.id}
                className={`w-full hover:cursor-pointer ${index % 2 === 1 ? 'bg-sky-50' : 'bg-white'} text-sm border-b border-gray-300`}
              >
                <td className='table-data'>{fir.id}</td>
                <td className='table-data'>{fir.victimName}</td>
                <td className='table-data'>{fir.phone}</td>
                <td className='table-data'>{fir.date}</td>
                <td className='table-data'>
                  <Dialog>
                    <DialogTrigger>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${fir.status === 'Pending'
                          ? 'bg-rose-100 text-rose-600'
                          : fir.status === 'In-progress' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                          }`}
                      >
                        {fir.status}
                      </span>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Status</DialogTitle>
                        <DialogDescription>
                          Update the status of FIR with id {fir.id}
                        </DialogDescription>
                        <div className="grid gap-4 py-4 text-sm">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="description">
                              Description
                            </label>
                            <input
                              id="description"
                              className="form-input"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="remark">
                              Remark
                            </label>
                            <input
                              id="remark"
                              className="form-input"
                            />
                          </div>
                          {/* add a file input */}
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="documents">
                              Documents
                            </label>
                            <input
                              id="documents"
                              type='file'
                              className="form-input"
                            />

                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Update FIR</Button>
                        </DialogFooter>
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
