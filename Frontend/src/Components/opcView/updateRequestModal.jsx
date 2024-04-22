import React from 'react';

function updateRequestModal(){
    return(
      <div className ='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className='mt-10 flex flex-col gap-5 text-white'>

          <div className = 'bg-indigo-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4'>
                    <h1 className='text-3xl font-extrabold'>UPDATE REQUEST</h1>
                      <p className='text-3xl font-bold max-w-md text-center'>EDUCATIONAL TOUR</p>
                <form>
                <div>
                   <input 
                    type='trip'
                    placeholder="type of trip"
                    className = 'w-full px-4 py-3 text-black border-gray-300'
                    />
                </div>
                <button className ='mt-4 w-full flex items-center justify center gap-2 px-5 py-3 font-medium rounded-md bg-black'>Save Changes</button>
                </form>
              </div>
              </div>
              </div>
    )
}

export default updateRequestModal;