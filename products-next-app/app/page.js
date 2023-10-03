import Link from 'next/link';

export default function Home() {
  return (
    <div className='page-container'>
      <main className='main'>
        <h1 className='page-title'>Welcome to the Best FAKESTORE!</h1>
        <p className='page-content-text'>We offer a wide selection of high-quality products at affordable prices. Browse our collection of products and find the perfect item for you.</p>
        <Link href='/products'>
          <button className='button'>Shop Now</button>
        </Link>
      </main>
      <footer className='footer'>
        <p>&copy; 2023 Best FAKESTORE. All rights reserved.</p>
      </footer>
    </div>
  );
}