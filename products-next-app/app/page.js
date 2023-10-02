import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/products">Products</Link>
      </nav>
    </div>
  );
}