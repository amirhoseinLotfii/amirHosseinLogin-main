'use client'
import IconMap from '@/components/shared/IconMap'
import { signOut } from 'next-auth/react'
import React from 'react'

function SignOut() {
  return (
    <span onClick={()=> signOut()}>
      <IconMap className="w-8 h-8 cursor-pointer" src="/icons/logout.svg" />
    </span>
  )
}

export default SignOut
