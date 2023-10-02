import Link from 'next/link';

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Some generic information about us...</p>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/products">Products</Link>
      </nav>
    </div>
  );
}