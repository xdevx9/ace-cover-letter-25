
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Briefcase, Code, Heart, GraduationCap, Building } from "lucide-react";

interface TemplatesDialogProps {
  onApplyTemplate: (content: string) => void;
  activeMode: 'resume' | 'cover-letter';
}

export function TemplatesDialog({ onApplyTemplate, activeMode }: TemplatesDialogProps) {
  const [open, setOpen] = useState(false);

  const resumeTemplates = [
    {
      id: 'modern-tech',
      name: 'Modern Tech Resume',
      icon: Code,
      category: 'Technology',
      description: 'Perfect for software developers and tech professionals',
      content: `# John Doe

**Senior Software Engineer** | john.doe@email.com | (555) 123-4567 | San Francisco, CA
**LinkedIn:** linkedin.com/in/johndoe | **GitHub:** github.com/johndoe | **Portfolio:** johndoe.dev

---

## Professional Summary

Senior Software Engineer with 6+ years of experience building scalable web applications and leading development teams. Expertise in React, Node.js, and cloud technologies. Proven track record of delivering high-impact products that serve millions of users.

---

## Technical Skills

**Frontend:** React, TypeScript, Vue.js, HTML5, CSS3, Tailwind CSS, Redux
**Backend:** Node.js, Express, Python, Django, RESTful APIs, GraphQL
**Database:** PostgreSQL, MongoDB, Redis, Elasticsearch
**Cloud & DevOps:** AWS, Docker, Kubernetes, CI/CD, Terraform
**Tools:** Git, Jest, Cypress, Figma, JIRA, Agile/Scrum

---

## Professional Experience

### Senior Software Engineer | TechCorp Inc. | San Francisco, CA
*March 2021 - Present*

• Led a team of 5 engineers to rebuild the core platform, resulting in 40% improved performance
• Architected and implemented microservices infrastructure serving 2M+ daily active users
• Reduced deployment time by 60% through implementation of automated CI/CD pipelines
• Mentored junior developers and established code review processes

### Software Engineer | StartupXYZ | San Francisco, CA
*June 2019 - March 2021*

• Developed React-based dashboard that increased user engagement by 35%
• Built scalable APIs handling 100K+ requests per minute
• Collaborated with product and design teams in Agile environment
• Implemented automated testing suite, reducing bugs in production by 50%

### Junior Software Engineer | WebSolutions | Remote
*August 2018 - June 2019*

• Created responsive web applications using React and Node.js
• Optimized database queries resulting in 25% faster page load times
• Participated in code reviews and contributed to technical documentation

---

## Education

### Bachelor of Science in Computer Science | UC Berkeley | 2018
**Relevant Coursework:** Data Structures, Algorithms, Database Systems, Software Engineering
**GPA:** 3.8/4.0

---

## Projects

### E-Commerce Platform
• Built full-stack e-commerce solution with React, Node.js, and PostgreSQL
• Implemented secure payment processing using Stripe API
• **Technologies:** React, Node.js, PostgreSQL, Stripe, AWS

### Real-Time Chat Application
• Developed WebSocket-based chat app with real-time messaging
• Supports file sharing and group conversations
• **Technologies:** React, Socket.io, MongoDB, Express

---

## Certifications

• AWS Certified Solutions Architect - Associate (2022)
• Certified Kubernetes Application Developer (2021)`
    },
    {
      id: 'business-executive',
      name: 'Executive Business Resume',
      icon: Building,
      category: 'Business',
      description: 'Ideal for business leaders and executives',
      content: `# Sarah Johnson

**Chief Marketing Officer** | sarah.johnson@email.com | (555) 987-6543 | New York, NY
**LinkedIn:** linkedin.com/in/sarahjohnson

---

## Executive Summary

Strategic marketing executive with 12+ years of experience driving growth for Fortune 500 companies. Proven ability to build and lead high-performing teams, develop innovative marketing strategies, and deliver measurable business results. Expertise in digital transformation, brand management, and customer acquisition.

---

## Core Competencies

**Strategic Leadership:** Team Building, Change Management, P&L Responsibility, Board Presentations
**Marketing Expertise:** Digital Marketing, Brand Strategy, Customer Acquisition, Marketing Analytics
**Business Development:** Partnership Development, Market Expansion, Revenue Growth, Customer Retention
**Technologies:** Salesforce, HubSpot, Google Analytics, Adobe Creative Suite, Marketing Automation

---

## Professional Experience

### Chief Marketing Officer | GlobalTech Solutions | New York, NY
*January 2020 - Present*

• Increased company revenue by 85% through innovative digital marketing strategies
• Built and managed marketing team of 25+ professionals across multiple disciplines
• Launched successful rebranding initiative that improved brand recognition by 150%
• Established strategic partnerships resulting in $50M+ in new business opportunities

### VP of Marketing | InnovateCorp | Boston, MA
*March 2017 - December 2019*

• Led digital transformation initiative that increased online leads by 200%
• Managed $15M annual marketing budget across multiple channels and campaigns
• Implemented marketing automation platform improving conversion rates by 45%
• Developed content marketing strategy that positioned company as industry thought leader

### Marketing Director | StartupGrowth | San Francisco, CA
*June 2014 - February 2017*

• Scaled marketing operations during company growth from 50 to 500 employees
• Launched product marketing campaigns that drove 300% increase in customer acquisition
• Established marketing analytics framework providing actionable insights for leadership
• Managed cross-functional teams including design, content, and digital marketing

### Senior Marketing Manager | TechVentures | Austin, TX
*August 2012 - May 2014*

• Developed go-to-market strategies for 5+ product launches
• Increased qualified leads by 180% through targeted demand generation campaigns
• Managed vendor relationships and negotiated contracts saving company $500K annually
• Created customer segmentation strategy that improved campaign ROI by 65%

---

## Education

### MBA in Marketing | Harvard Business School | 2012
### Bachelor of Business Administration | University of Texas at Austin | 2010

---

## Achievements & Recognition

• Named "Marketing Executive of the Year" by Marketing Leadership Council (2022)
• Featured speaker at major industry conferences including MarketingProfs and Content Marketing World
• Published thought leadership articles in Harvard Business Review and Forbes
• Led marketing team to win "Campaign of the Year" award from American Marketing Association

---

## Board Positions & Affiliations

• Board Member, Marketing Professionals Association (2021-Present)
• Advisory Board, TechStartup Accelerator (2020-Present)
• Member, Chief Marketing Officer Council`
    },
    {
      id: 'creative-designer',
      name: 'Creative Designer Resume',
      icon: Heart,
      category: 'Creative',
      description: 'Perfect for designers, artists, and creative professionals',
      content: `# Alex Chen

**Senior UX/UI Designer** | alex.chen@email.com | (555) 456-7890 | Los Angeles, CA
**Portfolio:** alexchen.design | **LinkedIn:** linkedin.com/in/alexchen | **Dribbble:** dribbble.com/alexchen

---

## Creative Summary

Award-winning UX/UI Designer with 7+ years of experience creating intuitive digital experiences for web and mobile applications. Passionate about user-centered design and translating complex problems into elegant, accessible solutions. Expertise in design systems, prototyping, and cross-functional collaboration.

---

## Design Skills

**Design Tools:** Figma, Sketch, Adobe Creative Suite, Principle, InVision, Framer
**UX Methods:** User Research, Wireframing, Prototyping, Usability Testing, Information Architecture
**Frontend:** HTML5, CSS3, JavaScript, React, Responsive Design, Accessibility (WCAG)
**Collaboration:** Design Systems, Agile/Scrum, Cross-functional Teams, Stakeholder Management

---

## Professional Experience

### Senior UX/UI Designer | DesignForward Agency | Los Angeles, CA
*February 2021 - Present*

• Led design for 15+ client projects including e-commerce, SaaS, and mobile applications
• Increased client satisfaction scores by 40% through improved design process and deliverables
• Established design system that reduced design-to-development handoff time by 50%
• Mentored junior designers and established design critique processes

**Key Projects:**
- **E-commerce Redesign:** Improved conversion rate by 65% for major retail client
- **Mobile Banking App:** Designed award-winning app with 4.8-star rating and 1M+ downloads
- **Healthcare Dashboard:** Created intuitive interface for medical professionals used by 500+ hospitals

### UX/UI Designer | TechStartup Inc. | San Francisco, CA
*May 2019 - January 2021*

• Designed end-to-end user experiences for B2B SaaS platform serving 100K+ users
• Conducted user research and usability testing that informed product strategy
• Collaborated with product and engineering teams in fast-paced startup environment
• Created design system and component library adopted across multiple product lines

### Junior Designer | CreativeStudio | San Diego, CA
*September 2017 - April 2019*

• Designed marketing materials, websites, and digital campaigns for diverse client portfolio
• Produced high-quality visual designs under tight deadlines
• Collaborated with copywriters, developers, and account managers
• Participated in client presentations and design reviews

---

## Education

### Bachelor of Fine Arts in Graphic Design | Art Center College of Design | 2017
**Relevant Coursework:** Typography, Color Theory, Digital Design, User Experience Design
**Honors:** Magna Cum Laude, Dean's List

---

## Featured Projects

### MindfulMeals - Recipe & Meal Planning App
• Designed complete mobile experience from concept to launch
• Conducted user interviews and iterative testing with 50+ participants
• App featured in App Store "Apps We Love" section
• **Tools Used:** Figma, Principle, Marvel, Optimal Workshop

### EcoTracker - Environmental Impact Dashboard
• Created data visualization dashboard for environmental monitoring
• Won "Best Design" award at Sustainable Tech Conference 2022
• **Tools Used:** Figma, D3.js, After Effects

### AccessFirst - Accessibility Design System
• Developed comprehensive design system focused on accessibility
• Open-sourced project with 1,000+ GitHub stars
• **Tools Used:** Figma, Storybook, React

---

## Awards & Recognition

• UX Design Awards - Gold Winner (2022, 2021)
• Webby Awards - Honoree for Mobile Apps (2021)
• Communication Arts - Design Annual Winner (2020)
• Featured in "30 Under 30 Designers to Watch" by Design Magazine (2020)

---

## Speaking & Community

• Speaker at UX Week, Design+Research, and Adobe MAX conferences
• Organizer of LA UX Meetup (500+ members)
• Volunteer design work for local nonprofits
• Guest lecturer at Art Center College of Design`
    },
    {
      id: 'recent-graduate',
      name: 'Recent Graduate Resume',
      icon: GraduationCap,
      category: 'Entry Level',
      description: 'Great for new graduates and entry-level positions',
      content: `# Emily Rodriguez

**Computer Science Graduate** | emily.rodriguez@email.com | (555) 234-5678 | Austin, TX
**LinkedIn:** linkedin.com/in/emilyrodriguez | **GitHub:** github.com/emilyrodriguez

---

## Objective

Recent Computer Science graduate with strong foundation in software development and passion for creating innovative solutions. Seeking an entry-level software engineer position where I can apply my technical skills and contribute to meaningful projects while continuing to learn and grow.

---

## Education

### Bachelor of Science in Computer Science | University of Texas at Austin | May 2024
**GPA:** 3.7/4.0 | **Magna Cum Laude**
**Relevant Coursework:** Data Structures & Algorithms, Software Engineering, Database Systems, Web Development, Machine Learning, Computer Networks

**Academic Achievements:**
• Dean's List: Fall 2022, Spring 2023, Fall 2023
• CS Department Outstanding Student Award (2024)
• Member of Upsilon Pi Epsilon (Computer Science Honor Society)

---

## Technical Skills

**Programming Languages:** Python, Java, JavaScript, C++, SQL, HTML/CSS
**Frameworks & Libraries:** React, Node.js, Express, Django, Flask, Bootstrap
**Tools & Technologies:** Git, Docker, AWS, MySQL, PostgreSQL, MongoDB, RESTful APIs
**Development:** Agile/Scrum, Test-Driven Development, Object-Oriented Programming

---

## Projects

### TaskMaster - Full-Stack Task Management App
*Personal Project | March 2024 - May 2024*
• Developed responsive web application using React frontend and Node.js backend
• Implemented user authentication, real-time updates, and task categorization features
• Deployed on AWS with PostgreSQL database and achieved 99% uptime
• **Technologies:** React, Node.js, Express, PostgreSQL, AWS, Socket.io

### Weather Analytics Dashboard
*Academic Capstone Project | January 2024 - May 2024*
• Built data visualization dashboard analyzing weather patterns using machine learning
• Collected and processed 10+ years of weather data from multiple APIs
• Implemented predictive models achieving 85% accuracy in weather forecasting
• **Technologies:** Python, Django, Pandas, Scikit-learn, Chart.js, MySQL

### Study Group Matcher
*Hackathon Project - Winner "Best Student Solution" | October 2023*
• Created mobile-responsive platform connecting students for study groups
• Developed matching algorithm based on courses, schedules, and learning preferences
• Built in 48 hours with team of 4 developers
• **Technologies:** JavaScript, React, Firebase, Google Maps API

### Personal Portfolio Website
*Ongoing Project | September 2023 - Present*
• Designed and developed responsive portfolio showcasing projects and skills
• Implemented dark mode, smooth animations, and mobile-first design
• Integrated contact form with email notifications
• **Technologies:** React, TypeScript, Tailwind CSS, Netlify

---

## Experience

### Software Development Intern | TechSolutions Inc. | Austin, TX
*Summer 2023 (June - August)*
• Contributed to development of customer management system used by 500+ clients
• Fixed 15+ bugs and implemented 3 new features improving user experience
• Participated in daily standups, code reviews, and sprint planning meetings
• Collaborated with senior developers using Git workflows and Agile methodologies

### Teaching Assistant - Intro to Programming | UT Austin
*Fall 2023 - Spring 2024*
• Assisted professor in teaching Python programming to 200+ students
• Conducted weekly lab sessions and office hours helping students with assignments
• Graded assignments and provided detailed feedback to improve learning outcomes
• Developed supplementary learning materials that improved class performance by 15%

### Freelance Web Developer
*January 2023 - Present*
• Built responsive websites for 5+ local small businesses
• Collaborated with clients to understand requirements and deliver custom solutions
• Managed projects from initial consultation through deployment and maintenance
• Increased client online presence and customer engagement by average of 40%

---

## Leadership & Activities

### President | Computer Science Student Association | 2023-2024
• Led organization of 200+ members, organizing events and workshops
• Coordinated industry networking events with 50+ tech professionals
• Increased membership by 30% through improved outreach and programming

### Volunteer | Code for Austin | 2022-2024
• Contributed to open-source civic technology projects
• Helped build digital solutions for local nonprofits and government agencies
• Participated in monthly civic hack nights and community events

### Mentor | Girls Who Code Chapter | 2023-2024
• Mentored high school students learning programming fundamentals
• Organized workshops on web development and career guidance
• Helped increase chapter participation by 25%

---

## Certifications & Additional Skills

• AWS Cloud Practitioner Certification (2024)
• Google Analytics Certified (2023)
• Fluent in Spanish and English
• Adobe Creative Suite proficiency
• Excellent written and verbal communication skills`
    }
  ];

  const coverLetterTemplates = [
    {
      id: 'tech-application',
      name: 'Tech Position Cover Letter',
      icon: Code,
      category: 'Technology',
      description: 'Perfect for software engineering and tech roles',
      content: `# Cover Letter

**John Doe**
john.doe@email.com | (555) 123-4567 | San Francisco, CA
LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

${new Date().toLocaleDateString()}

---

**Sarah Johnson**
**Head of Engineering**
**TechInnovate Inc.**
**123 Tech Street, San Francisco, CA 94105**

Dear Ms. Johnson,

I am writing to express my strong interest in the **Senior Software Engineer** position at TechInnovate Inc. As a passionate technologist with 6+ years of experience building scalable applications and leading development teams, I am excited about the opportunity to contribute to your mission of revolutionizing the fintech industry.

## Why TechInnovate

Your company's commitment to **financial inclusion** and **innovative payment solutions** resonates deeply with my professional values. I am particularly impressed by your recent launch of the micro-lending platform that has already helped over 100,000 small business owners access capital. The opportunity to work on products that make a real difference in people's lives is exactly what drives my passion for technology.

## What I Bring

In my current role as Senior Software Engineer at TechCorp, I have:

• **Led architecture redesign** that improved application performance by 40% and reduced server costs by $200K annually
• **Mentored a team of 5 engineers** while maintaining 99.9% uptime for services handling 2M+ daily transactions
• **Spearheaded adoption of microservices architecture** using Docker and Kubernetes, reducing deployment time from hours to minutes
• **Collaborated with product and design teams** to launch 3 major features that increased user engagement by 35%

My expertise in **React, Node.js, and AWS** aligns perfectly with your current tech stack, and my experience with **financial APIs and payment processing** would allow me to contribute immediately to your core platform development.

## Technical Leadership

Beyond coding, I'm passionate about building great engineering cultures. I've established code review processes, implemented automated testing that reduced production bugs by 50%, and created documentation standards that improved team onboarding time by 60%. I believe technology is at its best when it's built by diverse, collaborative teams focused on solving real problems.

## Next Steps

I would welcome the opportunity to discuss how my technical skills, leadership experience, and passion for fintech can contribute to TechInnovate's continued growth. I'm particularly excited about the challenges of scaling your platform to serve millions of users while maintaining the security and reliability that financial services demand.

Thank you for considering my application. I look forward to the possibility of joining your innovative team.

Best regards,
John Doe

---

*This cover letter was crafted with ResumeAce*`
    },
    {
      id: 'business-executive-cover',
      name: 'Executive Position Cover Letter',
      icon: Building,
      category: 'Business',
      description: 'Ideal for leadership and executive roles',
      content: `# Cover Letter

**Sarah Johnson**
sarah.johnson@email.com | (555) 987-6543 | New York, NY
LinkedIn: linkedin.com/in/sarahjohnson

${new Date().toLocaleDateString()}

---

**Michael Chen**
**Chief Executive Officer**
**GrowthVentures Corp.**
**456 Business Avenue, New York, NY 10001**

Dear Mr. Chen,

I am writing to express my interest in the **Chief Marketing Officer** position at GrowthVentures Corp. With over 12 years of progressive marketing leadership experience and a proven track record of driving growth for Fortune 500 companies, I am excited about the opportunity to lead your marketing organization through its next phase of expansion.

## Strategic Vision for Growth

Your company's recent expansion into emerging markets and commitment to **sustainable business practices** aligns perfectly with my experience and values. Having successfully led similar international expansions at GlobalTech Solutions, where I increased revenue by 85% over three years, I understand the unique challenges and opportunities that come with scaling operations globally while maintaining brand consistency and market relevance.

## Executive Leadership Experience

As Chief Marketing Officer at GlobalTech Solutions, I have:

• **Built and led a high-performing marketing team of 25+ professionals** across digital marketing, brand management, content creation, and analytics
• **Managed a $15M annual budget** while delivering 300% ROI through strategic campaign optimization and innovative partnership development
• **Orchestrated a complete digital transformation** that increased online leads by 200% and established the company as a thought leader in the industry
• **Developed strategic partnerships** with key industry players, resulting in $50M+ in new business opportunities and expanded market reach

## Transformational Results

My approach to marketing leadership combines data-driven strategy with creative innovation. At InnovateCorp, I led the implementation of marketing automation platforms that improved conversion rates by 45%, while simultaneously launching a rebranding initiative that increased brand recognition by 150%. This dual focus on operational excellence and brand building has been central to my success in driving both short-term results and long-term value creation.

## Cultural Leadership & Board Experience

Beyond operational results, I'm passionate about building inclusive, high-performance cultures. I currently serve on the board of the Marketing Professionals Association and have been recognized as "Marketing Executive of the Year" by the Marketing Leadership Council. My experience presenting to boards and working with C-suite executives has prepared me to be a strategic partner in driving overall business objectives, not just marketing metrics.

## Vision for GrowthVentures

I'm particularly excited about the opportunity to leverage emerging technologies like AI and machine learning to create more personalized customer experiences while maintaining the authentic brand voice that has made GrowthVentures successful. My experience with marketing analytics and customer segmentation would enable us to optimize our approach across all markets and customer segments.

## Next Steps

I would welcome the opportunity to discuss my vision for accelerating GrowthVentures' marketing strategy and contributing to your ambitious growth goals. I'm confident that my combination of strategic thinking, operational excellence, and proven leadership can help drive the company to new heights.

Thank you for your consideration. I look forward to the possibility of joining your executive team.

Sincerely,
Sarah Johnson

---

*This cover letter was crafted with ResumeAce*`
    },
    {
      id: 'creative-cover',
      name: 'Creative Role Cover Letter',
      icon: Heart,
      category: 'Creative',
      description: 'Perfect for design and creative positions',
      content: `# Cover Letter

**Alex Chen**
alex.chen@email.com | (555) 456-7890 | Los Angeles, CA
Portfolio: alexchen.design | LinkedIn: linkedin.com/in/alexchen

${new Date().toLocaleDateString()}

---

**Emma Martinez**
**Creative Director**
**DesignForward Studio**
**789 Creative Boulevard, Los Angeles, CA 90028**

Dear Emma,

I am thrilled to apply for the **Senior UX/UI Designer** position at DesignForward Studio. As an award-winning designer with 7+ years of experience creating digital experiences that delight users and drive business results, I'm excited about the opportunity to contribute to your team's reputation for pushing creative boundaries while solving complex user problems.

## Passion for Human-Centered Design

Your studio's commitment to **inclusive design** and **accessibility-first approach** deeply resonates with my design philosophy. I've seen firsthand how thoughtful design can break down barriers and create experiences that work for everyone. My recent work on the AccessFirst design system, which has gained recognition in the design community with 1,000+ GitHub stars, reflects my dedication to making digital experiences accessible to all users.

## Creative Problem-Solving Experience

In my current role as Senior UX/UI Designer at DesignForward Agency, I have:

• **Led design for 15+ client projects** spanning e-commerce, SaaS platforms, and mobile applications, consistently exceeding client expectations and business objectives
• **Increased conversion rates by 65%** for a major retail client through comprehensive UX research and iterative design improvements
• **Created design systems** that reduced design-to-development handoff time by 50%, enabling faster iteration and more consistent user experiences
• **Mentored junior designers** and established design critique processes that improved team collaboration and design quality

## Award-Winning Design Excellence

My work has been recognized with UX Design Awards (Gold Winner 2022, 2021) and a Webby Awards Honoree for Mobile Apps. The MindfulMeals app I designed was featured in the App Store's "Apps We Love" section and has maintained a 4.8-star rating with over 1 million downloads. These achievements reflect my ability to balance user needs, business objectives, and technical constraints to create truly exceptional digital experiences.

## Collaborative Innovation

I believe the best design happens through collaboration. My experience working closely with product managers, developers, and stakeholders has taught me how to advocate for users while understanding business constraints. I've conducted user interviews with 200+ participants across various projects, and this research-driven approach has consistently led to design decisions that improve both user satisfaction and business metrics.

## Vision for DesignForward

I'm particularly excited about your studio's recent work in **sustainable design** and **emerging technologies**. My background in frontend development (HTML, CSS, JavaScript, React) allows me to design with implementation in mind, ensuring that creative visions become reality. I'm eager to contribute to projects that not only look beautiful but also consider their environmental impact and long-term sustainability.

## Community & Growth

Beyond client work, I'm actively involved in the design community as an organizer of the LA UX Meetup (500+ members) and a speaker at conferences including UX Week and Adobe MAX. This community involvement keeps me connected to industry trends and emerging best practices, which I love sharing with teams to foster continuous learning and growth.

## Next Steps

I would love the opportunity to discuss how my design expertise, collaborative approach, and passion for creating meaningful user experiences can contribute to DesignForward Studio's continued success. I'm excited about the possibility of working with your talented team to create digital experiences that make a positive impact.

Thank you for considering my application. I look forward to sharing my portfolio and discussing how we can create something amazing together.

Creatively yours,
Alex Chen

---

*This cover letter was crafted with ResumeAce*`
    },
    {
      id: 'entry-level-cover',
      name: 'Entry Level Cover Letter',
      icon: GraduationCap,
      category: 'Entry Level',
      description: 'Great for new graduates and career changers',
      content: `# Cover Letter

**Emily Rodriguez**
emily.rodriguez@email.com | (555) 234-5678 | Austin, TX
LinkedIn: linkedin.com/in/emilyrodriguez | GitHub: github.com/emilyrodriguez

${new Date().toLocaleDateString()}

---

**David Kim**
**Engineering Manager**
**TechStartup Inc.**
**321 Innovation Drive, Austin, TX 78701**

Dear Mr. Kim,

I am excited to apply for the **Junior Software Engineer** position at TechStartup Inc. As a recent Computer Science graduate from UT Austin with a passion for building innovative solutions and a strong foundation in software development, I am eager to begin my career with a company known for its cutting-edge technology and collaborative culture.

## Why TechStartup Inc.

Your company's mission to **democratize access to financial services** and your commitment to **using technology for social good** aligns perfectly with my values and career aspirations. I'm particularly impressed by your recent B-Series funding and the rapid growth of your mobile platform, which has already helped over 500,000 users manage their finances more effectively. The opportunity to contribute to products that make a real difference in people's lives is exactly what motivated me to pursue computer science.

## Academic Excellence & Technical Foundation

During my studies at UT Austin, I maintained a 3.7 GPA while developing strong skills in:

• **Full-stack development** using React, Node.js, and PostgreSQL through coursework and personal projects
• **Software engineering best practices** including test-driven development, version control with Git, and Agile methodologies
• **Problem-solving and algorithms** with expertise in data structures, complexity analysis, and optimization
• **Database design and management** with experience in both SQL and NoSQL systems

My capstone project, a **weather analytics dashboard using machine learning**, achieved 85% accuracy in weather forecasting and demonstrated my ability to work with large datasets and implement predictive models.

## Hands-On Experience

While I'm early in my career, I've gained valuable real-world experience through:

• **Software Development Internship at TechSolutions Inc.** where I contributed to a customer management system, fixed 15+ bugs, and implemented 3 new features that improved user experience
• **Teaching Assistant role** for Intro to Programming, where I helped 200+ students learn Python and developed supplementary materials that improved class performance by 15%
• **Freelance web development** for 5+ local businesses, managing projects from consultation through deployment and increasing client online engagement by 40%

## Project Portfolio

I've applied my skills to create several meaningful projects:

• **TaskMaster**: A full-stack task management app built with React and Node.js, deployed on AWS with 99% uptime
• **Study Group Matcher**: A hackathon-winning platform that connects students for collaborative learning (built in 48 hours!)
• **Personal Portfolio**: A responsive showcase of my work featuring dark mode and smooth animations

All of my projects are available on GitHub and demonstrate my commitment to clean code, user experience, and continuous learning.

## Leadership & Growth Mindset

As President of the Computer Science Student Association, I led an organization of 200+ members and increased membership by 30% through improved programming and outreach. I also volunteer with Girls Who Code, mentoring high school students and helping increase chapter participation by 25%. These experiences have taught me the importance of collaboration, communication, and giving back to the community.

## Eagerness to Learn

What excites me most about this opportunity is the chance to learn from experienced engineers and contribute to challenging projects. I'm AWS Cloud Practitioner certified and actively stay current with industry trends through online courses, tech meetups, and open-source contributions. I'm particularly interested in your team's work with microservices and would love to deepen my knowledge in this area.

## Next Steps

I would welcome the opportunity to discuss how my technical skills, fresh perspective, and enthusiasm for learning can contribute to TechStartup Inc.'s continued growth. I'm excited about the possibility of growing my career with a company that values both technical excellence and social impact.

Thank you for considering my application. I look forward to the opportunity to contribute to your innovative team.

Best regards,
Emily Rodriguez

---

*This cover letter was crafted with ResumeAce*`
    }
  ];

  const templates = activeMode === 'resume' ? resumeTemplates : coverLetterTemplates;

  const applyTemplate = (template: any) => {
    onApplyTemplate(template.content);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>{activeMode === 'resume' ? 'Resume' : 'Cover Letter'} Templates</span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {templates.map((template) => (
            <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <template.icon className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-sm">{template.name}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => applyTemplate(template)}
                  className="w-full"
                  size="sm"
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
