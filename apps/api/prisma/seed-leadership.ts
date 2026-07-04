import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env from the api directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const CLOUD_BASE = 'https://res.cloudinary.com/drhkvdtw2/image/upload/w_400,q_auto,f_auto';

const img = (publicId: string) => {
  if (publicId.startsWith('http')) return publicId;
  return `${CLOUD_BASE}/${publicId}`;
};

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('neon.tech') ? true : undefined,
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter } as any);

  console.log('🌱 Seeding Leadership data for 2025-26...\n');

  // --- Create Year ---
  const year = await (prisma as any).leadershipYear.upsert({
    where: { year: '2025-26' },
    update: {},
    create: { year: '2025-26', isActive: true },
  });
  console.log(`✅ Year: ${year.year} (${year.id})`);

  // --- Create Sections ---
  const sectionDefs = [
    { name: 'Executive Body', slug: 'executive-body', badgeColor: 'blue', displayOrder: 0 },
    { name: 'Programs Leads', slug: 'programs-leads', badgeColor: 'blue', displayOrder: 1 },
    { name: 'Public Relations Leads', slug: 'public-relations-leads', badgeColor: 'yellow', displayOrder: 2 },
    { name: 'Technical Leads', slug: 'technical-leads', badgeColor: 'blue', displayOrder: 3 },
  ];

  const sections: Record<string, string> = {};

  for (const s of sectionDefs) {
    const existing = await (prisma as any).leadershipSection.findFirst({
      where: { yearId: year.id, slug: s.slug },
    });
    if (existing) {
      sections[s.slug] = existing.id;
      console.log(`  ♻️  Section exists: ${s.name}`);
    } else {
      const created = await (prisma as any).leadershipSection.create({
        data: { ...s, yearId: year.id, isVisible: true },
      });
      sections[s.slug] = created.id;
      console.log(`  ✅ Section created: ${s.name}`);
    }
  }

  // --- Member Groups ---
  const executiveMembers = [
    { fullName: 'Dheeraj Yadav', designation: 'PRESIDENT', email: 'dheeraj.230101050@iiitbh.ac.in', linkedin: 'https://www.linkedin.com/in/dheeraj-yadav-681325218', profileImage: img('dheeraj_cuclko'), displayOrder: 0 },
    { fullName: 'Ayush Thakur', designation: 'SECRETARY', email: 'ayush.240102123@iiitbh.ac.in', linkedin: 'https://www.linkedin.com/in/ayush-kumar-thakur-544886325/', profileImage: img('ayushThakur_p0kzyf'), displayOrder: 1 },
    { fullName: 'Ayush Yadav', designation: 'JOINT SECRETARY PROGRAMS', email: 'ayush.240102215@iiitbh.ac.in', linkedin: '', profileImage: img('ayushyadv_z0khzd'), displayOrder: 2 },
    { fullName: 'Jayanshu Bhardwaj', designation: 'JOINT SECRETARY PUBLIC RELATION', email: 'jayanshu.240101181@iitbh.ac.in', linkedin: 'https://www.linkedin.com/in/jayanshu-bhardwaj-05a791322/', profileImage: img('jayanshuu_iwno29'), displayOrder: 3 },
    { fullName: 'Twinkle Kumari', designation: 'JOINT SECRETARY TECHNICAL', email: 'twinkle.240101143@iiitbh.ac.in', linkedin: 'https://www.linkedin.com/in/twinkle-kumari-b09306325/', profileImage: img('twinkle_akhjbq'), displayOrder: 4 },
  ];

  const programMembers = [
    { fullName: 'Harsh Kumar Yadav', designation: 'RESEARCH & DEVELOPMENT LEAD', email: 'harsh.240101010@iiitbh.ac.in', linkedin: 'https://www.linkedin.com/in/harsh-kumar-yadav-20844a2b6', profileImage: img('IMG_20251006_094850_-_HARSH_YADAV_drkoll'), department: 'Programs', displayOrder: 0 },
    { fullName: 'Krish Sonkar', designation: 'RESEARCH AND DEVELOPMENT LEAD', email: 'krish.240101127@iiitbh.ac.in', linkedin: '', profileImage: img('1759778636960_-_KRISH_SONKAR_uiuvvy'), department: 'Programs', displayOrder: 1 },
    { fullName: 'Anuj Sah', designation: 'DIGIXPLORE LEAD', email: 'anujah375@gmail.com', linkedin: '', profileImage: img('Anuj_Sah_yohlp3'), department: 'Programs', displayOrder: 2 },
    { fullName: 'Divya', designation: 'DIGIXPLORE LEAD', email: 'divya.240101288@iiitbh.ac.in', linkedin: 'https://www.linkedin.com/in/divya-patlan-4a2018324', profileImage: img('IMG-20260301-WA0099_-_Divya_Patlan_nndf4y'), department: 'Programs', displayOrder: 3 },
    { fullName: 'Jayanshu Bhardwaj', designation: 'NETRITVA LEAD', email: 'jayanshu18@gmail.com', linkedin: 'https://www.linkedin.com/in/jayanshu-bhardwaj-05a791322/', profileImage: img('jayanshu_gdrakx'), department: 'Programs', displayOrder: 4 },
    { fullName: 'Sumendra Singh', designation: 'AKSHAR LEAD', email: '', linkedin: '', profileImage: 'https://ui-avatars.com/api/?name=Sumendra+Singh&background=5B21B6&color=fff&size=256', department: 'Programs', displayOrder: 5 },
    { fullName: 'Sneha Verma', designation: 'AKSHAR LEAD', email: '', linkedin: '', profileImage: 'https://ui-avatars.com/api/?name=Sneha+Verma&background=047857&color=fff&size=256', department: 'Programs', displayOrder: 6 },
    { fullName: 'Navneet Jaiswal', designation: 'OPERATIONS LEAD', email: 'navneet.240101028@iiitbh.ac.in', linkedin: 'https://www.linkedin.com/in/navneet-jaiswal-8aa05b322', profileImage: img('IMG_20260413_104213_-_Navneet_Jaiswal_1_stokob'), department: 'Programs', displayOrder: 7 },
    { fullName: 'Prabhat Rai', designation: 'OPERATIONS LEAD', email: 'prabhat.240103257@iiitbh.ac.in', linkedin: 'https://www.linkedin.com/in/prabhat-rai', profileImage: img('prabhat_-_Prabhat_Rai_jax0i7'), department: 'Programs', displayOrder: 8 },
  ];

  const prMembers = [
    { fullName: 'Sanjana Adhikari', designation: 'SOCIAL MEDIA LEAD', email: 'sanjana.240102169@iiitbh.ac.in', linkedin: 'https://www.linkedin.com/in/sanjana-adhikari-541bab2a3', profileImage: img('pic_-_Sanjana_Adhikari_lxddhm'), displayOrder: 0 },
    { fullName: 'Shashank Shekhar', designation: 'EVENT & MEMBERSHIP COORDINATOR', email: 'shashankshekhar2734@gmail.com', linkedin: 'https://www.linkedin.com/in/shashank-shekhar-4b6179339/', profileImage: img('shashankk_bbihmd'), displayOrder: 1 },
    { fullName: 'Anushka Sonkar', designation: 'EVENT AND MEMBERSHIP COORDINATOR', email: 'anushka.240102057@iiitbh.ac.in', linkedin: 'https://www.linkedin.com/in/anushka-sonkar-2b9ba5324', profileImage: img('Screenshot_2026-04-20_190608_s86hsv'), displayOrder: 2 },
    { fullName: 'Sukrit Aryan', designation: 'DESIGN AND CONTENT LEAD', email: 'sukritaryan1@gmail.com', linkedin: 'https://www.linkedin.com/in/sukrit-aryan', profileImage: img('Sukrit_Aryan_xgrmzg'), displayOrder: 3 },
    { fullName: 'Satyak Atul Govindwar', designation: 'OUTREACH LEAD', email: 'satyakatulgovindwar@gmail.com', linkedin: 'https://www.linkedin.com/in/satyak-govindwar-6b2246324', profileImage: img('SATYAK_GOVINDWAR_nshcyu'), displayOrder: 4 },
  ];

  const technicalMembers = [
    { fullName: 'Twinkle Kumari', designation: 'WEB DEVELOPMENT LEAD', email: 'twinkle.240101143@iiitbh.ac.in', linkedin: 'https://www.linkedin.com/in/twinkle-kumari-b09306325/', profileImage: img('twinkle_akhjbq'), displayOrder: 0 },
    { fullName: 'Ishani Karpoor', designation: 'APP DEVELOPMENT LEAD', email: 'ishani.240103291@iiitbh.ac.in', linkedin: 'https://www.linkedin.com/in/ishani-karpoor-8a73b1312', profileImage: img('ishani_punner'), displayOrder: 1 },
  ];

  const groups = [
    { slug: 'executive-body', members: executiveMembers },
    { slug: 'programs-leads', members: programMembers },
    { slug: 'public-relations-leads', members: prMembers },
    { slug: 'technical-leads', members: technicalMembers },
  ];

  for (const group of groups) {
    const sectionId = sections[group.slug];
    if (!sectionId) { console.log(`\n⚠️  Skipping ${group.slug}`); continue; }

    console.log(`\n👥 Seeding ${group.members.length} members → ${group.slug}`);
    await (prisma as any).leadershipMember.deleteMany({ where: { sectionId } });

    for (const member of group.members) {
      await (prisma as any).leadershipMember.create({
        data: {
          sectionId,
          fullName: member.fullName,
          designation: member.designation,
          email: (member as any).email || null,
          linkedin: (member as any).linkedin || null,
          profileImage: (member as any).profileImage || null,
          department: (member as any).department || null,
          displayOrder: member.displayOrder,
          isPublished: true,
        },
      });
      console.log(`  ✅ ${member.fullName}`);
    }
  }

  await prisma.$disconnect();
  await pool.end();
  console.log('\n🎉 Done! 2025-26 leadership data seeded successfully.');
}

main().catch(e => { console.error(e); process.exit(1); });
