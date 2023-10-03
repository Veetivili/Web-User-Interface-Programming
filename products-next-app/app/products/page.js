import Link from 'next/link';

export default async function Products({  }) {

  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return (
    <div className='page-container'>
      <h1 className='page-title'>Products</h1>
      <ul className='product-list-items'>
        {products.map(product => (
          <li 
          key={product.id}
          className='product-list-item'>
            <Link href={`/products/${product.id}`}>
                <img className='product-image' src={product.image} alt={product.title} width={100} />
                <h2 className='product-title'>{product.title}</h2>
                <p className='product-price'>Price: ${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

