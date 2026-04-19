export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    content?: string;
    image: string;
    images?: string[];
    category: string;
    technologies: string[];
    technologies_label?: string[];
    project_url?: string;
    github_url?: string;
    completion_date: string;
    completion_date_formatted: string;
    is_featured: boolean;
}

export interface Experience {
    id: number;
    company: string;
    position: string;
    location?: string;
    company_logo?: string;
    description: string;
    technologies?: string[];
    technologies_label?: string[];
    achievements?: string[];
    start_date: string;
    end_date?: string;
    is_current: boolean;
    duration: string;
}

export interface Education {
    id: number;
    institution: string;
    degree: string;
    field_of_study: string;
    grade?: string;
    logo?: string;
    start_date: string;
    end_date?: string;
    is_current: boolean;
    description?: string;
    duration: string;
}

export interface Certificate {
    id: number;
    title: string;
    issuer: string;
    issuer_logo?: string;
    credential_id?: string;
    credential_url?: string;
    image?: string;
    issued_date: string;
    issued_formatted: string;
    expiry_date?: string;
    is_valid: boolean;
    skills?: string[];
    category: string;
    category_label: string;
    category_name: string;
    is_featured: boolean;
}

export interface MessageForm {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}