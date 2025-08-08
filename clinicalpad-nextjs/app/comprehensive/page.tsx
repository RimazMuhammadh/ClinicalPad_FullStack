'use client'

import { useState } from "react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { ComprehensivePatientOverview } from "@/components/ComprehensivePatientOverview"
import { VitalSignsPanel } from "@/components/VitalSignsPanel"
import { MedicationPanel } from "@/components/MedicationPanel"
import { RiskAssessmentPanel } from "@/components/RiskAssessmentPanel"
import { ChiefComplaint } from "@/components/ChiefComplaint"
import { DiagnosisSummary } from "@/components/DiagnosisSummary"
import { FollowUpAction } from "@/components/FollowUpAction"
import { AlertsPanel } from "@/components/AlertsPanel"
import { ChatPanel } from "@/components/ChatPanel"
import { Search, Filter, Bell, Settings, MessageCircle, X, ArrowLeft, Users, User, Clock, Activity, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { comprehensivePatients } from "@/data/comprehensivePatients"
import { ComprehensivePatient } from "@/types/patient"

export default function ComprehensivePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<ComprehensivePatient | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRisk, setSelectedRisk] = useState<string>("all")

  const handlePatientSelect = (patient: ComprehensivePatient) => {
    setSelectedPatient(patient)
  }

  const handleBackToList = () => {
    setSelectedPatient(null)
    setIsChatOpen(false)
  }

  const filteredPatients = comprehensivePatients.filter(patient => {
    const matchesSearch = patient.PatientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.PatientID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.presenting_complaints.primary.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRisk = selectedRisk === "all" || patient.risk_stratification.overall_risk === selectedRisk
    
    return matchesSearch && matchesRisk
  })

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical":
        return "text-red-700 bg-red-50 border-red-200 hover:bg-red-100 hover:text-red-800 hover:border-red-300"
      case "high":
        return "text-red-600 bg-red-50 border-red-200 hover:bg-red-100 hover:text-red-700 hover:border-red-300"
      case "moderate":
        return "text-orange-600 bg-orange-50 border-orange-200 hover:bg-orange-100 hover:text-orange-700 hover:border-orange-300"
      case "low":
        return "text-green-600 bg-green-50 border-green-200 hover:bg-green-100 hover:text-green-700 hover:border-green-300"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-medical-blue-light">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-medical-blue rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">C</span>
                </div>
                <span className="ml-2 text-xl font-bold text-medical-blue">ClinicalPad</span>
              </div>
              <div className="h-6 w-px bg-border" />
              {selectedPatient ? (
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToList}
                    className="hover:bg-medical-blue/10 text-medical-blue"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Patients
                  </Button>
                  <div className="h-6 w-px bg-border" />
                  <h1 className="text-3xl font-bold text-medical-blue tracking-tight">
                    {selectedPatient.PatientName}
                  </h1>
                </div>
              ) : (
                <h1 className="text-3xl font-bold text-medical-blue tracking-tight flex items-center gap-2">
                  <Users className="h-8 w-8" />
                  Comprehensive Patient Dashboard
                </h1>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="border-medical-blue/30 hover:bg-medical-blue hover:text-white font-medium">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-medical-blue/10">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-medical-blue/10">
              <Settings className="h-4 w-4" />
            </Button>
            {selectedPatient && (
              <Button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`relative transition-all duration-300 font-bold px-6 py-2 ${
                  isChatOpen 
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-xl border-2 border-red-800' 
                    : 'bg-medical-blue hover:bg-medical-blue-dark text-white shadow-xl border-2 border-medical-blue-dark'
                }`}
                size="default"
              >
                {isChatOpen ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Close Chat
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    AI Assistant
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      {!selectedPatient ? (
        /* Patient List View */
        <div className="h-[calc(100vh-73px)] overflow-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-medical-blue mb-2">Comprehensive Patient Overview</h2>
              <p className="text-muted-foreground">Select a patient to view their detailed clinical insights and comprehensive medical information</p>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search patients by name, ID, or chief complaint..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 border-medical-blue/20 focus:border-medical-blue"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={selectedRisk === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRisk("all")}
                  className={`transition-all duration-200 font-medium ${
                    selectedRisk === "all" 
                      ? "bg-medical-blue hover:bg-medical-blue-dark text-white" 
                      : "border-medical-blue/30 hover:bg-medical-blue hover:text-white hover:border-medical-blue"
                  }`}
                >
                  All Patients
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRisk("critical")}
                  className={`transition-all duration-200 font-medium ${
                    selectedRisk === "critical" 
                      ? "bg-red-700 hover:bg-red-800 text-white border-red-700" 
                      : "border-medical-blue/30 hover:bg-medical-blue hover:text-white hover:border-medical-blue"
                  }`}
                >
                  Critical
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRisk("high")}
                  className={`transition-all duration-200 font-medium ${
                    selectedRisk === "high" 
                      ? "bg-red-600 hover:bg-red-700 text-white border-red-600" 
                      : "border-medical-blue/30 hover:bg-medical-blue hover:text-white hover:border-medical-blue"
                  }`}
                >
                  High Risk
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRisk("moderate")}
                  className={`transition-all duration-200 font-medium ${
                    selectedRisk === "moderate" 
                      ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500" 
                      : "border-medical-blue/30 hover:bg-medical-blue hover:text-white hover:border-medical-blue"
                  }`}
                >
                  Moderate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRisk("low")}
                  className={`transition-all duration-200 font-medium ${
                    selectedRisk === "low" 
                      ? "bg-green-600 hover:bg-green-700 text-white border-green-600" 
                      : "border-medical-blue/30 hover:bg-medical-blue hover:text-white hover:border-medical-blue"
                  }`}
                >
                  Low Risk
                </Button>
              </div>
            </div>

            {/* Patient Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPatients.map((patient) => (
                <Card 
                  key={patient.id} 
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-medical-border bg-card/80 backdrop-blur-sm"
                  onClick={() => handlePatientSelect(patient)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-semibold text-medical-blue">
                          {patient.PatientName}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {patient.PatientID}
                        </p>
                      </div>
                      <Badge 
                        className={`${getRiskColor(patient.risk_stratification.overall_risk)} font-medium capitalize transition-all duration-200 cursor-pointer`}
                      >
                        {patient.risk_stratification.overall_risk}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{patient.PatientAge} • {patient.gender}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{patient.lastVisit}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Activity className="h-3 w-3 text-medical-blue" />
                        <span className="text-xs font-medium text-medical-blue">Chief Complaint:</span>
                      </div>
                      <p className="text-sm text-foreground pl-4 line-clamp-2">
                        {patient.presenting_complaints.primary}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Activity className="h-3 w-3 text-green-600" />
                        <span className="text-xs font-medium text-green-600">Diagnosis:</span>
                      </div>
                      <p className="text-sm text-foreground pl-4 line-clamp-2">
                        {patient.assessment_and_diagnosis.primary_diagnosis}
                      </p>
                    </div>
                    
                    <div className="pt-2 border-t border-medical-border">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Department: {patient.department}</span>
                        <Calendar className="h-3 w-3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPatients.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground text-lg">No patients found</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </div>
        </div>
      ) : isChatOpen ? (
        <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-73px)]">
          {/* Patient Details Panel */}
          <ResizablePanel defaultSize={65} minSize={40}>
            <div className="h-full overflow-auto p-4 lg:p-6">
              <div className="max-w-6xl mx-auto space-y-6">
                {/* Patient Overview */}
                <ComprehensivePatientOverview patient={selectedPatient} />
                
                {/* Critical Information - Top Priority */}
                <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
                  <ChiefComplaint complaint={selectedPatient.presenting_complaints.primary} />
                  <DiagnosisSummary diagnosis={selectedPatient.assessment_and_diagnosis.primary_diagnosis} />
                </div>
                
                {/* Clinical Data */}
                <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
                  <VitalSignsPanel vitalSigns={selectedPatient.clinical_findings.vital_signs} />
                  <RiskAssessmentPanel riskStratification={selectedPatient.risk_stratification} />
                </div>
                
                {/* Medications and Management */}
                <div className="grid gap-4 lg:gap-6 lg:grid-cols-1">
                  <MedicationPanel 
                    currentMedications={selectedPatient.medical_background.current_medications}
                    medicationChanges={selectedPatient.management_plan.medication_changes}
                    allergies={selectedPatient.medical_background.allergies}
                  />
                </div>
                
                {/* Safety and Follow-up */}
                <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
                  <AlertsPanel alerts={selectedPatient.safety_alerts} />
                  <FollowUpAction action={selectedPatient.follow_up_requirements.routine_follow_up.provider + 
                    (selectedPatient.follow_up_requirements.routine_follow_up.timeframe ? 
                      ` in ${selectedPatient.follow_up_requirements.routine_follow_up.timeframe}` : '')} />
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Chat Panel */}
          <ResizablePanel defaultSize={35} minSize={30} maxSize={50}>
            <ChatPanel currentTranscript={selectedPatient.presenting_complaints.primary} />
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        /* Full Patient Details View */
        <div className="h-[calc(100vh-73px)] overflow-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
            {/* Patient Overview */}
            <ComprehensivePatientOverview patient={selectedPatient} />
            
            {/* Critical Information - Top Priority */}
            <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
              <ChiefComplaint complaint={selectedPatient.presenting_complaints.primary} />
              <DiagnosisSummary diagnosis={selectedPatient.assessment_and_diagnosis.primary_diagnosis} />
            </div>
            
            {/* Clinical Data */}
            <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
              <VitalSignsPanel vitalSigns={selectedPatient.clinical_findings.vital_signs} />
              <RiskAssessmentPanel riskStratification={selectedPatient.risk_stratification} />
            </div>
            
            {/* Medications and Management */}
            <div className="grid gap-4 lg:gap-6 lg:grid-cols-1">
              <MedicationPanel 
                currentMedications={selectedPatient.medical_background.current_medications}
                medicationChanges={selectedPatient.management_plan.medication_changes}
                allergies={selectedPatient.medical_background.allergies}
              />
            </div>
            
            {/* Safety and Follow-up */}
            <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
              <AlertsPanel alerts={selectedPatient.safety_alerts} />
              <FollowUpAction action={selectedPatient.follow_up_requirements.routine_follow_up.provider + 
                (selectedPatient.follow_up_requirements.routine_follow_up.timeframe ? 
                  ` in ${selectedPatient.follow_up_requirements.routine_follow_up.timeframe}` : '')} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}