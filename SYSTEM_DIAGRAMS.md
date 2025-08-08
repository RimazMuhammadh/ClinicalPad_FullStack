# ClinicalPad - System Architecture & Use Case Diagrams

## 📋 Use Case Diagram

```mermaid
graph TB
    subgraph "ClinicalPad System"
        subgraph "Actors"
            DOC[👨‍⚕️ Physician]
            NURSE[👩‍⚕️ Nurse/Clinical Staff]
            ADMIN[👨‍💼 System Administrator]
            PATIENT[👤 Patient]
        end

        subgraph "Core Use Cases"
            UC1[📝 Input Clinical Transcript]
            UC2[🔍 Process Clinical Data]
            UC3[📊 View Patient Dashboard]
            UC4[⚠️ Review Clinical Alerts]
            UC5[📈 Generate Reports]
            UC6[🔒 Manage User Access]
            UC7[💾 Store Clinical Cases]
            UC8[🔄 Batch Process Cases]
            UC9[📱 Mobile Data Entry]
            UC10[🔍 Search Patient Records]
        end

        subgraph "Extended Use Cases"
            EX1[🤖 AI Analysis with Claude]
            EX2[📧 Send Follow-up Alerts]
            EX3[📋 Export Clinical Reports]
            EX4[🔐 Audit Trail Management]
            EX5[⚙️ System Configuration]
            EX6[🔄 Real-time Sync]
        end
    end

    %% Primary Actor Relationships
    DOC --> UC1
    DOC --> UC2
    DOC --> UC3
    DOC --> UC4
    DOC --> UC5
    DOC --> UC10

    NURSE --> UC1
    NURSE --> UC3
    NURSE --> UC4
    NURSE --> UC9

    ADMIN --> UC6
    ADMIN --> UC5
    ADMIN --> EX4
    ADMIN --> EX5

    PATIENT --> UC3

    %% Use Case Extensions
    UC2 --> EX1
    UC4 --> EX2
    UC5 --> EX3
    UC7 --> EX6
    UC6 --> EX4

    %% Use Case Dependencies
    UC1 -.-> UC7
    UC2 -.-> UC7
    UC8 -.-> UC2
    UC3 -.-> UC7
    UC10 -.-> UC7

    style DOC fill:#e1f5fe
    style NURSE fill:#f3e5f5
    style ADMIN fill:#fff3e0
    style PATIENT fill:#e8f5e8
    style UC1 fill:#ffebee
    style UC2 fill:#fff3e0
    style UC3 fill:#e8f5e8
    style EX1 fill:#f3e5f5
```

## 🏗️ System Architecture Diagram

```mermaid
graph TB
    subgraph "Frontend Layer - Next.js 15.4.6"
        UI[🖥️ Clinical Dashboard UI]
        COMP[📋 ShadCN Components]
        FORMS[📝 Clinical Forms]
        CHARTS[📊 Medical Charts]
        ALERTS[⚠️ Alert Panels]
        
        UI --> COMP
        UI --> FORMS
        UI --> CHARTS
        UI --> ALERTS
    end

    subgraph "API Gateway Layer"
        NEXTAPI[🔄 Next.js API Routes]
        CORS[🔒 CORS Middleware]
        AUTH[🔐 Authentication]
        
        NEXTAPI --> CORS
        NEXTAPI --> AUTH
    end

    subgraph "Backend Services - FastAPI"
        API[🚀 FastAPI Server]
        ENDPOINTS[📡 Clinical Endpoints]
        VALIDATION[✅ Pydantic Validation]
        PROCESSING[⚙️ Data Processing]
        
        API --> ENDPOINTS
        API --> VALIDATION
        API --> PROCESSING
    end

    subgraph "AI Processing Layer"
        BEDROCK[🤖 AWS Bedrock]
        CLAUDE[🧠 Claude 3 Sonnet]
        PROMPTS[📝 System Prompts]
        EXTRACTION[📊 Data Extraction]
        
        BEDROCK --> CLAUDE
        CLAUDE --> PROMPTS
        CLAUDE --> EXTRACTION
    end

    subgraph "Database Layer - Supabase"
        POSTGRES[🗄️ PostgreSQL]
        REALTIME[⚡ Real-time Sync]
        RLS[🔒 Row Level Security]
        
        subgraph "Tables"
            CASES[📋 clinical_cases]
            RESULTS[📊 extraction_results]
            USERS[👥 auth.users]
            AUDIT[📝 audit_logs]
        end
        
        POSTGRES --> CASES
        POSTGRES --> RESULTS
        POSTGRES --> USERS
        POSTGRES --> AUDIT
        POSTGRES --> REALTIME
        POSTGRES --> RLS
    end

    subgraph "External Services"
        AWS[☁️ AWS Cloud]
        VERCEL[🚀 Vercel Hosting]
        RAILWAY[🚂 Railway Backend]
        
        AWS --> BEDROCK
    end

    %% Data Flow Connections
    UI --> NEXTAPI
    NEXTAPI --> API
    API --> BEDROCK
    BEDROCK --> POSTGRES
    POSTGRES --> REALTIME
    REALTIME --> UI

    %% Deployment Connections
    UI -.-> VERCEL
    API -.-> RAILWAY
    BEDROCK -.-> AWS

    %% Styling
    style UI fill:#e3f2fd
    style API fill:#fff3e0
    style BEDROCK fill:#f3e5f5
    style POSTGRES fill:#e8f5e8
    style AWS fill:#ffebee
```

