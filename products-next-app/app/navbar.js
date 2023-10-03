import Link from 'next/link';

export default function NavBar() {
  return (
    <div className='navbar-container'>
        <h1 className='site-title'>NEXT.JS FAKESTORE</h1>
        <nav className='navigation-links'>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/products">Products</Link>
        </nav>
    </div>
  );
}