import React, { useEffect, useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


const ProductImg = ({images = [] }) => {
const [mainImg, setMainImg] = useState(images[0]?.url || "")

  return (
    <div className='flex flex-col md:flex-row gap-5 w-full md:w-max'>
    <div className='gap-5 flex flex-row md:flex-col overflow-x-auto md:overflow-visible'>
    {
        images.map((img)=>{
            return <img 
            onClick={()=>setMainImg(img.url)}
            src={img.url} alt='' 
            className='cursor-pointer w-16 h-16 md:w-20 md:h-20 border shadow-lg flex-shrink-0' />
        })
    }
    </div>
    <Zoom>
        <img src={mainImg} alt='' className='w-full max-w-md md:w-[400px] border shadow-lg'/>
    </Zoom>
    </div>
  )
}

export default ProductImg
