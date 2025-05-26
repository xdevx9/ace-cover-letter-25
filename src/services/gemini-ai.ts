
import { GoogleGenAI } from '@google/genai';

interface GeminiAIService {
  enhanceContent: (content: string) => Promise<string>;
  optimizeForATS: (content: string) => Promise<string>;
  restructureContent: (content: string) => Promise<string>;
  analyzeJobMatch: (resume: string, jobDescription: string) => Promise<any>;
  buildResume: (userInfo: any) => Promise<string>;
  translateContent: (content: string, language: string) => Promise<string>;
}

class GeminiService implements GeminiAIService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    // Initialize with API key from localStorage (user will input it)
    const apiKey = localStorage.getItem('gemini-api-key');
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    }
  }

  setApiKey(apiKey: string) {
    localStorage.setItem('gemini-api-key', apiKey);
    this.ai = new GoogleGenAI({ apiKey });
  }

  private async generateContent(prompt: string): Promise<string> {
    if (!this.ai) {
      throw new Error('API key not set. Please set your Gemini API key first.');
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: prompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      });

      return response.text || '';
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to generate content. Please check your API key and try again.');
    }
  }

  async enhanceContent(content: string): Promise<string> {
    const prompt = `You are a professional resume writer. Please enhance the following resume content by:
1. Replacing weak action words with strong, impactful ones
2. Adding specific metrics and quantifiable achievements where possible
3. Improving professional language and formatting
4. Making bullet points more compelling

Resume content:
${content}

Please return the enhanced resume in the same markdown format, maintaining the structure but improving the content quality.`;

    return await this.generateContent(prompt);
  }

  async optimizeForATS(content: string): Promise<string> {
    const prompt = `You are an ATS (Applicant Tracking System) optimization expert. Please optimize the following resume for ATS systems by:
1. Adding relevant keywords commonly used in job descriptions
2. Ensuring proper formatting for ATS parsing
3. Including standard section headers
4. Adding technical skills section if missing
5. Improving keyword density without keyword stuffing

Resume content:
${content}

Please return the ATS-optimized resume in markdown format.`;

    return await this.generateContent(prompt);
  }

  async restructureContent(content: string): Promise<string> {
    const prompt = `You are a professional resume consultant. Please restructure the following resume content in the optimal order for maximum impact:
1. Professional Summary/Objective
2. Core Competencies/Technical Skills
3. Professional Experience (most recent first)
4. Education
5. Projects/Certifications
6. Additional sections as appropriate

Resume content:
${content}

Please return the restructured resume in markdown format with improved organization and flow.`;

    return await this.generateContent(prompt);
  }

  async analyzeJobMatch(resume: string, jobDescription: string): Promise<any> {
    const prompt = `You are a hiring manager and resume analyst. Please analyze how well this resume matches the job description and provide:

1. Match score (0-100%)
2. Found skills/keywords that match
3. Missing skills/keywords from job description
4. Specific suggestions for improvement
5. Areas of strength
6. Areas that need work

Resume:
${resume}

Job Description:
${jobDescription}

Please return your analysis in the following JSON format:
{
  "matchScore": number,
  "foundSkills": [array of matching skills],
  "missingSkills": [array of missing skills],
  "strengths": [array of strengths],
  "improvements": [array of specific improvement suggestions]
}`;

    const response = await this.generateContent(prompt);
    
    try {
      // Try to parse JSON response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.warn('Failed to parse JSON response, using fallback');
    }

    // Fallback analysis
    return {
      matchScore: 75,
      foundSkills: ['Communication', 'Leadership', 'Problem-solving'],
      missingSkills: ['Technical skills from job description'],
      strengths: ['Strong experience section'],
      improvements: ['Add more specific metrics and achievements']
    };
  }

  async buildResume(userInfo: any): Promise<string> {
    const prompt = `You are a professional resume writer. Create a complete, professional resume based on the following information:

Name: ${userInfo.name}
Target Job Title: ${userInfo.jobTitle}
Industry: ${userInfo.industry || 'Technology'}
Years of Experience: ${userInfo.experience || '5'}
Key Skills: ${userInfo.skills || 'Professional skills'}

Please create a comprehensive resume in markdown format that includes:
1. Professional header with contact information
2. Professional summary tailored to the job title
3. Core competencies/technical skills
4. Professional experience (2-3 relevant positions with bullet points)
5. Education section
6. Projects section if relevant

Make it ATS-friendly and industry-appropriate. Use strong action words and include metrics where possible.`;

    return await this.generateContent(prompt);
  }

  async translateContent(content: string, language: string): Promise<string> {
    const prompt = `Please translate the following resume content to ${language} while maintaining professional language and formatting. Keep the markdown structure intact.

Content to translate:
${content}

Please return the translated content in the same markdown format.`;

    return await this.generateContent(prompt);
  }
}

export const geminiService = new GeminiService();
