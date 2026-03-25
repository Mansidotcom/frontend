import { Button } from "@/components/ui/button"
import React from 'react'

const Hero = () => {
    return (
        <section className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 md:py-16 min-h-[60vh] md:min-h-[70vh] w-full' >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>

                    <div className='text-center md:text-left'>
                        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight'>
                            Latest Electronics at Best Prices
                        </h1>
                        <p className='text-lg sm:text-xl mb-6 text-blue-100 max-w-md mx-auto md:mx-0'>
                            Discover cutting-edge technology with unbeatable deals on smartphones, laptops and more.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
                            <Button className='bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-lg font-semibold'>Shop Now</Button>
                            <Button variant='outline' className='border-white text-white hover:bg-white hover:text-blue-600 bg-transparent px-6 py-3 text-lg font-semibold'>View Deals</Button>
                        </div>
                    </div>
                    <div className='relative flex justify-center md:justify-end'>
                        <img src='/src/assets/cal.jpg' alt='Electronics showcase' className='rounded-lg shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg h-auto' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
