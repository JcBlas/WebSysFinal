import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <header className='p-4 w-screen'>
      <div className='container mx-auto flex items-center justify-between'>
        <nav className='flex justify-end'>
          <Link href="/" className='mx-8'>
            Home
          </Link>
          <Link href="/profile" className='mx-8'>
            Profile
          </Link>
          <Link href="/perfumes" className='mx-8'>
            Perfumes
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header