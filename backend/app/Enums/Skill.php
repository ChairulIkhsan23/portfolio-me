<?php

namespace App\Enums;

enum Skill: string
{
    // =============================================
    // 1. PEMROGRAMAN & TEKNOLOGI (Programming & Tech)
    // =============================================
    
    // Programming Languages
    case PHP = 'php';
    case JAVASCRIPT = 'javascript';
    case TYPESCRIPT = 'typescript';
    case PYTHON = 'python';
    case JAVA = 'java';
    case KOTLIN = 'kotlin';
    case SWIFT = 'swift';
    case GO = 'go';
    case RUST = 'rust';
    case RUBY = 'ruby';
    case C_SHARP = 'csharp';
    case C_PLUS_PLUS = 'cpp';
    case C = 'c';
    case HTML = 'html';
    case CSS = 'css';
    case SQL = 'sql';
    case SHELL = 'shell';
    case R = 'r';
    case MATLAB = 'matlab';
    case SCALA = 'scala';
    
    // Backend Frameworks
    case LARAVEL = 'laravel';
    case CODEIGNITER = 'codeigniter';
    case SYMFONY = 'symfony';
    case NODEJS = 'nodejs';
    case EXPRESS = 'express';
    case NESTJS = 'nestjs';
    case DJANGO = 'django';
    case FLASK = 'flask';
    case FASTAPI = 'fastapi';
    case SPRING_BOOT = 'springboot';
    case GIN = 'gin';
    case RAILS = 'rails';
    case ASPNET = 'aspnet';
    
    // Frontend Frameworks
    case REACT = 'react';
    case NEXTJS = 'nextjs';
    case VUE = 'vue';
    case NUXT = 'nuxt';
    case ANGULAR = 'angular';
    case SVELTE = 'svelte';
    case JQUERY = 'jquery';
    case ALPINE = 'alpine';
    case HTMX = 'htmx';
    case TAILWIND = 'tailwind';
    case BOOTSTRAP = 'bootstrap';
    case MATERIAL_UI = 'materialui';
    case CHAKRA_UI = 'chakra';
    case SHADCN = 'shadcn';
    
    // Mobile Development
    case REACT_NATIVE = 'reactnative';
    case FLUTTER = 'flutter';
    case IONIC = 'ionic';
    case ANDROID = 'android';
    case IOS = 'ios';
    case XAMARIN = 'xamarin';
    
    // Databases
    case MYSQL = 'mysql';
    case POSTGRESQL = 'postgresql';
    case MONGODB = 'mongodb';
    case REDIS = 'redis';
    case FIREBASE = 'firebase';
    case MARIADB = 'mariadb';
    case SQLITE = 'sqlite';
    case SQL_SERVER = 'sqlserver';
    case ELASTICSEARCH = 'elasticsearch';
    case DYNAMODB = 'dynamodb';
    case NEO4J = 'neo4j';
    case CASSANDRA = 'cassandra';
    
    // DevOps & Cloud
    case DOCKER = 'docker';
    case KUBERNETES = 'kubernetes';
    case GIT = 'git';
    case GITHUB = 'github';
    case GITLAB = 'gitlab';
    case BITBUCKET = 'bitbucket';
    case CI_CD = 'cicd';
    case JENKINS = 'jenkins';
    case GITHUB_ACTIONS = 'githubactions';
    case AWS = 'aws';
    case GCP = 'gcp';
    case AZURE = 'azure';
    case TERRAFORM = 'terraform';
    case ANSIBLE = 'ansible';
    case PROMETHEUS = 'prometheus';
    case GRAFANA = 'grafana';
    case LINUX = 'linux';
    case NGINX = 'nginx';
    case APACHE = 'apache';
    
    // AI & Machine Learning
    case TENSORFLOW = 'tensorflow';
    case PYTORCH = 'pytorch';
    case KERAS = 'keras';
    case SCIKIT_LEARN = 'scikit';
    case PANDAS = 'pandas';
    case NUMPY = 'numpy';
    case OPENCV = 'opencv';
    case NLP = 'nlp';
    case COMPUTER_VISION = 'computervision';
    case LANGCHAIN = 'langchain';
    case OPENAI = 'openai';
    case HUGGINGFACE = 'huggingface';
    case GENAI = 'genai';
    