## 🔄 Data Flow Diagram

```mermaid
sequenceDiagram
    participant Doc as 👨‍⚕️ Physician
    participant UI as 🖥️ Next.js UI
    participant API as 🚀 FastAPI
    participant Claude as 🤖 Claude 3 Sonnet
    participant DB as 🗄️ Supabase

    Doc->>UI: 1. Enter Clinical Transcript
    UI->>API: 2. POST /extract
    API->>DB: 3. Store clinical_case
    DB-->>API: 4. Return case_id
    
    API->>Claude: 5. Process with AI
    Note over Claude: Extract structured data:<br/>- Chief complaint<br/>- Diagnosis<br/>- Risk level<br/>- Alerts & insights
    
    Claude-->>API: 6. Return JSON results
    API->>DB: 7. Store extraction_results
    DB-->>API: 8. Confirm storage
    
    API-->>UI: 9. Return processed data
    UI->>DB: 10. Subscribe to real-time updates
    DB-->>UI: 11. Real-time notifications
    UI-->>Doc: 12. Display clinical dashboard
    
    Note over Doc,DB: Complete clinical workflow<br/>with AI-powered analysis
```

## 🏛️ Component Architecture Diagram

```mermaid
graph LR
    subgraph "Client Side - Browser"
        subgraph "Next.js App Router"
            PAGE[📄 page.tsx]
            LAYOUT[🎨 layout.tsx]
            PROVIDERS[⚙️ providers.tsx]
        end
        
        subgraph "React Components"
            DASHBOARD[📊 Dashboard]
            PATIENT_CARD[👤 PatientCard]
            ALERTS_PANEL[⚠️ AlertsPanel]
            CHAT_PANEL[💬 ChatPanel]
            FORMS[📝 ClinicalForms]
        end
        
        subgraph "UI Library"
            SHADCN[🎨 ShadCN/UI]
            TAILWIND[🎨 TailwindCSS]
            LUCIDE[🎯 Lucide Icons]
        end
        
        subgraph "State Management"
            REACT_QUERY[📡 React Query]
            ZUSTAND[🏪 Zustand Store]
            HOOK_FORM[📝 React Hook Form]
        end
    end

    subgraph "Server Side - API"
        subgraph "FastAPI Application"
            MAIN[🚀 clinical_api.py]
            MODELS[📋 Pydantic Models]
            ENDPOINTS[📡 API Endpoints]
            MIDDLEWARE[🔒 CORS Middleware]
        end
        
        subgraph "Business Logic"
            EXTRACTION[📊 Data Extraction]
            VALIDATION[✅ Input Validation]
            ERROR_HANDLING[❌ Error Handling]
        end
    end

    subgraph "Data Layer"
        subgraph "Supabase Services"
            AUTH_SERVICE[🔐 Auth Service]
            DATABASE[🗄️ PostgreSQL]
            REALTIME_SERVICE[⚡ Realtime Service]
            STORAGE[💾 File Storage]
        end
        
        subgraph "External APIs"
            AWS_BEDROCK[☁️ AWS Bedrock API]
            CLAUDE_API[🤖 Claude API]
        end
    end

    %% Component Relationships
    PAGE --> DASHBOARD
    LAYOUT --> PROVIDERS
    DASHBOARD --> PATIENT_CARD
    DASHBOARD --> ALERTS_PANEL
    DASHBOARD --> CHAT_PANEL
    FORMS --> HOOK_FORM
    
    %% UI Library Usage
    PATIENT_CARD --> SHADCN
    ALERTS_PANEL --> SHADCN
    CHAT_PANEL --> SHADCN
    SHADCN --> TAILWIND
    SHADCN --> LUCIDE
    
    %% State Management
    DASHBOARD --> REACT_QUERY
    FORMS --> ZUSTAND
    REACT_QUERY --> ENDPOINTS
    
    %% API Layer
    ENDPOINTS --> MAIN
    MAIN --> MODELS
    MAIN --> MIDDLEWARE
    EXTRACTION --> AWS_BEDROCK
    AWS_BEDROCK --> CLAUDE_API
    
    %% Database Connections
    MAIN --> DATABASE
    PROVIDERS --> AUTH_SERVICE
    REACT_QUERY --> REALTIME_SERVICE
    
    style PAGE fill:#e3f2fd
    style MAIN fill:#fff3e0
    style DATABASE fill:#e8f5e8
    style AWS_BEDROCK fill:#f3e5f5
```

