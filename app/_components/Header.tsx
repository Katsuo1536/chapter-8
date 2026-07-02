import Link from 'next/link';

export const Header = () => {

  return (

    <header className="bg-taupe-950">
      <nav className="flex justify-between mx-auto container items-center">
        <Link href="/" className="text-white text-2xl">Blog</Link>
        <Link href="/form" className="text-white text-1.5xl">お問い合わせ</Link>
      </nav>
    </header>

  );
};