    // Data Science & Analytics
    case TABLEAU = 'tableau';
    case POWER_BI = 'powerbi';
    case LOOKER = 'looker';
    case BIGQUERY = 'bigquery';
    case SNOWFLAKE = 'snowflake';
    case AIRFLOW = 'airflow';
    case SPARK = 'spark';
    case HADOOP = 'hadoop';
    
    // Testing & Quality
    case PHPUNIT = 'phpunit';
    case PEST = 'pest';
    case JEST = 'jest';
    case VITEST = 'vitest';
    case CYPRESS = 'cypress';
    case PLAYWRIGHT = 'playwright';
    case SELENIUM = 'selenium';
    
    // Tools & Software
    case VS_CODE = 'vscode';
    case PHPSTORM = 'phpstorm';
    case FIGMA = 'figma';
    case POSTMAN = 'postman';
    case INSOMNIA = 'insomnia';
    case SWAGGER = 'swagger';
    case NOTION = 'notion';
    case TRELLO = 'trello';
    case JIRA = 'jira';
    case SLACK = 'slack';
    case DISCORD = 'discord';
    case ZOOM = 'zoom';
    case GOOGLE_WORKSPACE = 'googleworkspace';
    case MICROSOFT_OFFICE = 'msoffice';
    case CANVA = 'canva';
    case ADOBE_PHOTOSHOP = 'photoshop';
    case ADOBE_ILLUSTRATOR = 'illustrator';
    case ADOBE_XD = 'adobexd';
    
    // =============================================
    // 2. SOFT SKILLS
    // =============================================
    case LEADERSHIP = 'leadership';
    case COMMUNICATION = 'communication';
    case TEAMWORK = 'teamwork';
    case PROBLEM_SOLVING = 'problemsolving';
    case CRITICAL_THINKING = 'criticalthinking';
    case TIME_MANAGEMENT = 'timemanagement';
    case CREATIVITY = 'creativity';
    case ADAPTABILITY = 'adaptability';
    case EMOTIONAL_INTELLIGENCE = 'emotionalintelligence';
    case CONFLICT_RESOLUTION = 'conflictresolution';
    case NEGOTIATION = 'negotiation';
    case DECISION_MAKING = 'decisionmaking';
    case PUBLIC_SPEAKING = 'publicspeaking';
    case PRESENTATION = 'presentation';
    case MENTORING = 'mentoring';
    case COACHING = 'coaching';
    case CUSTOMER_SERVICE = 'customerservice';
    case COLLABORATION = 'collaboration';
    case FLEXIBILITY = 'flexibility';
    case STRESS_MANAGEMENT = 'stressmanagement';
    case WORK_ETHIC = 'workethic';
    case ATTENTION_TO_DETAIL = 'attentiontodetail';
    case ORGANIZATION = 'organization';
    case MULTITASKING = 'multitasking';
    case ACTIVE_LISTENING = 'activelistening';
    case PERSUASION = 'persuasion';
    case EMPATHY = 'empathy';
    case SOCIAL_SKILLS = 'socialskills';
    
    // =============================================
    // 3. AKADEMIK & PENELITIAN (Academic & Research)
    // =============================================
    case RESEARCH = 'research';
    case DATA_ANALYSIS = 'dataanalysis';
    case STATISTICS = 'statistics';
    case SCIENTIFIC_WRITING = 'scientificwriting';
    case ACADEMIC_WRITING = 'academicwriting';
    case THESIS = 'thesis';
    case JOURNAL_PUBLICATION = 'journalpublication';
    case LITERATURE_REVIEW = 'literaturereview';
    case METHODOLOGY = 'methodology';
    case QUALITATIVE_ANALYSIS = 'qualitative';
    case QUANTITATIVE_ANALYSIS = 'quantitative';
    case EXPERIMENT_DESIGN = 'experimentdesign';
    case LABORATORY = 'laboratory';
    case FIELD_STUDY = 'fieldstudy';
    case CASE_STUDY = 'casestudy';
    case CITATION = 'citation';
    case BIBLIOGRAPHY = 'bibliography';
    case PEER_REVIEW = 'peerreview';
    case GRANT_WRITING = 'grantwriting';
    case PROPOSAL_WRITING = 'proposalwriting';
    
