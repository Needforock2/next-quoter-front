import { Main } from '@/components'
import { redirect } from "next/navigation";
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth';




export default async function DashboardPage() {

  return (
    <Main/>
  )
}
