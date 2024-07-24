import React from 'react'
import CollapseComp from '../elements/collapseComp'

const Sidebar = () => {
  return (
    <div className='w-full lg:w-1/3 xl:w-1/3'>
      <span className='text-lg text-[#696969] font-bold px-2'>URUTKAN BERDASARKAN</span>
      <CollapseComp />
    </div>
  )
}

export default Sidebar