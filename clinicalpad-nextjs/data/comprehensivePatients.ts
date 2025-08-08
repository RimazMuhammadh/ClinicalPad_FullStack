import { ComprehensivePatient } from "@/types/patient"

export const comprehensivePatients: ComprehensivePatient[] = [
  {
    id: "comp-001",
    PatientName: "Rebecca Reece",
    DateOfConsultation: "July 25, 2025",
    PatientAge: "34 years",
    PatientID: "RR-2025-0001",
    gender: "Female",
    department: "Emergency Department",
    lastVisit: "2 hours ago",
    presenting_complaints: {
      primary: "Shortness of breath",
      additional: [
        "Struggling to breathe",
        "Hay fever symptoms"
      ],
      symptom_duration: "Worsening at night for the past week",
      patient_priority_note: null
    },
    clinical_findings: {
      vital_signs: {
        temperature: "37°C",
        oxygen_saturation: "98%",
        pulse: "79",
        blood_pressure: "121/65 mmHg",
        respiratory_rate: null,
        other: null
      },
      physical_examination: "Able to complete sentences. No desaturation or tachycardia on exertion. Throat NAD. Chest clear, no wheeze or difficulty in breathing.",
      relevant_history: "Seen by out-of-hours GP 8 days ago and own GP, given bronchodilator inhaler and steroid tablets with improvement initially. Denies smoking, new pets or outdoor exposures.",
      recent_healthcare_contacts: [
        "Out-of-hours GP 8 days ago",
        "Own GP, timing unclear"
      ],
      diagnostic_results: null
    },
    medical_background: {
      past_medical_history: [
        "Asthma",
        "Hay fever"
      ],
      allergies: [
        {
          allergen: "Penicillin",
          reaction_type: null
        }
      ],
      current_medications: [
        {
          name: "Fostair",
          dose: null,
          frequency: null,
          route: "Inhaler"
        },
        {
          name: "Salbutamol",
          dose: null,
          frequency: null,
          route: "Inhaler"
        },
        {
          name: "Fexofenadine",
          dose: "120mg",
          frequency: null,
          route: null
        }
      ],
      social_factors: []
    },
    assessment_and_diagnosis: {
      primary_diagnosis: "Asthma exacerbation",
      differential_diagnoses: [],
      clinical_reasoning: null,
      certainty_level: "confirmed"
    },
    risk_stratification: {
      overall_risk: "moderate",
      urgency: "urgent_72h",
      time_based_action: "1 week of increased treatment",
      specific_risks: {
        cardiovascular: null,
        respiratory: "Potential for worsening respiratory distress",
        falls_mobility: null,
        medication_related: null,
        psychosocial: null,
        other: null
      },
      risk_factors: [
        "Asthma exacerbation"
      ],
      protective_factors: [
        "Currently improved with treatment",
        "Able to ambulate without desaturation"
      ]
    },
    management_plan: {
      immediate_interventions: [],
      medication_changes: [
        {
          action: "increase",
          medication: "Fexofenadine",
          instructions: "180mg for 1 week",
          duration: "1 week"
        },
        {
          action: "increase",
          medication: "Fostair",
          instructions: "Double dose before sleep for 1 week",
          duration: "1 week"
        },
        {
          action: "increase",
          medication: "Salbutamol",
          instructions: "Use before sleep for 1 week",
          duration: "1 week"
        },
        {
          action: "decrease",
          medication: "Steroid tablets",
          instructions: "Reduce dose",
          duration: null
        }
      ],
      non_pharmacological: [
        "Improve inhaler technique",
        "Use aerochamber spacer",
        "Advice on pollen count and safety precautions"
      ],
      procedures_ordered: []
    },
    follow_up_requirements: {
      routine_follow_up: {
        timeframe: null,
        provider: "GP"
      },
      conditional_returns: [
        "Return to ED urgently if worsening symptoms, difficulty completing sentences, increased breathing, shortness of breath or chest tightness"
      ],
      red_flags: [],
      pending_results: [],
      monitoring_parameters: []
    },
    safety_alerts: [
      "Penicillin allergy"
    ],
    care_coordination: {
      barriers_to_care: [],
      support_needs: [],
      education_provided: [
        "Inhaler technique education"
      ],
      communication_notes: "Patient in agreement with plan"
    },
    clinical_insights: [],
    documentation_quality: {
      completeness: "complete",
      confidence_level: "high",
      ambiguous_elements: [],
      missing_critical_data: []
    }
  },
  {
    id: "comp-002",
    PatientName: "Michael Thompson",
    DateOfConsultation: "July 25, 2025",
    PatientAge: "67 years",
    PatientID: "MT-2025-0002",
    gender: "Male",
    department: "Cardiology ICU",
    lastVisit: "30 minutes ago",
    presenting_complaints: {
      primary: "Severe chest pain with radiation to left arm",
      additional: [
        "Nausea and vomiting",
        "Diaphoresis",
        "Feeling of impending doom"
      ],
      symptom_duration: "Onset 4 hours ago, worsening progressively",
      patient_priority_note: "Patient reports worst pain of his life"
    },
    clinical_findings: {
      vital_signs: {
        temperature: "36.8°C",
        oxygen_saturation: "94% on room air",
        pulse: "110 bpm irregular",
        blood_pressure: "85/50 mmHg",
        respiratory_rate: "24/min",
        other: "Capillary refill 3 seconds"
      },
      physical_examination: "Pale, diaphoretic, anxious appearance. Heart sounds muffled with gallop rhythm. Bilateral basal crepitations. Cool extremities.",
      relevant_history: "History of hypertension, diabetes, 30-pack-year smoking history. Previous angina episodes managed medically.",
      recent_healthcare_contacts: [
        "GP visit 2 weeks ago for chest pain",
        "Cardiology outpatient 3 months ago"
      ],
      diagnostic_results: "ECG shows ST elevation in leads II, III, aVF. Troponin I >10,000 ng/L. CXR shows pulmonary edema."
    },
    medical_background: {
      past_medical_history: [
        "Hypertension",
        "Type 2 diabetes mellitus",
        "Chronic kidney disease stage 3",
        "Previous stable angina"
      ],
      allergies: [
        {
          allergen: "Contrast dye",
          reaction_type: "Anaphylaxis"
        }
      ],
      current_medications: [
        {
          name: "Metformin",
          dose: "500mg",
          frequency: "twice daily",
          route: "oral"
        },
        {
          name: "Amlodipine",
          dose: "10mg",
          frequency: "once daily",
          route: "oral"
        },
        {
          name: "Atorvastatin",
          dose: "40mg",
          frequency: "once daily",
          route: "oral"
        }
      ],
      social_factors: [
        "Lives alone",
        "Retired mechanic",
        "Ex-smoker (quit 2 years ago)",
        "Minimal exercise tolerance"
      ]
    },
    assessment_and_diagnosis: {
      primary_diagnosis: "ST-elevation myocardial infarction (STEMI) - inferior wall",
      differential_diagnoses: [
        "Cardiogenic shock",
        "Acute heart failure"
      ],
      clinical_reasoning: "Clinical presentation, ECG changes, and elevated cardiac biomarkers consistent with STEMI. Hemodynamic instability suggests cardiogenic shock.",
      certainty_level: "confirmed"
    },
    risk_stratification: {
      overall_risk: "critical",
      urgency: "immediate",
      time_based_action: "Immediate PCI within 90 minutes",
      specific_risks: {
        cardiovascular: "High risk of cardiac arrest, cardiogenic shock, mechanical complications",
        respiratory: "Acute pulmonary edema, respiratory failure",
        falls_mobility: "High fall risk due to hypotension",
        medication_related: "Contrast allergy limits imaging options",
        psychosocial: "Lives alone, limited social support",
        other: "Acute kidney injury risk"
      },
      risk_factors: [
        "Age >65",
        "Diabetes",
        "Smoking history",
        "Delayed presentation",
        "Hemodynamic instability"
      ],
      protective_factors: [
        "Alert and oriented",
        "No previous MI"
      ]
    },
    management_plan: {
      immediate_interventions: [
        "Dual antiplatelet therapy (aspirin + clopidogrel)",
        "Atorvastatin high dose",
        "Beta-blocker when hemodynamically stable",
        "IV access and fluid resuscitation",
        "Continuous cardiac monitoring"
      ],
      medication_changes: [
        {
          action: "start",
          medication: "Aspirin",
          instructions: "300mg loading dose, then 75mg daily",
          duration: "ongoing"
        },
        {
          action: "start",
          medication: "Clopidogrel",
          instructions: "600mg loading dose, then 75mg daily",
          duration: "12 months minimum"
        },
        {
          action: "start",
          medication: "Metoprolol",
          instructions: "12.5mg twice daily when stable",
          duration: "ongoing"
        }
      ],
      non_pharmacological: [
        "Urgent cardiac catheterization",
        "Smoking cessation counseling",
        "Cardiac rehabilitation referral",
        "Dietary consultation"
      ],
      procedures_ordered: [
        "Emergency PCI",
        "Echocardiogram",
        "Serial ECGs"
      ]
    },
    follow_up_requirements: {
      routine_follow_up: {
        timeframe: "1 week post-discharge",
        provider: "Cardiology"
      },
      conditional_returns: [
        "Immediate return if chest pain recurs",
        "Return if shortness of breath worsens",
        "Return if swelling in legs develops"
      ],
      red_flags: [
        "Recurrent chest pain",
        "New onset shortness of breath",
        "Syncope or presyncope"
      ],
      pending_results: [
        "Post-PCI troponin levels",
        "Lipid profile",
        "HbA1c"
      ],
      monitoring_parameters: [
        "Daily weights",
        "Blood pressure monitoring",
        "Blood glucose levels"
      ]
    },
    safety_alerts: [
      "CRITICAL: Contrast dye allergy - anaphylaxis risk",
      "HIGH RISK: Cardiogenic shock"
    ],
    care_coordination: {
      barriers_to_care: [
        "Lives alone",
        "Limited mobility post-procedure"
      ],
      support_needs: [
        "Home care assessment",
        "Family involvement in care plan"
      ],
      education_provided: [
        "Heart attack education",
        "Medication compliance importance",
        "Warning signs education"
      ],
      communication_notes: "Family notified. Daughter traveling from interstate to provide support."
    },
    clinical_insights: [
      "Patient's presentation suggests high-risk STEMI requiring immediate intervention",
      "Contrast allergy necessitates premedication protocol",
      "Social isolation may impact recovery and compliance"
    ],
    documentation_quality: {
      completeness: "complete",
      confidence_level: "high",
      ambiguous_elements: [],
      missing_critical_data: []
    }
  },
  {
    id: "comp-003",
    PatientName: "Maria Santos",
    DateOfConsultation: "July 25, 2025",
    PatientAge: "45 years",
    PatientID: "MS-2025-0003",
    gender: "Female",
    department: "Endocrinology",
    lastVisit: "1 hour ago",
    presenting_complaints: {
      primary: "Excessive thirst and frequent urination",
      additional: [
        "Unexplained weight loss",
        "Fatigue and weakness",
        "Blurred vision"
      ],
      symptom_duration: "Progressive over 3 months, worsening in past 2 weeks",
      patient_priority_note: "Patient concerned about dramatic weight loss"
    },
    clinical_findings: {
      vital_signs: {
        temperature: "36.5°C",
        oxygen_saturation: "99% room air",
        pulse: "95 bpm regular",
        blood_pressure: "145/92 mmHg",
        respiratory_rate: "18/min",
        other: "BMI 28.5 (down from 32 six months ago)"
      },
      physical_examination: "Alert and oriented. Mild dehydration evident. No acute distress. Abdomen soft, non-tender. No pedal edema. Fundoscopy shows early diabetic changes.",
      relevant_history: "Family history of diabetes (mother, maternal grandfather). Previous gestational diabetes 15 years ago. Sedentary lifestyle, high-carbohydrate diet.",
      recent_healthcare_contacts: [
        "GP visit 6 weeks ago for fatigue",
        "Optometrist 3 weeks ago for vision changes"
      ],
      diagnostic_results: "Random glucose 18.2 mmol/L. HbA1c 11.8%. Ketones negative. Microalbumin elevated at 45 mg/g creatinine."
    },
    medical_background: {
      past_medical_history: [
        "Gestational diabetes (2010)",
        "Hypertension",
        "Dyslipidemia",
        "PCOS"
      ],
      allergies: [
        {
          allergen: "Sulfonamides",
          reaction_type: "Rash"
        }
      ],
      current_medications: [
        {
          name: "Lisinopril",
          dose: "10mg",
          frequency: "once daily",
          route: "oral"
        },
        {
          name: "Simvastatin",
          dose: "20mg",
          frequency: "once daily",
          route: "oral"
        }
      ],
      social_factors: [
        "Office worker, sedentary job",
        "Single mother of two teenagers",
        "High stress levels",
        "Limited exercise due to time constraints"
      ]
    },
    assessment_and_diagnosis: {
      primary_diagnosis: "Type 2 Diabetes Mellitus, newly diagnosed with poor glycemic control",
      differential_diagnoses: [
        "Type 1 diabetes (less likely given age and presentation)",
        "Diabetic ketoacidosis (ruled out)"
      ],
      clinical_reasoning: "Classic symptoms of diabetes with markedly elevated glucose and HbA1c. Age, family history, and previous gestational diabetes support Type 2 diagnosis.",
      certainty_level: "confirmed"
    },
    risk_stratification: {
      overall_risk: "high",
      urgency: "urgent_24h",
      time_based_action: "Immediate diabetes education and treatment initiation",
      specific_risks: {
        cardiovascular: "High risk due to diabetes, hypertension, and dyslipidemia",
        respiratory: null,
        falls_mobility: "Potential hypoglycemia risk with treatment",
        medication_related: "Risk of hypoglycemia, drug interactions",
        psychosocial: "Single parent stress, work demands may affect compliance",
        other: "Diabetic complications development"
      },
      risk_factors: [
        "Poor glycemic control",
        "Family history",
        "Obesity",
        "Hypertension",
        "Previous gestational diabetes"
      ],
      protective_factors: [
        "Motivated to change lifestyle",
        "Good social support from children",
        "Employed with health insurance"
      ]
    },
    management_plan: {
      immediate_interventions: [
        "Comprehensive diabetes education",
        "Blood glucose monitoring training",
        "Dietary counseling",
        "Exercise prescription"
      ],
      medication_changes: [
        {
          action: "start",
          medication: "Metformin",
          instructions: "500mg twice daily with meals, titrate up weekly",
          duration: "ongoing"
        },
        {
          action: "increase",
          medication: "Lisinopril",
          instructions: "Increase to 20mg daily for cardiovascular protection",
          duration: "ongoing"
        },
        {
          action: "start",
          medication: "Atorvastatin",
          instructions: "Replace simvastatin with 40mg daily",
          duration: "ongoing"
        }
      ],
      non_pharmacological: [
        "Diabetes self-management education",
        "Nutritionist referral",
        "Exercise physiologist consultation",
        "Mental health support referral"
      ],
      procedures_ordered: [
        "Annual eye exam referral",
        "Podiatry assessment",
        "Nephrology referral if microalbuminuria persists"
      ]
    },
    follow_up_requirements: {
      routine_follow_up: {
        timeframe: "2 weeks",
        provider: "Endocrinology and GP"
      },
      conditional_returns: [
        "Return if blood glucose >20 mmol/L consistently",
        "Return if symptoms of ketoacidosis develop",
        "Return if unable to tolerate medications"
      ],
      red_flags: [
        "Vomiting and unable to keep fluids down",
        "Symptoms of DKA (nausea, vomiting, abdominal pain)",
        "Severe hypoglycemia"
      ],
      pending_results: [
        "C-peptide levels",
        "Thyroid function tests",
        "Comprehensive metabolic panel recheck"
      ],
      monitoring_parameters: [
        "Daily blood glucose monitoring",
        "Weekly weight checks",
        "Blood pressure monitoring",
        "HbA1c in 3 months"
      ]
    },
    safety_alerts: [
      "Sulfonamide allergy",
      "High cardiovascular risk"
    ],
    care_coordination: {
      barriers_to_care: [
        "Single parent responsibilities",
        "Work schedule constraints",
        "Financial concerns about medications"
      ],
      support_needs: [
        "Flexible appointment scheduling",
        "Medication cost assistance program",
        "Family education for teenagers"
      ],
      education_provided: [
        "Diabetes pathophysiology",
        "Blood glucose monitoring technique",
        "Carbohydrate counting basics",
        "Exercise safety guidelines"
      ],
      communication_notes: "Patient very motivated to make lifestyle changes. Concerned about impact on family."
    },
    clinical_insights: [
      "Patient's presentation suggests diabetes may have been developing for several months",
      "Strong family history indicates genetic predisposition",
      "Social circumstances may challenge treatment adherence but patient shows strong motivation"
    ],
    documentation_quality: {
      completeness: "complete",
      confidence_level: "high",
      ambiguous_elements: [],
      missing_critical_data: []
    }
  },
  {
    id: "comp-004",
    PatientName: "James Mitchell",
    DateOfConsultation: "July 25, 2025",
    PatientAge: "29 years",
    PatientID: "JM-2025-0004",
    gender: "Male",
    department: "Orthopedics",
    lastVisit: "45 minutes ago",
    presenting_complaints: {
      primary: "Severe lower back pain radiating to left leg",
      additional: [
        "Numbness in left foot",
        "Difficulty walking",
        "Muscle weakness in left leg"
      ],
      symptom_duration: "Acute onset 2 days ago after lifting heavy boxes at work",
      patient_priority_note: "Patient reports pain 9/10, worst ever experienced"
    },
    clinical_findings: {
      vital_signs: {
        temperature: "36.7°C",
        oxygen_saturation: "99% room air",
        pulse: "88 bpm regular",
        blood_pressure: "135/85 mmHg",
        respiratory_rate: "16/min",
        other: "Pain score 9/10"
      },
      physical_examination: "Antalgic gait, listing to right. Positive straight leg raise test at 30 degrees left side. Decreased sensation L5 dermatome. Weakness in left foot dorsiflexion (3/5). Normal reflexes except diminished left Achilles.",
      relevant_history: "Previous episodes of lower back pain managed conservatively. Works in warehouse with heavy lifting. No previous imaging of spine.",
      recent_healthcare_contacts: [
        "GP visit yesterday for back pain - prescribed NSAIDs",
        "Physiotherapy 6 months ago for previous back episode"
      ],
      diagnostic_results: "MRI lumbar spine shows large L4-L5 disc herniation with nerve root compression. No cauda equina features."
    },
    medical_background: {
      past_medical_history: [
        "Recurrent lower back pain",
        "No significant medical history"
      ],
      allergies: [
        {
          allergen: "NKDA",
          reaction_type: null
        }
      ],
      current_medications: [
        {
          name: "Ibuprofen",
          dose: "400mg",
          frequency: "three times daily",
          route: "oral"
        },
        {
          name: "Paracetamol",
          dose: "1g",
          frequency: "four times daily",
          route: "oral"
        }
      ],
      social_factors: [
        "Warehouse worker",
        "Heavy manual labor occupation",
        "Married with young children",
        "Primary income earner"
      ]
    },
    assessment_and_diagnosis: {
      primary_diagnosis: "L4-L5 disc herniation with L5 radiculopathy",
      differential_diagnoses: [
        "Cauda equina syndrome (ruled out)",
        "Spinal stenosis",
        "Piriformis syndrome"
      ],
      clinical_reasoning: "Clinical presentation and MRI findings consistent with disc herniation. Neurological signs confirm nerve root involvement.",
      certainty_level: "confirmed"
    },
    risk_stratification: {
      overall_risk: "moderate",
      urgency: "urgent_72h",
      time_based_action: "Conservative management trial with close monitoring",
      specific_risks: {
        cardiovascular: null,
        respiratory: null,
        falls_mobility: "High fall risk due to weakness and pain",
        medication_related: "NSAID-related GI risk with prolonged use",
        psychosocial: "Work absence stress, financial concerns",
        other: "Risk of chronic pain development"
      },
      risk_factors: [
        "Occupational heavy lifting",
        "Young age (higher activity demands)",
        "Significant neurological deficit"
      ],
      protective_factors: [
        "Young age (better healing potential)",
        "Previously responsive to conservative treatment",
        "Motivated for recovery"
      ]
    },
    management_plan: {
      immediate_interventions: [
        "Activity modification counseling",
        "Ergonomic education",
        "Physical therapy referral",
        "Work capacity assessment"
      ],
      medication_changes: [
        {
          action: "start",
          medication: "Pregabalin",
          instructions: "75mg twice daily, titrate as needed",
          duration: "4-6 weeks"
        },
        {
          action: "start",
          medication: "Omeprazole",
          instructions: "20mg daily for gastric protection",
          duration: "while on NSAIDs"
        },
        {
          action: "change",
          medication: "Ibuprofen",
          instructions: "Continue current dose but add gastric protection",
          duration: "2-3 weeks maximum"
        }
      ],
      non_pharmacological: [
        "Physiotherapy for core strengthening",
        "Occupational therapy assessment",
        "Heat therapy",
        "Gradual return to activity program"
      ],
      procedures_ordered: [
        "Consider epidural steroid injection if no improvement in 2 weeks",
        "Neurosurgery consultation if progressive neurological deficit"
      ]
    },
    follow_up_requirements: {
      routine_follow_up: {
        timeframe: "1 week",
        provider: "Orthopedics"
      },
      conditional_returns: [
        "Immediate return if bowel/bladder dysfunction develops",
        "Return if worsening weakness in leg",
        "Return if numbness spreads or worsens"
      ],
      red_flags: [
        "Cauda equina symptoms",
        "Progressive motor weakness",
        "Bilateral leg symptoms"
      ],
      pending_results: [],
      monitoring_parameters: [
        "Neurological examination",
        "Pain scores",
        "Functional capacity"
      ]
    },
    safety_alerts: [
      "Monitor for cauda equina syndrome signs"
    ],
    care_coordination: {
      barriers_to_care: [
        "Work demands and financial pressure",
        "Limited time for therapy appointments",
        "Physical demands of job"
      ],
      support_needs: [
        "Worker's compensation assistance",
        "Modified duties at work",
        "Family support for activities of daily living"
      ],
      education_provided: [
        "Disc herniation pathophysiology",
        "Back protection techniques",
        "Red flag symptoms to watch for",
        "Importance of staying active within limits"
      ],
      communication_notes: "Patient concerned about ability to return to work. Employer contacted regarding modified duties."
    },
    clinical_insights: [
      "Work-related injury suggests need for ergonomic assessment",
      "Young age and motivation are positive prognostic factors",
      "Early intervention may prevent chronic pain development"
    ],
    documentation_quality: {
      completeness: "complete",
      confidence_level: "high",
      ambiguous_elements: [],
      missing_critical_data: []
    }
  }
]