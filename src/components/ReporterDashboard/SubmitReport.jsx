import React from 'react'
import FormInput from '../FormInput'
import Buttons from '../Buttons'
import Catergory from '../Catergory'
import ImageFile from '../ImageFile'


function SubmitReport() {
  return (
    <section className='flex flex-col gap-5 justify-center items-center'>
      <div>
        <h2 className="text-text text-bold text-2xl">
            Submit New Report
        </h2>
        <p className="text-text-muted text-bold text-md">
            Report a facility issue for our team to address
        </p>
      </div>
    
      <div className='bg-white dark:bg-black sm:w-160 w-90 min-h-152 rounded-lg px-8 pt-4 pb-6 flex flex-col gap-2 shadow-lg'>
          <form action="" className=' flex flex-col gap-5 w-full'>
            <h3 class="text-text font-semibold text-xl">
                Submit Maintenance Report
            </h3>

              <FormInput
                  label = 'Title *'
                  type='text'
                  placeholder="Berief description of the issue"
              />

              <div>
                  <p className="font-bold text-text mb-2">Description *</p>
                  <div className='bg-background/90 rounded-xl focus:rounded-xl flex hover:outline-3 outline-border text-text-muted shadow-sm items-center'>
                  <textarea
                      name="description"
                      id="input-description"
                      required
                      placeholder="Provide detailed information about the maintenance issue"
                      className="w-full text-[15px] px-3 py-1 rounded-md text-text-muted placeholder:text-gray-500 focus:outline-none"></textarea>
                  </div>
              </div>

              <div className='flex flex-col sm:flex-row justify-between items-center gap-5'>
                <Catergory />
                
                <FormInput
                  label = 'Location *'
                  type='text'
                  placeholder="e.g., Building A - Rom 301"
              />
              </div>

              <ImageFile/>



              <Buttons style='cursor-pointer w-full bg-primary-dark p-2 rounded-lg text-white font-bold hover:bg-primary-dark/70' text=' Submit Report' />
          </form>
      </div>
    </section>
  )
}

export default SubmitReport
