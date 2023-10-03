'use client'
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function ProductDetail() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  //const { id } = router.query;
  const [product, setProduct] = React.useState(null);

  useEffect(() => {
    const url = `https://fakestoreapi.com${pathname}${searchParams}`
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => setProduct(data));
  }, [pathname, searchParams]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className='page-container-view'>
      
      <h1 className='product-view-title'>{product.title}</h1>
      <img className='product-view-image' src={product.image} alt={product.title} width={200} />
      <p className='product-view-price'>Price: ${product.price}</p>
      <p className='product-view-description'>{product.description}</p>
      
    </div>
  );
}
