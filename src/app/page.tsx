"use client";
import React, { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { allProduct } from '../sanity/lib/quries'
import { Products } from '../../types/product';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

const Page = () => {

const [product, setProduct] = useState<Products[]>([])
useEffect(() =>{
  async function fetchproduct(){
    const fetchedProduct :Products[] = await client.fetch(allProduct)
    setProduct(fetchedProduct)
  }
  fetchproduct()
},[])

return (
    <div className='max-w-full mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6 text-center'>Our Latest New Arrivals</h1>
      <div className=' grid grid-col-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {product.map((product) => (
        <div key={product._id}
        className='border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200'>
          
          {product.image && (
            <Image 
            src={urlFor(product.image).url()}
            alt ="image"
            width={200}
            height={200}
            className='w-full h-48 object-cover rounded-md'/>
          )}
          <h2 className='text-lg font-semibold mt-4'>{product.name}</h2>
          <p className='text-gray-500 mt-2'>
            {product.price ? `$${product.price}` : "price not available"}
          </p>
        </div>
      ))}
      
    </div>
    </div>
  )
}

export default Page

