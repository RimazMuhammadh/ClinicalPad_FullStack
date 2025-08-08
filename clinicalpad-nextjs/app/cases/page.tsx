'use client'

import { CaseProcessor } from '@/components/CaseProcessor'

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-medical-blue-light p-6">
      <div className="max-w-7xl mx-auto">
        <CaseProcessor />
      </div>
    </div>
  )
}