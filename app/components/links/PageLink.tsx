'use client'
import React, { useRef, useEffect } from 'react'
import Link from 'next/link'

type PageLinkProps = {
  text?: string
  href: string
  id?: string
  children?: React.ReactNode
} & React.ComponentProps<'a'>

export default function PageLink({ text, href, id, children }: PageLinkProps) {
  const linkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const focusLinkId =
      window.location.pathname === '/' ? 'coinsLink' : 'portfolioLink'
    if (linkRef.current) {
      if (linkRef.current.id === id && linkRef.current.id === focusLinkId) {
        linkRef.current.focus()
      }
    }
  }, [id])

  return (
    <Link
      id={id}
      ref={linkRef}
      className="focus:bg-grey100 dark:focus:bg-slate700 focus:outline-none flex items-center py-2 px-7 rounded-lg"
      href={href}
    >
      {text}
      {children}
    </Link>
  )
}
