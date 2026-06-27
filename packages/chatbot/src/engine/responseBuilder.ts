export function getResponse(intent: string, language: string = 'en') {
  // Navigation Intents
  if (intent.startsWith('nav_')) {
    return {
      type: 'navigation',
      action: intent
    };
  }

  // Program Intents
  if (intent === 'program_digixplore') {
    return {
      type: 'rich_card',
      data: {
        title: "📘 DigiXplore",
        description: "Our Digital Literacy Program focused on teaching students computer basics, bridging the digital divide.",
        buttons: [
          { label: "Learn More", intent: "nav_programs" },
          { label: "Volunteer Here", intent: "start_form_volunteer" }
        ]
      }
    };
  }

  if (intent === 'program_akshar') {
    return {
      type: 'rich_card',
      data: {
        title: "📝 Akshar",
        description: "Primary education and basic literacy initiative aimed at underprivileged school children.",
        buttons: [
          { label: "Learn More", intent: "nav_programs" },
          { label: "Volunteer Here", intent: "start_form_volunteer" }
        ]
      }
    };
  }

  if (intent === 'program_netritva') {
    return {
      type: 'rich_card',
      data: {
        title: "🚀 Netritva",
        description: "Leadership, career guidance, and financial literacy workshops for high schoolers.",
        buttons: [
          { label: "Learn More", intent: "nav_programs" },
          { label: "Volunteer Here", intent: "start_form_volunteer" }
        ]
      }
    };
  }

  // General Information
  if (intent === 'about_unnati') {
    return {
      type: 'rich_card',
      data: {
        title: "About Unnati Society",
        description: "An Institute Outreach Activity of IIIT Bhagalpur, building futures through education and digital literacy since our founding.",
        buttons: [
          { label: "View Team", intent: "nav_team" },
          { label: "Our Programs", intent: "nav_programs" }
        ]
      }
    };
  }

  if (intent === 'volunteer_main') {
    return {
      type: 'rich_card',
      data: {
        title: "Volunteer with Us! 🤝",
        description: "We are always looking for passionate individuals to teach, mentor, and organize events.",
        buttons: [
          { label: "Apply Now", intent: "start_form_volunteer" },
          { label: "View Programs", intent: "nav_programs" }
        ]
      }
    };
  }

  if (intent === 'outreach_visit') {
    return {
      type: 'rich_card',
      data: {
        title: "Campus Visits 🏫",
        description: "We regularly host school students at the IIIT Bhagalpur campus for tours and workshops.",
        buttons: [
          { label: "Book a Visit", intent: "start_form_visit" }
        ]
      }
    };
  }

  // FAQs
  if (intent === 'faq_paid') {
    return { type: 'text', data: { text: "No, volunteering with Unnati is unpaid. However, you gain immense experience and a certificate of appreciation!" } };
  }
  if (intent === 'faq_certificate') {
    return { type: 'text', data: { text: "Yes! Active volunteers receive a Certificate of Appreciation from IIIT Bhagalpur." } };
  }
  if (intent === 'faq_age') {
    return { type: 'text', data: { text: "We generally welcome college students (18+) as our primary teaching volunteers, but high schoolers can help with events!" } };
  }

  // Empathy
  if (intent === 'volunteer_teach_empathy') {
    return { type: 'text', data: { text: "That's inspiring. Volunteers like you are the reason thousands of students receive quality education. Let me help you find the best way to contribute.\n\nWould you like to start the volunteer application?", buttons: [{label: "Yes, start application", action: "start_form_volunteer"}] } };
  }
  if (intent === 'volunteer_time_empathy') {
    return { type: 'text', data: { text: "That's perfectly okay. Even 2-3 hours a week can make a meaningful difference. We have flexible volunteer opportunities designed for students and working professionals.\n\nWould you like to explore them?", buttons: [{label: "Yes", action: "start_form_volunteer"}] } };
  }

  // Human Escalation
  if (intent === 'human_escalation') {
    return {
      type: 'rich_card',
      data: {
        title: "Speak with a Coordinator",
        description: "I think one of our outreach coordinators would be better suited for this. How would you like to connect?",
        buttons: [
          { label: "📞 Request a Call", action: "start_form_request_call" },
          { label: "💬 WhatsApp", action: "action_whatsapp" },
          { label: "📧 Email Us", action: "start_form_contact_us" }
        ]
      }
    };
  }

  if (intent === 'faq_founders') {
    return {
      type: 'rich_card',
      data: {
        title: "Our Founders",
        description: "Unnati Society was founded by a group of passionate students from IIIT Bhagalpur who wanted to bridge the educational gap in rural areas and provide technical literacy to underprivileged children.",
        buttons: [{ label: "Read Our Story", action: "about_unnati" }]
      }
    };
  }

  if (intent === 'faq_vision') {
    return {
      type: 'rich_card',
      data: {
        title: "Our Vision",
        description: "Our vision is to build futures through education. We aim to empower every child with basic literacy, digital skills, and leadership qualities so they can thrive in the modern world.",
        buttons: [{ label: "View Programs", action: "nav_programs" }]
      }
    };
  }

  if (intent === 'faq_location') {
    return {
      type: 'rich_card',
      data: {
        title: "Our Location",
        description: "We are headquartered at the Indian Institute of Information Technology (IIIT) Bhagalpur campus in Sabour, Bihar (813210).",
        buttons: [
          { label: "Book a Campus Visit", action: "start_form_visit" },
          { label: "Contact Us", action: "nav_contact" }
        ]
      }
    };
  }

  // Conversational Intents
  if (intent === 'greeting') {
    return { type: 'text', data: { text: "Hello there! 👋 I'm the Unnati Assistant. How can I help you today?" } };
  }
  if (intent === 'farewell') {
    return { type: 'text', data: { text: "You're very welcome! Let me know if you need anything else. Have a great day! 😊" } };
  }
  if (intent === 'how_are_you') {
    return { type: 'text', data: { text: "I'm just a bot, but I'm doing great! Ready to help you learn more about Unnati Society." } };
  }
  if (intent === 'who_are_you') {
    return { type: 'text', data: { text: "I'm the Unnati AI Assistant, designed to help you navigate our website, learn about our programs, and help you get involved!" } };
  }
  if (intent === 'help') {
    return {
      type: 'rich_card',
      data: {
        title: "How I can help",
        description: "I can help you explore our programs, find volunteering opportunities, or connect with our team. What would you like to do?",
        buttons: [
          { label: "📚 Programs", action: "nav_programs" },
          { label: "🤝 Volunteer", action: "volunteer_main" },
          { label: "📞 Contact Us", action: "nav_contact" }
        ]
      }
    };
  }
  if (intent === 'executive_body') {
    return {
      type: 'rich_card',
      data: {
        title: "Our Team",
        description: "Unnati Society is driven by a passionate executive body and governing team. You can view our core members and leads here.",
        buttons: [{ label: "View Team", action: "nav_team" }]
      }
    };
  }

  // Final fallback
  return {
    type: 'rich_card',
    data: {
      title: "I'm still learning!",
      description: "I'm not quite sure how to answer that yet. Would you like to explore our programs or speak to a human coordinator?",
      buttons: [
        { label: "📚 Explore Programs", action: "nav_programs" },
        { label: "📞 Speak to Human", action: "human_escalation" }
      ]
    }
  };
}