    // =============================================
    // 4. BISNIS & MANAJEMEN (Business & Management)
    // =============================================
    case PROJECT_MANAGEMENT = 'projectmanagement';
    case AGILE = 'agile';
    case SCRUM = 'scrum';
    case KANBAN = 'kanban';
    case WATERFALL = 'waterfall';
    case PRODUCT_MANAGEMENT = 'productmanagement';
    case BUSINESS_ANALYSIS = 'businessanalysis';
    case MARKETING = 'marketing';
    case DIGITAL_MARKETING = 'digitalmarketing';
    case SEO = 'seo';
    case SEM = 'sem';
    case SOCIAL_MEDIA = 'socialmedia';
    case CONTENT_CREATION = 'contentcreation';
    case COPYWRITING = 'copywriting';
    case BRANDING = 'branding';
    case SALES = 'sales';
    case NEGOTIATION_BUSINESS = 'negotiationbusiness';
    case FINANCIAL_ANALYSIS = 'financialanalysis';
    case ACCOUNTING = 'accounting';
    case BUDGETING = 'budgeting';
    case ENTREPRENEURSHIP = 'entrepreneurship';
    case STRATEGIC_PLANNING = 'strategicplanning';
    case OPERATIONS = 'operations';
    case SUPPLY_CHAIN = 'supplychain';
    case LOGISTICS = 'logistics';
    case HR = 'hr';
    case RECRUITING = 'recruiting';
    case TRAINING = 'training';
    
    // =============================================
    // 5. BAHASA (Languages)
    // =============================================
    case ENGLISH = 'english';
    case INDONESIAN = 'indonesian';
    case ARABIC = 'arabic';
    case MANDARIN = 'mandarin';
    case JAPANESE = 'japanese';
    case KOREAN = 'korean';
    case GERMAN = 'german';
    case FRENCH = 'french';
    case SPANISH = 'spanish';
    case DUTCH = 'dutch';
    case RUSSIAN = 'russian';
    case ITALIAN = 'italian';
    case PORTUGUESE = 'portuguese';
    case HINDI = 'hindi';
    
    // =============================================
    // 6. SERTIFIKASI KHUSUS (Certifications)
    // =============================================
    case TOEFL = 'toefl';
    case IELTS = 'ielts';
    case TOEIC = 'toeic';
    case CEFR = 'cefr';
    case CPS = 'cps';
    case CSC = 'csc';
    case PMP = 'pmp';
    case CAPM = 'capm';
    case ITIL = 'itil';
    case COBIT = 'cobit';
    case TOGAF = 'togaf';
    case CISSP = 'cissp';
    case CEH = 'ceh';
    case CISA = 'cisa';
    case CISM = 'cism';
    case COMPTIA = 'comptia';
    case CCNA = 'ccna';
    case CCNP = 'ccnp';
    case MCSA = 'mcsa';
    case MCSE = 'mcse';
    case AZURE_FUNDAMENTALS = 'azurefundamentals';
    case AWS_CLOUD_PRACTITIONER = 'awscloudpractitioner';
    case GOOGLE_ANALYTICS = 'googleanalytics';
    case HUBSPOT = 'hubspot';
    
