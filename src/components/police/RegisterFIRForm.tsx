// named imports
import { Button } from '../ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet'

const RegisterFIRForm = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='bg-sky-300 px-5 py-1 text-gray-700 font-semibold rounded-md'>Create FIR</button>
      </SheetTrigger>
      <SheetContent className='w-[400px] sm:w-[540px]'>
        <SheetHeader>
          <SheetTitle>Add an FIR</SheetTitle>
          <SheetDescription>
            Create a new FIR for a case.
          </SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4 overflow-x-hidden h-[500px] overflow-y-scroll text-gray-900 font-semibold'>
          <div className='flex flex-col space-y-1'>
            <label htmlFor='victimName' className='text-xs'>
              Victim Name:
            </label>
            <input id='victimName' className='form-input text-sm py-1' />
          </div>
          <div className='flex flex-col space-y-1'>
            <label htmlFor='victimEmail' className='text-xs'>
              Victim Email:
            </label>
            <input id='victimEmail' className='form-input text-sm py-1' />
          </div>
          <div className='flex flex-col space-y-1'>
            <label htmlFor='victimContact' className='text-xs'>
              Victim Contact:
            </label>
            <input id='victimContact' className='form-input text-sm py-1' />
          </div>
          <div className='flex flex-col space-y-1'>
            <label htmlFor='username' className='text-xs'>
              Wallet Address:
            </label>
            <input id='username' className='form-input text-sm py-1' />
          </div>
          <div className='flex flex-col space-y-1'>
            <label htmlFor='username' className='text-xs'>
              Description:
            </label>
            <textarea
              style={{ resize: 'none' }}
              rows={4} id='username' className='form-input text-sm py-1'></textarea>
          </div>
          <div className='flex flex-col space-y-1'>
            <label htmlFor='username' className='text-xs'>
              Remark:
            </label>
            <input id='username' className='form-input text-sm py-1' />
          </div>
          <div className='flex flex-col space-y-1'>
            <label htmlFor='documents' className='text-xs'>
              Attach Documents
            </label>
            <input
              id='documents'
              type='file'
              className='form-input  text-sm py-1'
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit'>Create FIR</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>

  )
}

export default RegisterFIRForm
