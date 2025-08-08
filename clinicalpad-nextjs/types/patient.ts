// Comprehensive patient data types for enhanced dashboards

export interface VitalSigns {
  temperature?: string
  oxygen_saturation?: string
  pulse?: string
  blood_pressure?: string
  respiratory_rate?: string
  other?: string
}

export interface Allergy {
  allergen: string
  reaction_type?: string
}

export interface Medication {
  name: string
  dose?: string
  frequency?: string
  route?: string
}

export interface PresentingComplaints {
  primary: string
  additional: string[]
  symptom_duration: string
  patient_priority_note?: string
}

export interface ClinicalFindings {
  vital_signs: VitalSigns
  physical_examination: string
  relevant_history: string
  recent_healthcare_contacts: string[]
  diagnostic_results?: string
}

export interface MedicalBackground {
  past_medical_history: string[]
  allergies: Allergy[]
  current_medications: Medication[]
  social_factors: string[]
}

export interface AssessmentAndDiagnosis {
  primary_diagnosis: string
  differential_diagnoses: string[]
  clinical_reasoning?: string
  certainty_level: "confirmed" | "probable" | "possible" | "uncertain"
}

export interface SpecificRisks {
  cardiovascular?: string
  respiratory?: string
  falls_mobility?: string
  medication_related?: string
  psychosocial?: string
  other?: string
}

export interface RiskStratification {
  overall_risk: "low" | "moderate" | "high" | "critical"
  urgency: "routine" | "urgent_72h" | "urgent_24h" | "immediate"
  time_based_action: string
  specific_risks: SpecificRisks
  risk_factors: string[]
  protective_factors: string[]
}

export interface MedicationChange {
  action: "increase" | "decrease" | "start" | "stop" | "change"
  medication: string
  instructions: string
  duration?: string
}

export interface ManagementPlan {
  immediate_interventions: string[]
  medication_changes: MedicationChange[]
  non_pharmacological: string[]
  procedures_ordered: string[]
}

export interface FollowUpRequirements {
  routine_follow_up: {
    timeframe?: string
    provider: string
  }
  conditional_returns: string[]
  red_flags: string[]
  pending_results: string[]
  monitoring_parameters: string[]
}

export interface CareCoordination {
  barriers_to_care: string[]
  support_needs: string[]
  education_provided: string[]
  communication_notes: string
}

export interface DocumentationQuality {
  completeness: "complete" | "partial" | "incomplete"
  confidence_level: "high" | "medium" | "low"
  ambiguous_elements: string[]
  missing_critical_data: string[]
}

export interface ComprehensivePatient {
  id: string
  PatientName: string
  DateOfConsultation: string
  PatientAge: string
  PatientID: string
  gender: string
  department: string
  lastVisit: string
  presenting_complaints: PresentingComplaints
  clinical_findings: ClinicalFindings
  medical_background: MedicalBackground
  assessment_and_diagnosis: AssessmentAndDiagnosis
  risk_stratification: RiskStratification
  management_plan: ManagementPlan
  follow_up_requirements: FollowUpRequirements
  safety_alerts: string[]
  care_coordination: CareCoordination
  clinical_insights: string[]
  documentation_quality: DocumentationQuality
}

// Legacy patient interface for compatibility
export interface Patient {
  id: string
  PatientName: string
  DateOfConsultation: string
  PatientAge: string
  PatientID: string
  gender: string
  risk_level: "high" | "medium" | "low"
  chief_complaint: string
  diagnosis_summary: string
  follow_up_action: string
  social_or_medication_risks: string
  alerts: string[]
  insights: string[]
  lastVisit: string
  department: string
}