    // =============================================
    // METHOD & LABELS
    // =============================================
    public function label(): string
    {
        return match($this) {
            // Programming Languages
            self::PHP => 'PHP',
            self::JAVASCRIPT => 'JavaScript',
            self::TYPESCRIPT => 'TypeScript',
            self::PYTHON => 'Python',
            self::JAVA => 'Java',
            self::KOTLIN => 'Kotlin',
            self::SWIFT => 'Swift',
            self::GO => 'Go',
            self::RUST => 'Rust',
            self::RUBY => 'Ruby',
            self::C_SHARP => 'C#',
            self::C_PLUS_PLUS => 'C++',
            self::C => 'C',
            self::HTML => 'HTML5',
            self::CSS => 'CSS3',
            self::SQL => 'SQL',
            self::SHELL => 'Shell Scripting',
            self::R => 'R Language',
            self::MATLAB => 'MATLAB',
            self::SCALA => 'Scala',
            
            // Backend
            self::LARAVEL => 'Laravel',
            self::CODEIGNITER => 'CodeIgniter',
            self::SYMFONY => 'Symfony',
            self::NODEJS => 'Node.js',
            self::EXPRESS => 'Express.js',
            self::NESTJS => 'NestJS',
            self::DJANGO => 'Django',
            self::FLASK => 'Flask',
            self::FASTAPI => 'FastAPI',
            self::SPRING_BOOT => 'Spring Boot',
            self::GIN => 'Gin',
            self::RAILS => 'Ruby on Rails',
            self::ASPNET => 'ASP.NET',
            
            // Frontend
            self::REACT => 'React',
            self::NEXTJS => 'Next.js',
            self::VUE => 'Vue.js',
            self::NUXT => 'Nuxt.js',
            self::ANGULAR => 'Angular',
            self::SVELTE => 'Svelte',
            self::JQUERY => 'jQuery',
            self::ALPINE => 'Alpine.js',
            self::HTMX => 'htmx',
            self::TAILWIND => 'Tailwind CSS',
            self::BOOTSTRAP => 'Bootstrap',
            self::MATERIAL_UI => 'Material UI',
            self::CHAKRA_UI => 'Chakra UI',
            self::SHADCN => 'shadcn/ui',
            
            // Mobile
            self::REACT_NATIVE => 'React Native',
            self::FLUTTER => 'Flutter',
            self::IONIC => 'Ionic',
            self::ANDROID => 'Android Development',
            self::IOS => 'iOS Development',
            self::XAMARIN => 'Xamarin',
            
            // Databases
            self::MYSQL => 'MySQL',
            self::POSTGRESQL => 'PostgreSQL',
            self::MONGODB => 'MongoDB',
            self::REDIS => 'Redis',
            self::FIREBASE => 'Firebase',
            self::MARIADB => 'MariaDB',
            self::SQLITE => 'SQLite',
            self::SQL_SERVER => 'SQL Server',
            self::ELASTICSEARCH => 'Elasticsearch',
            self::DYNAMODB => 'DynamoDB',
            self::NEO4J => 'Neo4j',
            self::CASSANDRA => 'Cassandra',
            
            // DevOps
            self::DOCKER => 'Docker',
            self::KUBERNETES => 'Kubernetes',
            self::GIT => 'Git',
            self::GITHUB => 'GitHub',
            self::GITLAB => 'GitLab',
            self::BITBUCKET => 'Bitbucket',
            self::CI_CD => 'CI/CD',
            self::JENKINS => 'Jenkins',
            self::GITHUB_ACTIONS => 'GitHub Actions',
            self::AWS => 'Amazon Web Services (AWS)',
            self::GCP => 'Google Cloud Platform',
            self::AZURE => 'Microsoft Azure',
            self::TERRAFORM => 'Terraform',
            self::ANSIBLE => 'Ansible',
            self::PROMETHEUS => 'Prometheus',
            self::GRAFANA => 'Grafana',
            self::LINUX => 'Linux',
            self::NGINX => 'Nginx',
            self::APACHE => 'Apache',
            
            // AI/ML
            self::TENSORFLOW => 'TensorFlow',
            self::PYTORCH => 'PyTorch',
            self::KERAS => 'Keras',
            self::SCIKIT_LEARN => 'Scikit-learn',
            self::PANDAS => 'Pandas',
            self::NUMPY => 'NumPy',
            self::OPENCV => 'OpenCV',
            self::NLP => 'Natural Language Processing (NLP)',
            self::COMPUTER_VISION => 'Computer Vision',
            self::LANGCHAIN => 'LangChain',
            self::OPENAI => 'OpenAI API',
            self::HUGGINGFACE => 'Hugging Face',
            self::GENAI => 'Generative AI',
            
            // Data Science
            self::TABLEAU => 'Tableau',
            self::POWER_BI => 'Power BI',
            self::LOOKER => 'Looker',
            self::BIGQUERY => 'BigQuery',
            self::SNOWFLAKE => 'Snowflake',
            self::AIRFLOW => 'Apache Airflow',
            self::SPARK => 'Apache Spark',
            self::HADOOP => 'Hadoop',
            
            // Testing
            self::PHPUNIT => 'PHPUnit',
            self::PEST => 'Pest',
            self::JEST => 'Jest',
            self::VITEST => 'Vitest',
            self::CYPRESS => 'Cypress',
            self::PLAYWRIGHT => 'Playwright',
            self::SELENIUM => 'Selenium',
            
            // Tools
            self::VS_CODE => 'VS Code',
            self::PHPSTORM => 'PhpStorm',
            self::FIGMA => 'Figma',
            self::POSTMAN => 'Postman',
            self::INSOMNIA => 'Insomnia',
            self::SWAGGER => 'Swagger',
            self::NOTION => 'Notion',
            self::TRELLO => 'Trello',
            self::JIRA => 'Jira',
            self::SLACK => 'Slack',
            self::DISCORD => 'Discord',
            self::ZOOM => 'Zoom',
            self::GOOGLE_WORKSPACE => 'Google Workspace',
            self::MICROSOFT_OFFICE => 'Microsoft Office',
            self::CANVA => 'Canva',
            self::ADOBE_PHOTOSHOP => 'Adobe Photoshop',
            self::ADOBE_ILLUSTRATOR => 'Adobe Illustrator',
            self::ADOBE_XD => 'Adobe XD',
            
            // Soft Skills
            self::LEADERSHIP => 'Leadership',
            self::COMMUNICATION => 'Communication',
            self::TEAMWORK => 'Teamwork & Collaboration',
            self::PROBLEM_SOLVING => 'Problem Solving',
            self::CRITICAL_THINKING => 'Critical Thinking',
            self::TIME_MANAGEMENT => 'Time Management',
            self::CREATIVITY => 'Creativity',
            self::ADAPTABILITY => 'Adaptability',
            self::EMOTIONAL_INTELLIGENCE => 'Emotional Intelligence',
            self::CONFLICT_RESOLUTION => 'Conflict Resolution',
            self::NEGOTIATION => 'Negotiation',
            self::DECISION_MAKING => 'Decision Making',
            self::PUBLIC_SPEAKING => 'Public Speaking',
            self::PRESENTATION => 'Presentation Skills',
            self::MENTORING => 'Mentoring',
            self::COACHING => 'Coaching',
            self::CUSTOMER_SERVICE => 'Customer Service',
            self::COLLABORATION => 'Collaboration',
            self::FLEXIBILITY => 'Flexibility',
            self::STRESS_MANAGEMENT => 'Stress Management',
            self::WORK_ETHIC => 'Strong Work Ethic',
            self::ATTENTION_TO_DETAIL => 'Attention to Detail',
            self::ORGANIZATION => 'Organization',
            self::MULTITASKING => 'Multitasking',
            self::ACTIVE_LISTENING => 'Active Listening',
            self::PERSUASION => 'Persuasion',
            self::EMPATHY => 'Empathy',
            self::SOCIAL_SKILLS => 'Social Skills',
            
            // Academic & Research
            self::RESEARCH => 'Research Skills',
            self::DATA_ANALYSIS => 'Data Analysis',
            self::STATISTICS => 'Statistics',
            self::SCIENTIFIC_WRITING => 'Scientific Writing',
            self::ACADEMIC_WRITING => 'Academic Writing',
            self::THESIS => 'Thesis Writing',
            self::JOURNAL_PUBLICATION => 'Journal Publication',
            self::LITERATURE_REVIEW => 'Literature Review',
            self::METHODOLOGY => 'Research Methodology',
            self::QUALITATIVE_ANALYSIS => 'Qualitative Analysis',
            self::QUANTITATIVE_ANALYSIS => 'Quantitative Analysis',
            self::EXPERIMENT_DESIGN => 'Experiment Design',
            self::LABORATORY => 'Laboratory Skills',
            self::FIELD_STUDY => 'Field Study',
            self::CASE_STUDY => 'Case Study',
            self::CITATION => 'Citation Management',
            self::BIBLIOGRAPHY => 'Bibliography',
            self::PEER_REVIEW => 'Peer Review',
            self::GRANT_WRITING => 'Grant Writing',
            self::PROPOSAL_WRITING => 'Proposal Writing',
            
            // Business & Management
            self::PROJECT_MANAGEMENT => 'Project Management',
            self::AGILE => 'Agile Methodology',
            self::SCRUM => 'Scrum',
            self::KANBAN => 'Kanban',
            self::WATERFALL => 'Waterfall',
            self::PRODUCT_MANAGEMENT => 'Product Management',
            self::BUSINESS_ANALYSIS => 'Business Analysis',
            self::MARKETING => 'Marketing',
            self::DIGITAL_MARKETING => 'Digital Marketing',
            self::SEO => 'SEO (Search Engine Optimization)',
            self::SEM => 'SEM (Search Engine Marketing)',
            self::SOCIAL_MEDIA => 'Social Media Marketing',
            self::CONTENT_CREATION => 'Content Creation',
            self::COPYWRITING => 'Copywriting',
            self::BRANDING => 'Branding',
            self::SALES => 'Sales',
            self::NEGOTIATION_BUSINESS => 'Business Negotiation',
            self::FINANCIAL_ANALYSIS => 'Financial Analysis',
            self::ACCOUNTING => 'Accounting',
            self::BUDGETING => 'Budgeting',
            self::ENTREPRENEURSHIP => 'Entrepreneurship',
            self::STRATEGIC_PLANNING => 'Strategic Planning',
            self::OPERATIONS => 'Operations Management',
            self::SUPPLY_CHAIN => 'Supply Chain Management',
            self::LOGISTICS => 'Logistics',
            self::HR => 'Human Resources',
            self::RECRUITING => 'Recruiting',
            self::TRAINING => 'Training & Development',
            
            // Languages
            self::ENGLISH => 'English',
            self::INDONESIAN => 'Bahasa Indonesia',
            self::ARABIC => 'Arabic',
            self::MANDARIN => 'Mandarin Chinese',
            self::JAPANESE => 'Japanese',
            self::KOREAN => 'Korean',
            self::GERMAN => 'German',
            self::FRENCH => 'French',
            self::SPANISH => 'Spanish',
            self::DUTCH => 'Dutch',
            self::RUSSIAN => 'Russian',
            self::ITALIAN => 'Italian',
            self::PORTUGUESE => 'Portuguese',
            self::HINDI => 'Hindi',
            
            // Certifications
            self::TOEFL => 'TOEFL',
            self::IELTS => 'IELTS',
            self::TOEIC => 'TOEIC',
            self::CEFR => 'CEFR',
            self::CPS => 'CPS (Certified Professional Secretary)',
            self::CSC => 'CSC (Certified Supply Chain)',
            self::PMP => 'PMP (Project Management Professional)',
            self::CAPM => 'CAPM (Certified Associate in Project Management)',
            self::ITIL => 'ITIL',
            self::COBIT => 'COBIT',
            self::TOGAF => 'TOGAF',
            self::CISSP => 'CISSP',
            self::CEH => 'CEH (Certified Ethical Hacker)',
            self::CISA => 'CISA',
            self::CISM => 'CISM',
            self::COMPTIA => 'CompTIA',
            self::CCNA => 'CCNA',
            self::CCNP => 'CCNP',
            self::MCSA => 'MCSA',
            self::MCSE => 'MCSE',
            self::AZURE_FUNDAMENTALS => 'Azure Fundamentals',
            self::AWS_CLOUD_PRACTITIONER => 'AWS Cloud Practitioner',
            self::GOOGLE_ANALYTICS => 'Google Analytics',
            self::HUBSPOT => 'HubSpot Certification',
        };
    }
    
