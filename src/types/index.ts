export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-100
  trending?: boolean; // Highlight as trending skill
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  longDescription?: string; // For detail page
  technologies: string[];
  achievements?: string[];
  location?: string;
  employmentType?: 'full-time' | 'contract' | 'freelance';
  // Linked projects
  projects?: string[]; // Array of project IDs built at this company
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string; // For detail page
  technologies: string[];
  links: {
    github?: string;
    demo?: string;
    blog?: string;
  };
  image?: string;
  featured?: boolean;
  // Employment cycle linkage
  companyId?: string; // Links to experience.id
  companyName?: string; // Denormalized for display
  customer?: string; // Client/customer name
  projectType?: 'internal' | 'client' | 'opensource' | 'personal';
  status?: 'completed' | 'in-progress' | 'maintained';
}

export interface PortfolioData {
  personal: PersonalInfo;
  about: string;
  skillCategories: SkillCategory[];
  experience: Experience[];
  projects: Project[];
}
