
export const getDefaultResumeTemplate = () => {
  return `# Your Name

**Professional Title** | your.email@example.com | (XXX) XXX-XXXX | City, State
**LinkedIn:** linkedin.com/in/yourname | **GitHub:** github.com/yourusername

---

## Professional Summary

A brief summary about yourself, your experience, and career goals. Keep it to 2-3 sentences and focus on your professional identity and value proposition.

---

## Experience

### Senior Position Title | Company Name | City, State
*Month Year - Present*

• Led a team of X people to accomplish Y, resulting in Z% improvement
• Implemented new process that increased efficiency by X%
• Collaborated with cross-functional teams to deliver project under budget

### Previous Position Title | Previous Company | City, State
*Month Year - Month Year*

• Achieved X by doing Y, which resulted in Z
• Managed project with $X budget and delivered on time
• Improved process efficiency by X% through implementation of Y

---

## Skills

**Programming Languages:** Language 1, Language 2, Language 3
**Frameworks & Tools:** Framework 1, Framework 2, Tool 1, Tool 2
**Soft Skills:** Communication, Leadership, Problem-solving, Teamwork

---

## Education

### Degree | University Name
*Graduation Year*

---

## Projects

### Project Name
• Brief description of the project and your role
• Technologies used and impact achieved
• **Tech Stack:** Technology 1, Technology 2, Technology 3`;
};

export const getDefaultCoverLetterTemplate = () => {
  return `# Cover Letter

**Your Name**
your.email@example.com | (XXX) XXX-XXXX
Date: ${new Date().toLocaleDateString()}

---

**[Hiring Manager Name]**
**[Company Name]**
**[Company Address]**

Dear Hiring Manager,

I am writing to express my strong interest in the **[Position Title]** role at **[Company Name]**. With my background in [your field] and passion for [relevant area], I am excited about the opportunity to contribute to your team.

## Why I'm Interested

Your company's commitment to **[specific company value/mission]** resonates with my professional values. I am particularly drawn to **[specific aspect of the role/company]** and believe my experience in **[relevant skill/experience]** would be valuable to your team.

## What I Bring

In my current role, I have:

• [Specific achievement with metrics]
• [Leadership or collaboration example]
• [Technical or industry-specific accomplishment]
• [Process improvement or innovation example]

## Next Steps

I would welcome the opportunity to discuss how my skills and passion can contribute to **[Company Name]**'s continued success. Thank you for considering my application.

Sincerely,
Your Name

---

*This cover letter was created with ResumeAce*`;
};