    // =============================================
    // HELPER METHODS
    // =============================================
    
    public static function options(): array
    {
        $options = [];
        foreach (self::cases() as $case) {
            $options[$case->value] = $case->label();
        }
        return $options;
    }
    
    // Get by category
    public static function programming(): array
    {
        return [
            self::PHP->value => self::PHP->label(),
            self::JAVASCRIPT->value => self::JAVASCRIPT->label(),
            self::TYPESCRIPT->value => self::TYPESCRIPT->label(),
            self::PYTHON->value => self::PYTHON->label(),
            self::JAVA->value => self::JAVA->label(),
            self::GO->value => self::GO->label(),
            self::RUST->value => self::RUST->label(),
            self::KOTLIN->value => self::KOTLIN->label(),
            self::SWIFT->value => self::SWIFT->label(),
            self::C_SHARP->value => self::C_SHARP->label(),
        ];
    }
    
    public static function frameworks(): array
    {
        return [
            self::LARAVEL->value => self::LARAVEL->label(),
            self::REACT->value => self::REACT->label(),
            self::NEXTJS->value => self::NEXTJS->label(),
            self::VUE->value => self::VUE->label(),
            self::DJANGO->value => self::DJANGO->label(),
            self::NODEJS->value => self::NODEJS->label(),
        ];
    }
    
