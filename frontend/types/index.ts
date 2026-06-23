export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    highlights?: string[];
    image: string;
    project_url?: string;
    github_url?: string;
    drive_link?: string;
    completion_date: string;
    completion_year?: string;
    completion_formatted: string;
    is_published: boolean;
    category: {
        id: number;
        name: string;
        slug: string;
    } | null;
    technologies: {
        id: number;
        name: string;
        slug: string;
    }[];
}

export interface Experience {
    id: number;
    company: string;
    position: string;
    location_region?: string;
    work_mode: 'remote' | 'hybrid' | 'on-site' | 'other';
    work_mode_label: string;
    experience_type: 'internship' | 'full_time' | 'freelance' | 'contract';
    experience_type_label: string;
    company_logo?: string;
    description: string;
    highlights?: string[];
    drive_link?: string;
    start_date: string;
    start_formatted: string;
    end_date?: string;
    end_formatted?: string;
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
    start_formatted: string;
    end_date?: string;
    end_formatted?: string;
    is_current: boolean;
    description?: string;
    highlights?: string[];
    drive_link?: string;
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
    issued_year?: string;
    issued_formatted: string;
    expiry_date?: string;
    expiry_formatted?: string;
    is_valid: boolean;
    skills?: string[];
    category: {
        id: number;
        name: string;
        slug: string;
    } | null;
    technologies: {
        id: number;
        name: string;
        slug: string;
    }[];
}

export interface MessageForm {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}