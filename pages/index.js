
import { useRouter } from 'next/router'

export default function About () {
  const router = useRouter()


  return (<>
      <div className='flex justify-center items-center py-10'>
          <h1 className='text-3xl font-extrabold tracking-tight'>macrotracker.app</h1>
      </div>
      <div className='bg-base-300 h-screen p-10'>
        <div className='flex justify-center gap-5'>
          <button className='btn btn-primary' onClick={()=> router.push('/me')}>Sign In</button>
          <button className='btn btn-secondary' onClick={()=> router.push('/me')}>Sign Up</button>
        </div>
      </div>
      <div className='h-48 bg-base-200 p-10'>
          <div>
            {/* <div>Donate</div> */}
          </div>
          <div>Copyright 2024 Hemond Consulting LLC</div>
      </div>
  </>)
}