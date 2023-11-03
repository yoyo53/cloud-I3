'use client'

export default function About () {
  return (
    <div className='bg-white py-12 flex flex-col gap-y-10'>
      <div className='mx-auto flex flex-col max-w-7xl gap-x-8 gap-y-6 px-6 lg:px-8'>
        <h2 className='max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mx-auto'>
          The story behind Y
        </h2>
        <p className='text-lg leading-8 text-gray-600 text-justify max-w-3xl'>
          Welcome to Y, where we believe in keeping things real and
          conversations unreal. Unlike some other platforms that may have
          undergone interstellar transformations (ahem, X), we&apos;re here to
          provide you with a genuine, down-to-earth chat experience. No rocket
          science, just good old-fashioned banter. Join us on Y, where the only
          thing taking off is our sense of humor. #NotX #JustY
        </p>
      </div>
      <div className='mx-auto flex flex-col max-w-7xl gap-x-8 gap-y-6 px-6 lg:px-8'>
        <h2 className='max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mx-auto'>
          Meet our team
        </h2>
        <ul
          role='list'
          className='grid gap-x-6 gap-y-12 md:grid-cols-2 sm:gap-y-16 xl:col-span-2'
        >
          <li key='Hugo Parmentier'>
            <div className='flex justify-center items-center gap-x-6'>
              <img
                className='h-32 w-32 rounded-full'
                src={`${process.env.BASE_PATH}/hugo.jpg`}
                alt=''
              />
              <div>
                <h3 className='text-2xl font-semibold leading-7 tracking-tight text-gray-900'>
                  Hugo Parmentier
                </h3>
                <p className='text-lg font-semibold leading-6 text-indigo-600'>
                  Co-Founder / CEO
                </p>
              </div>
            </div>
          </li>
          <li key='Yohan Villiers'>
            <div className='flex justify-center items-center gap-x-6'>
              <img
                className='h-32 w-32 rounded-full'
                src={`${process.env.BASE_PATH}/yohan.jpg`}
                alt=''
              />
              <div>
                <h3 className='text-2xl font-semibold leading-7 tracking-tight text-gray-900'>
                  Yohan Villiers
                </h3>
                <p className='text-lg font-semibold leading-6 text-indigo-600'>
                  Co-Founder / CEO
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
