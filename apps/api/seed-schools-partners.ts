import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const mockSchools = [
  {
    name: 'Govt. High School, Bhagalpur',
    city: 'Bhagalpur',
    district: 'Bhagalpur',
    address: 'Station Road, Bhagalpur, Bihar - 812001',
    contactPerson: 'Ramesh Kumar',
    contactEmail: 'principalghs@gmail.com',
    contactPhone: '9876543210',
    programs: ['Digital Literacy', 'Career Guidance'],
    status: 'Active',
    studentsCount: 320,
    schoolType: 'Government',
    schoolCategory: 'Secondary',
    affiliation: 'BSEB',
    establishedYear: '1985',
    grades: '6th to 10th',
    teachersCount: 28,
    about: 'Government High School, Bhagalpur is committed to providing quality education to students from diverse backgrounds. We actively collaborate with Unnati Society for digital literacy and career development initiatives.',
    focusAreas: ['Education', 'Digital Literacy', 'Career Guidance', 'Life Skills', 'Awareness'],
  },
  {
    name: 'Kendriya Vidyalaya, Bhagalpur',
    city: 'Bhagalpur',
    district: 'Bhagalpur',
    address: 'KV Campus, Bhagalpur, Bihar',
    contactPerson: 'Anjali Singh',
    contactEmail: 'anjali@kvbhagalpur.edu.in',
    contactPhone: '9123456789',
    programs: ['Leadership', 'Cyber Awareness'],
    status: 'Active',
    studentsCount: 680,
    schoolType: 'Government',
    schoolCategory: 'Senior Secondary',
    affiliation: 'CBSE',
    establishedYear: '1975',
    grades: '1st to 12th',
    teachersCount: 45,
    about: 'A premier educational institution fostering excellence in academics and extracurricular activities.',
    focusAreas: ['Leadership', 'STEM', 'Cyber Safety'],
  },
  {
    name: 'Adarsh Middle School',
    city: 'Sultanganj',
    district: 'Bhagalpur',
    address: 'Sultanganj Market, Bihar',
    contactPerson: 'Vikash Kumar',
    contactEmail: 'vikash.adarsh@gmail.com',
    contactPhone: '9900887766',
    programs: ['Digital Literacy'],
    status: 'Active',
    studentsCount: 210,
    schoolType: 'Government Aided',
    schoolCategory: 'Middle School',
    affiliation: 'BSEB',
    establishedYear: '1990',
    grades: '1st to 8th',
    teachersCount: 15,
    about: 'Focused on primary and middle education for local community children.',
    focusAreas: ['Digital Literacy', 'Foundational Learning'],
  }
];

const mockPartners = [
  {
    organization: 'TechSolutions Pvt. Ltd.',
    type: 'Corporate',
    contactPerson: 'Anjali Singh',
    email: 'anjali.singh@techsolutions.com',
    phone: '9123456700',
    focusArea: 'Digital Education',
    status: 'Active',
    website: 'www.techsolutions.com',
    city: 'Patna',
    address: '3rd Floor, Tech Park, Patna, Bihar - 800001',
    about: 'TechSolutions Pvt. Ltd. is a technology company committed to social impact. We partner with Unnati Society to provide digital education resources, volunteer support, and technology infrastructure.',
    highlights: ['Providing digital literacy resources', 'Volunteer engagement & mentoring', 'Supporting workshops & events', 'CSR funding for programs'],
  },
  {
    name: 'Helping Hands Foundation', // Organization field
    organization: 'Helping Hands Foundation',
    type: 'NGO',
    contactPerson: 'Amit Verma',
    email: 'amit@helpinghands.org',
    phone: '9876543210',
    focusArea: 'Child Education',
    status: 'Active',
    website: 'www.helpinghands.org',
    city: 'Delhi',
    address: 'New Delhi, India',
    about: 'A non-profit organization dedicated to improving access to quality education for underprivileged children.',
    highlights: ['Joint educational programs', 'Resource sharing', 'Community mobilization'],
  },
  {
    organization: 'Bhagalpur District Education Office',
    type: 'Government',
    contactPerson: 'Sanjay Kumar',
    email: 'deo.bhagalpur@gov.in',
    phone: '7766554433',
    focusArea: 'School Support',
    status: 'Active',
    website: 'bhagalpur.nic.in',
    city: 'Bhagalpur',
    address: 'Collectorate Campus, Bhagalpur',
    about: 'The district education office overseeing public schools in Bhagalpur district.',
    highlights: ['Policy alignment', 'School access permissions', 'Teacher training support'],
  }
];

async function main() {
  console.log('Seeding schools and partners...');

  for (const s of mockSchools) {
    let existing = await prisma.school.findFirst({ where: { name: s.name } });
    if (!existing) {
      await prisma.school.create({ data: s });
    }
  }

  for (const p of mockPartners) {
    let existing = await prisma.partner.findFirst({ where: { organization: p.organization } });
    if (!existing) {
      // Destructure out 'name' if it exists to match schema
      const { name, ...partnerData } = p as any; 
      await prisma.partner.create({ data: partnerData });
    }
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
