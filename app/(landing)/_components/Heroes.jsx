import Image from 'next/image'
import React from 'react'

const Heroes = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
        <div className='flex items-center'>
            <div className='relative w-[300px] h-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]'>
                <Image src="/documents.png" fill 
                className='object-contain dark:hidden'
                alt='documents'/>

                <Image src="/documents-dark.png" fill 
                className='object-contain hidden dark:block'
                alt='documents'/>
                
            </div>
            <div className='relative h-[400px] w-[400px] hidden md:block'>
            <Image src="/reading.png" fill 
                className='object-contain dark:hidden'
                alt='reading'/>

                <Image src="/reading-dark.png" fill 
                className='object-contain hidden dark:block'
                alt='reading'/>
            </div>
        </div>
    </div>
  )
}

export default Heroes