## 🔧 Technology Stack Diagram

```mermaid
graph TB
    subgraph "Frontend Stack"
        NEXTJS[⚛️ Next.js 15.4.6<br/>App Router]
        REACT[⚛️ React 19.1.1<br/>TypeScript]
        SHADCN_UI[🎨 ShadCN UI<br/>40+ Components]
        TAILWIND[🎨 TailwindCSS v3.4.17<br/>Medical Theme]
        REACT_QUERY[📡 React Query<br/>Data Fetching]
        RECHARTS[📊 Recharts<br/>Medical Visualizations]
    end

    subgraph "Backend Stack"
        FASTAPI[🚀 FastAPI 0.104.1<br/>Python API]
        PYDANTIC[✅ Pydantic 2.5.0<br/>Data Validation]
        UVICORN[⚡ Uvicorn<br/>ASGI Server]
        PYTHON[🐍 Python 3.8+<br/>Core Runtime]
    end

    subgraph "AI & Cloud Services"
        AWS_BEDROCK[☁️ AWS Bedrock<br/>AI Platform]
        CLAUDE_SONNET[🤖 Claude 3 Sonnet<br/>Language Model]
        AWS_REGION[🌍 EU-West-2<br/>GDPR Compliant]
    end

    subgraph "Database & Real-time"
        SUPABASE[⚡ Supabase<br/>Backend-as-a-Service]
        POSTGRESQL[🗄️ PostgreSQL<br/>Primary Database]
        REALTIME[📡 Real-time Sync<br/>Live Updates]
        RLS[🔒 Row Level Security<br/>Data Protection]
    end

    subgraph "Development & Deployment"
        TYPESCRIPT[📝 TypeScript<br/>Type Safety]
        NODE[🟢 Node.js 18+<br/>Runtime]
        VERCEL[🚀 Vercel<br/>Frontend Hosting]
        RAILWAY[🚂 Railway<br/>Backend Hosting]
        DOCKER[🐳 Docker<br/>Containerization]
    end

    %% Technology Relationships
    NEXTJS --> REACT
    REACT --> SHADCN_UI
    SHADCN_UI --> TAILWIND
    REACT --> REACT_QUERY
    REACT --> RECHARTS
    
    FASTAPI --> PYDANTIC
    FASTAPI --> UVICORN
    UVICORN --> PYTHON
    
    FASTAPI --> AWS_BEDROCK
    AWS_BEDROCK --> CLAUDE_SONNET
    AWS_BEDROCK --> AWS_REGION
    
    SUPABASE --> POSTGRESQL
    SUPABASE --> REALTIME
    SUPABASE --> RLS
    
    NEXTJS --> TYPESCRIPT
    NEXTJS --> NODE
    NEXTJS --> VERCEL
    FASTAPI --> RAILWAY
    
    style NEXTJS fill:#61dafb
    style FASTAPI fill:#009688
    style AWS_BEDROCK fill:#ff9800
    style SUPABASE fill:#3ECF8E
    style VERCEL fill:#000000,color:#ffffff
```

