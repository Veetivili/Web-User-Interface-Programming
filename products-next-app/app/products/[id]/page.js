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
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width={200} />
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/products">Products</Link>
      </nav>
    </div>
  );
}
