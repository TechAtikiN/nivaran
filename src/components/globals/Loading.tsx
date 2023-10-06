import Image from 'next/image'

const Loading = () => {
  return (
    <div className='flex items-center h-screen justify-center'>
      <div className='flex flex-col items-center'>
        <h2 className='text-gray-700 font-semibold text-2xl'>Fetching Data, Hold Back...</h2>
        <Image
          src='https://usagif.com/wp-content/uploads/loading-36.gif'
          alt='Loading...'
          width={100}
          height={100}
        />
      </div>
    </div>
  )
}

export default Loading
