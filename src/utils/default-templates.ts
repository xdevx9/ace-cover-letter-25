
export const getDefaultResumeTemplate = () => {
  return `# Alex Morgan

**Senior Software Engineer** | alex.morgan@email.com | (555) 123-4567 | San Francisco, CA
**LinkedIn:** linkedin.com/in/alexmorgan | **GitHub:** github.com/alexmorgan | **Portfolio:** alexmorgan.dev

---

## 💼 Professional Summary

Innovative Senior Software Engineer with 7+ years of experience building scalable web applications and leading cross-functional teams. Passionate about clean code, user experience, and emerging technologies. Proven track record of delivering high-impact solutions that drive business growth and improve user engagement.

---

## 🚀 Experience

### **Senior Software Engineer** | TechCorp Solutions | San Francisco, CA
*January 2022 - Present*

• **Led development** of a microservices architecture serving 2M+ daily users, improving system performance by 40%
• **Mentored team** of 5 junior developers, implementing code review processes that reduced bugs by 60%
• **Architected and built** real-time analytics dashboard using React, Node.js, and PostgreSQL
• **Collaborated** with product teams to deliver 15+ features ahead of schedule, increasing user retention by 25%

### **Full Stack Developer** | InnovateLabs | San Francisco, CA
*March 2020 - December 2021*

• **Developed** responsive web applications using React, TypeScript, and Express.js
• **Optimized** database queries resulting in 50% faster page load times
• **Implemented** CI/CD pipelines using Docker and AWS, reducing deployment time by 70%
• **Built** RESTful APIs handling 10k+ requests per minute with 99.9% uptime

### **Software Developer** | StartupXYZ | San Jose, CA
*June 2018 - February 2020*

• **Created** e-commerce platform processing $2M+ in annual transactions
• **Integrated** third-party payment systems (Stripe, PayPal) with robust error handling
• **Designed** mobile-first UI components increasing mobile conversions by 35%

---

## 🛠️ Technical Skills

**Frontend:** React, TypeScript, Next.js, Vue.js, HTML5, CSS3, Tailwind CSS, Material-UI
**Backend:** Node.js, Python, Java, Express.js, Django, Spring Boot, GraphQL
**Databases:** PostgreSQL, MongoDB, Redis, MySQL, DynamoDB
**Cloud & DevOps:** AWS, Docker, Kubernetes, Jenkins, GitHub Actions, Terraform
**Tools:** Git, Webpack, Jest, Cypress, Figma, Jira, Slack

---

## 🎓 Education

### **Bachelor of Science in Computer Science** | Stanford University
*Graduated: 2018* | **GPA:** 3.8/4.0

**Relevant Coursework:** Data Structures, Algorithms, Software Engineering, Database Systems, Machine Learning

---

## 🏆 Featured Projects

### **EcoTracker** - Sustainability Analytics Platform
• **Built** full-stack application helping businesses track carbon footprint with 500+ active users
• **Technologies:** React, Node.js, PostgreSQL, Chart.js, AWS Lambda
• **Impact:** Helped companies reduce emissions by average of 20%

### **TaskFlow** - Project Management Tool
• **Developed** collaborative workspace with real-time updates and file sharing
• **Technologies:** Vue.js, Socket.io, MongoDB, Express.js
• **Achievement:** Featured in TechCrunch as "Tool of the Month"

### **CryptoWatch** - Cryptocurrency Portfolio Tracker
• **Created** real-time portfolio tracking with advanced analytics and alerts
• **Technologies:** React Native, Firebase, CoinGecko API
• **Users:** 10k+ downloads on App Store and Google Play

---

## 🏅 Certifications & Awards

• **AWS Certified Solutions Architect** - Professional (2023)
• **Employee of the Year** - TechCorp Solutions (2023)
• **Google Cloud Professional Developer** (2022)
• **Hackathon Winner** - Bay Area Tech Challenge (2021)

---

## 🌟 Leadership & Volunteering

• **Tech Mentor** at Code for America - Mentoring underrepresented developers (2022-Present)
• **Speaker** at SF Tech Meetup - "Building Scalable React Applications" (2023)
• **Volunteer** at Local Coding Bootcamp - Teaching web development fundamentals`;
};

export const getDefaultCoverLetterTemplate = () => {
  return `# Cover Letter

**Alex Morgan**
alex.morgan@email.com | (555) 123-4567 | San Francisco, CA
**Date:** ${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}

---

**Sarah Johnson**  
**Senior Engineering Manager**  
**Google Inc.**  
**1600 Amphitheatre Parkway, Mountain View, CA 94043**

## Dear Ms. Johnson,

I am writing to express my strong interest in the **Senior Software Engineer** position at **Google**. With over 7 years of experience building scalable web applications and a passion for innovative technology solutions, I am excited about the opportunity to contribute to Google's mission of organizing the world's information.

---

## 🎯 Why Google?

Google's commitment to **innovation, user-centric design, and global impact** perfectly aligns with my professional values and career aspirations. I am particularly drawn to your team's work on **cloud infrastructure** and the opportunity to build products that serve billions of users worldwide. Your recent initiatives in **sustainability and AI ethics** resonate deeply with my personal values and technical interests.

---

## 💡 What I Bring to Your Team

In my current role at TechCorp Solutions, I have:

• **🚀 Led development** of microservices architecture serving 2M+ daily users, improving system performance by 40%
• **👥 Mentored cross-functional teams** of 8+ developers, implementing agile practices that increased delivery speed by 60%
• **⚡ Architected real-time systems** processing 50k+ concurrent connections with 99.99% uptime
• **📊 Built analytics platforms** that provided actionable insights, driving $5M+ in annual revenue growth

My expertise in **React, Node.js, PostgreSQL, and AWS** combined with my experience in **large-scale system design** makes me well-equipped to tackle the technical challenges at Google's scale.

---

## 🔥 Passion for Excellence

Beyond technical skills, I bring:

• **🎯 Problem-solving mindset** - I thrive on complex challenges and finding elegant solutions
• **🤝 Collaborative leadership** - Experience working with diverse, global teams across multiple time zones  
• **📚 Continuous learning** - Recently completed AWS Solutions Architect certification and contribute to open-source projects
• **🌍 User empathy** - Always design with the end-user experience as the primary focus

---

## 🚀 Next Steps

I would be thrilled to discuss how my technical expertise, leadership experience, and passion for innovation can contribute to Google's continued success. I am particularly excited about the possibility of working on projects that impact billions of users and push the boundaries of what's possible with technology.

Thank you for considering my application. I look forward to the opportunity to discuss how I can help Google build the future of technology.

**Best regards,**  
**Alex Morgan**

---

*P.S. I'm also excited about Google's commitment to sustainability - I recently led an initiative at my current company that reduced our carbon footprint by 30% through infrastructure optimization.*`;
};