## 📊 Database Schema Diagram

```mermaid
erDiagram
    users {
        uuid id PK
        string email
        string full_name
        string role
        timestamp created_at
        timestamp updated_at
        boolean active
    }
    
    clinical_cases {
        uuid id PK
        uuid user_id FK
        text transcript
        text model_b_letter
        string status
        timestamp created_at
        timestamp updated_at
        jsonb metadata
    }
    
    extraction_results {
        uuid id PK
        uuid case_id FK
        text chief_complaint
        text diagnosis_summary
        string risk_level
        text follow_up_action
        text social_or_medication_risks
        jsonb alerts
        jsonb insights
        float processing_time
        timestamp created_at
    }
    
    audit_logs {
        uuid id PK
        uuid user_id FK
        uuid case_id FK
        string action
        jsonb details
        string ip_address
        timestamp created_at
    }
    
    user_sessions {
        uuid id PK
        uuid user_id FK
        string session_token
        timestamp expires_at
        timestamp created_at
        boolean active
    }

    %% Relationships
    users ||--o{ clinical_cases : "creates"
    users ||--o{ audit_logs : "generates"
    users ||--o{ user_sessions : "has"
    clinical_cases ||--|| extraction_results : "produces"
    clinical_cases ||--o{ audit_logs : "tracks"
    
    %% Constraints
    clinical_cases }o--|| users : "user_id references users(id)"
    extraction_results }o--|| clinical_cases : "case_id references clinical_cases(id)"
    audit_logs }o--|| users : "user_id references users(id)"
    audit_logs }o--|| clinical_cases : "case_id references clinical_cases(id)"
    user_sessions }o--|| users : "user_id references users(id)"
```

## 🔐 Security Architecture Diagram

```mermaid
graph TB
    subgraph "Security Layers"
        subgraph "Frontend Security"
            CSP[🛡️ Content Security Policy]
            HTTPS[🔒 HTTPS/TLS 1.3]
            JWT_CLIENT[🎫 JWT Token Storage]
            XSS[🚫 XSS Protection]
        end
        
        subgraph "API Security"
            CORS_SEC[🔒 CORS Configuration]
            RATE_LIMIT[⏱️ Rate Limiting]
            INPUT_VAL[✅ Input Validation]
            JWT_API[🎫 JWT Verification]
            API_KEYS[🗝️ API Key Management]
        end
        
        subgraph "Database Security"
            RLS_SEC[🔐 Row Level Security]
            ENCRYPTION[🔐 Data Encryption]
            BACKUP[💾 Encrypted Backups]
            AUDIT_TRAIL[📝 Audit Logging]
        end
        
        subgraph "Cloud Security"
            AWS_IAM[👤 AWS IAM Roles]
            VPC[🏠 Virtual Private Cloud]
            KMS[🗝️ Key Management Service]
            BEDROCK_SEC[🤖 Bedrock API Security]
        end
        
        subgraph "Compliance & Privacy"
            HIPAA[🏥 HIPAA Compliance]
            GDPR[🌍 GDPR Compliance]
            DE_ID[🚫 Data De-identification]
            AUDIT_COMP[📋 Compliance Auditing]
        end
    end

    subgraph "Data Flow Security"
        USER[👤 User] --> HTTPS
        HTTPS --> JWT_CLIENT
        JWT_CLIENT --> CORS_SEC
        CORS_SEC --> JWT_API
        JWT_API --> RLS_SEC
        RLS_SEC --> ENCRYPTION
        
        API_KEYS --> BEDROCK_SEC
        BEDROCK_SEC --> AWS_IAM
        AWS_IAM --> KMS
        
        ENCRYPTION --> AUDIT_TRAIL
        AUDIT_TRAIL --> AUDIT_COMP
        DE_ID --> HIPAA
        HIPAA --> GDPR
    end

    style CSP fill:#ffebee
    style RLS_SEC fill:#e8f5e8
    style AWS_IAM fill:#fff3e0
    style HIPAA fill:#f3e5f5
    style GDPR fill:#e3f2fd
```

## 📱 User Journey Flow Diagram

