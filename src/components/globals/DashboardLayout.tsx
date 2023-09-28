// default imports
import Sidebar from './Sidebar'

const DashboardLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <div className='flex flex-row'>
      <section>
        <Sidebar />
      </section>

      <main className='flex flex-col w-full'>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