    public static function softSkills(): array
    {
        return [
            self::LEADERSHIP->value => self::LEADERSHIP->label(),
            self::COMMUNICATION->value => self::COMMUNICATION->label(),
            self::TEAMWORK->value => self::TEAMWORK->label(),
            self::PROBLEM_SOLVING->value => self::PROBLEM_SOLVING->label(),
            self::TIME_MANAGEMENT->value => self::TIME_MANAGEMENT->label(),
            self::CREATIVITY->value => self::CREATIVITY->label(),
            self::ADAPTABILITY->value => self::ADAPTABILITY->label(),
            self::EMOTIONAL_INTELLIGENCE->value => self::EMOTIONAL_INTELLIGENCE->label(),
            self::CONFLICT_RESOLUTION->value => self::CONFLICT_RESOLUTION->label(),
            self::NEGOTIATION->value => self::NEGOTIATION->label(),
            self::DECISION_MAKING->value => self::DECISION_MAKING->label(),
            self::PUBLIC_SPEAKING->value => self::PUBLIC_SPEAKING->label(),
            self::PRESENTATION->value => self::PRESENTATION->label(),
            self::MENTORING->value => self::MENTORING->label(),
            self::WORK_ETHIC->value => self::WORK_ETHIC->label(),
            self::ATTENTION_TO_DETAIL->value => self::ATTENTION_TO_DETAIL->label(),
            self::ORGANIZATION->value => self::ORGANIZATION->label(),
        ];
    }
    
