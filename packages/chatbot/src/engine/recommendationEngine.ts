import { ContextManager } from './contextManager';

export function getRecommendations() {
  const context = ContextManager.getInstance();
  const profile = context.getUserProfile();

  const recommendations = [];

  // Logic to determine recommendations based on profile
  if (profile.skills === 'computer science' || profile.skills === 'cs' || profile.skills === 'coding') {
    recommendations.push("• DigiXplore Volunteer\n• Web Development\n• Technical Volunteer");
  } else if (profile.skills === 'design' || profile.skills === 'photography' || profile.skills === 'writing') {
    recommendations.push("• Creative Content Volunteer\n• Social Media Team");
  } else if (profile.profession === 'teacher') {
    recommendations.push("• Akshar Volunteer (Primary Education)\n• Digital Literacy Workshop Mentor");
  } else {
    // Default recommendations
    recommendations.push("• DigiXplore Volunteer\n• Akshar Volunteer\n• Outreach Ambassador");
  }

  // Location filter string
  let locationString = profile.city ? `Since you're in **${profile.city.charAt(0).toUpperCase() + profile.city.slice(1)}**, ` : '';
  let skillString = profile.skills ? `and have skills in **${profile.skills}**, ` : '';
  
  if (profile.profession === 'student') {
    skillString = profile.skills ? `and study **${profile.skills}**, ` : '';
  }

  const prefix = (locationString || skillString) 
    ? `${locationString}${skillString}I'd highly recommend these roles for you:` 
    : `Based on your profile, I'd recommend these roles for you:`;

  return {
    type: 'text',
    data: {
      text: `${prefix}\n\n${recommendations.join('\n')}`,
      buttons: [
        { label: "Apply Now", action: "start_form_volunteer" },
        { label: "Learn More", action: "nav_programs" }
      ]
    }
  };
}