```mermaid
journey
    title Clinical Data Processing Journey
    section Login & Setup
        Access Dashboard: 5: Physician, Nurse
        Authenticate User: 3: System
        Load Patient Data: 4: System
        
    section Data Input
        Enter Transcript: 5: Physician
        Add Model B Letter: 4: Physician
        Validate Input: 3: System
        
    section AI Processing
        Submit for Analysis: 5: Physician
        Process with Claude: 2: AI System
        Extract Clinical Data: 2: AI System
        Validate Results: 3: System
        
    section Results Review
        Display Dashboard: 5: Physician
        Review Alerts: 4: Physician
        Check Risk Levels: 5: Physician
        Review Insights: 4: Physician
        
    section Actions & Follow-up
        Generate Reports: 4: Physician
        Set Follow-up Actions: 5: Physician
        Export Data: 3: Physician
        Save to Records: 2: System
```

## 🔄 Deployment Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        DEV_FE[💻 Local Next.js<br/>Port 3000]
        DEV_BE[🐍 Local FastAPI<br/>Port 8000]
        DEV_DB[🗄️ Local Supabase<br/>Development]
    end
    
    subgraph "Staging Environment"
        STAGE_FE[🧪 Vercel Preview<br/>Staging Branch]
        STAGE_BE[🧪 Railway Staging<br/>API Testing]
        STAGE_DB[🧪 Supabase Staging<br/>Test Data]
    end
    
    subgraph "Production Environment"
        PROD_FE[🚀 Vercel Production<br/>Global CDN]
        PROD_BE[🚀 Railway Production<br/>Auto-scaling]
        PROD_DB[🚀 Supabase Production<br/>High Availability]
        
        subgraph "External Services"
            AWS_PROD[☁️ AWS Bedrock<br/>Production API]
            MONITORING[📊 Monitoring<br/>Uptime & Performance]
            BACKUP[💾 Automated Backups<br/>Daily Snapshots]
        end
    end
    
    subgraph "CI/CD Pipeline"
        GITHUB[📂 GitHub Repository]
        ACTIONS[⚙️ GitHub Actions]
        TESTS[🧪 Automated Tests]
        DEPLOY[🚀 Auto Deploy]
    end
    
    %% Development Flow
    DEV_FE --> STAGE_FE
    DEV_BE --> STAGE_BE
    DEV_DB --> STAGE_DB
    
    %% Staging to Production
    STAGE_FE --> PROD_FE
    STAGE_BE --> PROD_BE
    STAGE_DB --> PROD_DB
    
    %% CI/CD Flow
    GITHUB --> ACTIONS
    ACTIONS --> TESTS
    TESTS --> DEPLOY
    DEPLOY --> STAGE_FE
    DEPLOY --> PROD_FE
    
    %% Production Services
    PROD_BE --> AWS_PROD
    PROD_DB --> BACKUP
    PROD_FE --> MONITORING
    PROD_BE --> MONITORING
    
    style DEV_FE fill:#e3f2fd
    style STAGE_FE fill:#fff3e0
    style PROD_FE fill:#e8f5e8
    style AWS_PROD fill:#f3e5f5
```

---

## 📋 Diagram Summary

### Use Case Diagram
- **Actors**: Physicians, Nurses, Administrators, Patients
- **Core Functions**: Clinical data input, AI processing, dashboard views, alerts
- **Extended Features**: Batch processing, mobile entry, audit trails

### Architecture Diagram  
- **Frontend**: Next.js with ShadCN components and medical UI
- **Backend**: FastAPI with AWS Bedrock Claude integration
- **Database**: Supabase with real-time sync and security
- **AI Layer**: Claude 3 Sonnet for clinical data extraction

### Technology Stack
- **Modern Web**: Next.js 15.4.6 + React 19.1.1 + TypeScript
- **Backend**: FastAPI + Python with Pydantic validation
- **AI**: AWS Bedrock Claude 3 Sonnet (EU-West-2)
- **Database**: Supabase PostgreSQL with real-time features

### Security Architecture
- **Multi-layer Security**: Frontend, API, Database, and Cloud security
- **Compliance Ready**: HIPAA and GDPR compliance measures
- **Data Protection**: Encryption, de-identification, and audit trails

These diagrams provide a comprehensive visual representation of the ClinicalPad system architecture, showing how all components work together to create a secure, scalable medical data processing platform.