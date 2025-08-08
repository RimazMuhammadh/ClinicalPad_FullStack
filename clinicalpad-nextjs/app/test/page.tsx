'use client'

import { DatabaseTest } from '@/components/DatabaseTest'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-medical-blue-light p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Database Connection Test</h1>
        <DatabaseTest />
      </div>
    </div>
  )
}