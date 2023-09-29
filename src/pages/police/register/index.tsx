import DashboardLayout from "@/components/globals/DashboardLayout"

const CreateFIR = () => {
  return (
    <DashboardLayout>
      <div className='p-4'>
        <h2 className='dashboard-heading'>Register FIR</h2>

        <div className='py-3 px-5 mt-5 border border-gray-300 rounded-md text-gray-800'>
          <form action=''>
            <div className='flex items-center justify-start space-x-3 text-gray-700'>
              <label className='font-semibold text-sm' htmlFor="">Victim Name:</label>
              <input className="form-input w-1/2 py-1" type="text" />
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateFIR
