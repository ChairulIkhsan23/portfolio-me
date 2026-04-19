import {
    SiLaravel,
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiNodedotjs,
    SiMysql,
    SiPostgresql,
    SiDocker,
    SiGit,
    SiRedis,
    SiPhp
} from 'react-icons/si';
import { IconType } from 'react-icons';

export interface TechItem {
    name: string;
    icon: IconType;
}

export const techStack: TechItem[] = [
    { name: 'Laravel', icon: SiLaravel },
    { name: 'React', icon: SiReact },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
    { name: 'Node.js', icon: SiNodedotjs },
    { name: 'MySQL', icon: SiMysql },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'Docker', icon: SiDocker },
    { name: 'Git', icon: SiGit },
    { name: 'Redis', icon: SiRedis },
    { name: 'PHP', icon: SiPhp },
];