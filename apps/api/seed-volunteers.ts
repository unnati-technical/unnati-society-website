import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mockVolunteers = [
  {
    name: 'Riya Sharma',
    email: 'riya.sharma@email.com',
    phone: '+91 98765 43210',
    program: 'DigiXplore',
    role: 'Teaching Volunteer',
    status: 'PENDING',
    dob: '12 Aug 2002',
    gender: 'Female',
    education: 'B.Tech (Computer Science)',
    college: 'IIT Bhagalpur',
    currentYear: '3rd Year',
    availability: 'Weekends (2-3 hours/day)',
    preferredMode: 'Offline',
    preferredLocation: 'Patna, Bhagalpur',
    address: 'Patna, Bihar - 801503',
    whyVolunteer: 'I want to contribute to society by sharing my knowledge with students and helping them build a better future. Unnati provides the perfect platform to make a meaningful impact at the grassroots level.',
    skills: ['Teaching', 'Public Speaking', 'Leadership', 'Content Creation', 'MS Office', 'Basic Coding'],
    linkedinUrl: 'https://linkedin.com/in/riyasharma',
    howDidYouHear: 'Instagram'
  },
  {
    name: 'Aman Verma',
    email: 'aman.verma@email.com',
    phone: '+91 91234 56789',
    program: 'Akshar',
    role: 'English Mentor',
    status: 'UNDER_REVIEW',
    dob: '25 Nov 2001',
    gender: 'Male',
    education: 'BA (English Literature)',
    college: 'Patna University',
    currentYear: 'Final Year',
    availability: 'Weekdays (Evening)',
    preferredMode: 'Online',
    preferredLocation: 'Remote',
    address: 'Gaya, Bihar - 823001',
    whyVolunteer: 'I believe language is a bridge to opportunities. Helping students improve their English communication will empower them to pursue better careers.',
    skills: ['English Fluency', 'Mentoring', 'Creative Writing', 'Patience'],
    linkedinUrl: 'https://linkedin.com/in/amanverma',
    howDidYouHear: 'College Notice Board'
  },
  {
    name: 'Neha Kumari',
    email: 'neha.kumari@email.com',
    phone: '+91 82345 67890',
    program: 'Netritva',
    role: 'Leadership Volunteer',
    status: 'APPROVED',
    dob: '14 Feb 2000',
    gender: 'Female',
    education: 'MBA (HR)',
    college: 'IIM Bodh Gaya',
    currentYear: '1st Year',
    availability: 'Weekends (Full Day)',
    preferredMode: 'Hybrid',
    preferredLocation: 'Bodh Gaya',
    address: 'Bodh Gaya, Bihar - 824231',
    whyVolunteer: 'Leadership skills are critical for youth today. I want to organize workshops and mentor students to build their confidence and leadership abilities.',
    skills: ['Event Management', 'Public Speaking', 'Team Building', 'Strategic Planning'],
    linkedinUrl: 'https://linkedin.com/in/nehakumari',
    howDidYouHear: 'LinkedIn'
  }
];

async function main() {
  console.log('Seeding volunteers...');

  // Ensure Role exists
  let role = await prisma.role.findFirst({ where: { name: 'VOLUNTEER' } });
  if (!role) {
    role = await prisma.role.create({
      data: {
        name: 'VOLUNTEER',
        permissions: ['READ_VOLUNTEER']
      }
    });
  }

  for (const mv of mockVolunteers) {
    // 1. Create User
    const [firstName, ...lastNames] = mv.name.split(' ');
    const lastName = lastNames.join(' ') || 'User';

    let user = await prisma.user.findUnique({ where: { email: mv.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: mv.email,
          password: 'Password123!',
          firstName,
          lastName,
          roleId: role.id
        }
      });
    }

    // 2. Create Volunteer
    let volunteer = await prisma.volunteer.findUnique({ where: { userId: user.id } });
    if (!volunteer) {
      volunteer = await prisma.volunteer.create({
        data: {
          userId: user.id,
          skills: mv.skills,
          status: mv.status === 'APPROVED' ? 'ACTIVE' : 'INACTIVE'
        }
      });
    }

    // 3. Create VolunteerApplication
    await prisma.volunteerApplication.create({
      data: {
        volunteerId: volunteer.id,
        status: mv.status,
        program: mv.program,
        roleAppliedFor: mv.role,
        phone: mv.phone,
        dob: mv.dob,
        gender: mv.gender,
        education: mv.education,
        college: mv.college,
        currentYear: mv.currentYear,
        availability: mv.availability,
        preferredMode: mv.preferredMode,
        preferredLocation: mv.preferredLocation,
        address: mv.address,
        whyVolunteer: mv.whyVolunteer,
        linkedinUrl: mv.linkedinUrl,
        howDidYouHear: mv.howDidYouHear
      }
    });
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
