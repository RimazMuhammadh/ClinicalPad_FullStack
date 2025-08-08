import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-48px)] flex items-center justify-center bg-background">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome to ClinicalPad</h1>
        <p className="text-xl text-medical-gray mb-8">Your comprehensive medical dashboard for patient insights and clinical analysis.</p>
        <div className="space-x-4">
          <Link 
            href="/comprehensive" 
            className="inline-flex items-center px-6 py-3 bg-medical-blue text-white rounded-md hover:bg-medical-blue-dark transition-colors shadow-md"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}