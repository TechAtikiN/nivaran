import { useState } from 'react'
import { ArrowDownTrayIcon, CheckBadgeIcon, FolderPlusIcon, PresentationChartLineIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

interface Props {
  fir: FIR
  newFIRsMetadata: FIR[]
  pendingFIRsMetadata: FIR[]
  resolvedFIRsMetadata: FIR[]
}

const FIRDetail = ({ fir, newFIRsMetadata, pendingFIRsMetadata, resolvedFIRsMetadata }: Props) => {
  const [showDescription, setShowDescription] = useState(false)

  let status = ''
  let firData: FIR[] = []

  newFIRsMetadata.filter((newFIR) => newFIR.properties.firId === fir.properties.firId).map((newFIR) => {
    firData.push({ ...newFIR, properties: { ...newFIR.properties, status: 'New' } })
    status = 'New'
  })
  pendingFIRsMetadata.filter((pendingFIR) => pendingFIR.properties.firId === fir.properties.firId).map((pendingFIR) => {
    firData.push({ ...pendingFIR, properties: { ...pendingFIR.properties, status: 'Pending' } })
    status = 'Pending'
  })
  resolvedFIRsMetadata.filter((resolvedFIR) => resolvedFIR.properties.firId === fir.properties.firId).map((resolvedFIR) => {
    firData.push({ ...resolvedFIR, properties: { ...resolvedFIR.properties, status: 'Resolved' } })
    status = 'Resolved'
  })

  return (
    <div className='h-[400px] overflow-y-scroll overflow-x-hidden'>

      <div className='grid grid-cols-2 text-sm gap-x-8 gap-y-6 ml-20'>
        <div className='flex space-x-4'>
          <p>Name:</p>
          <p className='font-semibold'>{fir.properties.name}</p>
        </div>
        <div className='flex space-x-4'>
          <p>Contact:</p>
          <p className='font-semibold'>{fir.properties.contact}</p>
        </div>
        <div className='flex space-x-4'>
          <p>Email:</p>
          <p className='font-semibold'>{fir.properties.email}</p>
        </div>
        <div className='flex space-x-4'>
          <p>Loaction:</p>
          <p className='font-semibold'>{fir.properties.location}</p>
        </div>
        <div className='flex space-x-4'>
          <p>Date:</p>
          <p className='font-semibold'>{fir.properties.date}</p>
        </div>
        <div className='flex space-x-4'>
          <p>Time:</p>
          <p className='font-semibold'>{fir.properties.time}</p>
        </div>
      </div>

      <div className=''>
        <h2 className='text-lg text-center mt-3 underline font-semibold'>Status of FIR</h2>
        <ol className='relative m-6 dark:border-gray-700'>
          {firData.map((fir, index: number) => (
            <li
              key={index}
              className={`pb-10 border-l border-gray-200 last:border-none`}>
              <span className='absolute flex items-center justify-center w-6 h-6 -left-3'>
                {fir.properties.status === 'New' ? <FolderPlusIcon className='text-sky-400' /> :
                  fir.properties.status === 'Pending' ? <PresentationChartLineIcon className='text-sky-400' /> :
                    fir.properties.status === 'Resolved' ? <CheckBadgeIcon className='text-sky-400' /> : null}
              </span>

              <div className='ml-6'>
                <h3 className='flex items-center mb-1 text-lg font-semibold text-gray-900'>
                  {fir.properties.status}
                </h3>
                <p className='text-xs'>Remark: <span className='font-semibold'>{fir.properties.remark}</span></p>

                <p className='text-sm mb-4 text-gray-500'>
                  <span className={`${showDescription ? 'max-h-full' : 'max-h-14'} block overflow-hidden transition-all duration-500 ease-in-out`}>
                    {fir.properties.description}
                  </span>
                  {fir.properties.description.length > 100 ?
                    <button onClick={() => setShowDescription(!showDescription)} className='text-sm text-sky-500 font-semibold hover:underline'>
                      {showDescription ? 'Read less' : 'Read more'}
                    </button> : null}
                </p>

                <Link
                  target='_blank'
                  href={`${fir.properties.documents[0]}`}
                  className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-sky-700'
                >
                  <ArrowDownTrayIcon className='h-4 w-4 mr-2' />
                  Documents
                </Link>
              </div>
            </li>
          ))}
        </ol>

      </div>
    </div>
  )
}

export default FIRDetail