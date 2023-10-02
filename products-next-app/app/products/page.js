import Link from 'next/link';

export default async function Products({  }) {

  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
                <img src={product.image} alt={product.title} width={100} />
                <h2>{product.title}</h2>
                <p>Price: ${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/products">Products</Link>
      </nav>
    </div>
  );
}

