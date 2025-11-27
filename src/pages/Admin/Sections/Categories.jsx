import React from 'react'
import SectionHeader from '../../../components/SectionHeader'
import Buttons from '../../../components/Buttons'
import { CirclePlus, Edit, Trash } from 'lucide-react'

function Categories() {
  return (
    <section className="flex flex-col gap-5">
      <div className='flex justify-between items-center'>
        <SectionHeader
          title='Categories'
          text='Manage report categories'
        />

        <Buttons style="text-white bg-primary-dark flex items-center px-2 py-1 rounded w-32 text-sm justify-between"
        icon= {<CirclePlus className='w-4' />}
        text='Add Category'
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>

        <div className='bg-surface w-full h-auto gap-4 rounded-xl border-border border p-6 flex flex-col justify-between'>
          <div className='text-text flex justify-between items-center'>
            <h2>Header</h2>
            <div className='flex gap-2'>
              <Edit className='w-4 text-text-muted'/>
              <Trash className='w-4 text-error'/>
            </div>
            
          </div>
          <div>
            <p className='text-text-muted'>Description</p>
          </div>
        </div>

        <div className='bg-surface w-full h-auto gap-4 rounded-xl border-border border p-6 flex flex-col justify-between'>
          <div className='text-text flex justify-between items-center'>
            <h2>Header</h2>
            <div className='flex gap-2'>
              <Edit className='w-4 text-text-muted'/>
              <Trash className='w-4 text-error'/>
            </div>
            
          </div>
          <div>
            <p className='text-text-muted'>Description</p>
          </div>
        </div>

        <div className='bg-surface w-full h-auto gap-4 rounded-xl border-border border p-6 flex flex-col justify-between'>
          <div className='text-text flex justify-between items-center'>
            <h2>Header</h2>
            <div className='flex gap-2'>
              <Edit className='w-4 text-text-muted'/>
              <Trash className='w-4 text-error'/>
            </div>
            
          </div>
          <div>
            <p className='text-text-muted'>Description</p>
          </div>
        </div>

      </div>
      
    </section>
  )
}

export default Categories
