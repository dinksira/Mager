export interface TeamMember {
  image: string;
  name: string;
  role: string;
  desc: string;
}

export const teamData: TeamMember[] = [
  {
    image: 'images/team-1.jpg',
    name: 'Abebe Kebede',
    role: 'CEO & Founder',
    desc: 'Visionary leader with 15+ years in software and business strategy.'
  },
  {
    image: 'images/team-2.jpg',
    name: 'Sara Mulugeta',
    role: 'CTO',
    desc: 'Full-stack architect specializing in distributed systems and cloud.'
  },
  {
    image: 'images/team-3.jpg',
    name: 'Dawit Tadesse',
    role: 'Lead Designer',
    desc: 'Creative designer crafting beautiful and intuitive user experiences.'
  },
  {
    image: 'images/team-4.jpg',
    name: 'Hiwot Girma',
    role: 'Project Manager',
    desc: 'Ensuring every project delivers on time, on scope, and on budget.'
  }
];
