
import { useRouter } from 'next/router'

export default function About () {
  const router = useRouter()


  return (<>
      <div className='flex justify-center items-center py-10 bg-gradient-to-r from-indigo-950 via-indigo-800 to-indigo-950'>
          <div className='text-3xl font-extrabold tracking-tight'>Macro Tracker</div>
      </div>
      <div className='bg-base-300 bg-gradient-to-br from-indigo-950'>
        <div className='flex justify-center gap-48 py-28'>
          <div className='text-right'>
            <div className='text-6xl font-extrabold tracking-tight'>Simply</div>
            <div className='text-6xl font-extrabold tracking-tight'>Track</div>
            <div className='text-6xl font-extrabold tracking-tight'>Macros</div>
          </div>
          <div className='self-center'>
            <button className='btn btn-lg btn-primary' onClick={()=> router.push('/app')}>Start Tracking</button>
          </div>
        </div>
        <div className='py-10 mt-10 m-auto prose'>
          <h1 className='text-3xl'>A minimalistic approach to tracking macronutrients.</h1>
          <p>We should not be tied to our phones when we should be focusing on ourselves. We have eliminated the all encompassing health app features and included only the necessary elements.</p>
          <p>Using the widely used standard calculation for how many calories you burn a day at baseline, the Mifflin St. Jeor equation</p>
          <p>Not focusing on overall calories consumed, but rather how many macro of each macronutrient you have consumed provides a guide for a better balanced diet throughout the day.</p>
          <p>You can track your weight each day, week, month. And each time your weight influences your baseline calories, so that each day you can focus on goals appropriate to who you are today, not who you were yesterday.</p>
        </div>
          <div className='pt-10 pb-2 px-5 flex justify-between'>
            {/* <div>Donate</div> */}
            {/* <div>Submit Bug or Feature Request</div> */}
          </div>
          <div className='pb-2 px-5 text-center'>
            <div className=''>Copyright 2024 Hemond Consulting LLC</div>
          </div>
          
      </div>
  </>)
}