    public static function academic(): array
    {
        return [
            self::RESEARCH->value => self::RESEARCH->label(),
            self::DATA_ANALYSIS->value => self::DATA_ANALYSIS->label(),
            self::STATISTICS->value => self::STATISTICS->label(),
            self::SCIENTIFIC_WRITING->value => self::SCIENTIFIC_WRITING->label(),
            self::ACADEMIC_WRITING->value => self::ACADEMIC_WRITING->label(),
            self::THESIS->value => self::THESIS->label(),
            self::JOURNAL_PUBLICATION->value => self::JOURNAL_PUBLICATION->label(),
            self::LITERATURE_REVIEW->value => self::LITERATURE_REVIEW->label(),
            self::METHODOLOGY->value => self::METHODOLOGY->label(),
            self::QUALITATIVE_ANALYSIS->value => self::QUALITATIVE_ANALYSIS->label(),
            self::QUANTITATIVE_ANALYSIS->value => self::QUANTITATIVE_ANALYSIS->label(),
            self::EXPERIMENT_DESIGN->value => self::EXPERIMENT_DESIGN->label(),
        ];
    }
    
    public static function business(): array
    {
        return [
            self::PROJECT_MANAGEMENT->value => self::PROJECT_MANAGEMENT->label(),
            self::AGILE->value => self::AGILE->label(),
            self::SCRUM->value => self::SCRUM->label(),
            self::MARKETING->value => self::MARKETING->label(),
            self::DIGITAL_MARKETING->value => self::DIGITAL_MARKETING->label(),
            self::SEO->value => self::SEO->label(),
            self::SOCIAL_MEDIA->value => self::SOCIAL_MEDIA->label(),
            self::BRANDING->value => self::BRANDING->label(),
            self::SALES->value => self::SALES->label(),
            self::ENTREPRENEURSHIP->value => self::ENTREPRENEURSHIP->label(),
            self::STRATEGIC_PLANNING->value => self::STRATEGIC_PLANNING->label(),
            self::HR->value => self::HR->label(),
        ];
    }
    
    public static function languages(): array
    {
        return [
            self::ENGLISH->value => self::ENGLISH->label(),
            self::INDONESIAN->value => self::INDONESIAN->label(),
            self::ARABIC->value => self::ARABIC->label(),
            self::MANDARIN->value => self::MANDARIN->label(),
            self::JAPANESE->value => self::JAPANESE->label(),
            self::KOREAN->value => self::KOREAN->label(),
            self::GERMAN->value => self::GERMAN->label(),
            self::FRENCH->value => self::FRENCH->label(),
            self::SPANISH->value => self::SPANISH->label(),
        ];
    }
}