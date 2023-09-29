import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const NotAuthorized = () => {
  const [timer, setTimer] = useState(4000)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1000)
    }, 1000)

    if (timer === 1000) {
      router.push('/login')
    }

    return () => clearInterval(interval)
  }, [router, timer])

  return (
    <>
      <div className='py-20 bg-sky-200 h-screen flex flex-col items-center space-y-3'>
        <h2 className='text-5xl font-bold text-gray-700 text-center'>Not Authorized</h2>
        <h2 className='text-2xl text-gray-700 font-bold text-center'>You are not authorized to view the content</h2>
        <p className='text-center'>Redirecting to <span className='text-sky-600 font-bold'>Login page</span> in {timer / 1000} seconds</p>
      </div>
    </>
  )
}

export default NotAuthorized
