
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, Layout, Download, Star, CheckCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Powered Creation",
      description: "Generate professional resumes and cover letters with advanced AI technology"
    },
    {
      icon: <Layout className="h-6 w-6" />,
      title: "Live Preview",
      description: "See your changes in real-time with our Markdown editor and live preview"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Multiple Templates",
      description: "Choose from professionally designed templates for any industry"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Export Options",
      description: "Download as PDF, HTML, or plain text formats"
    }
  ];

  const benefits = [
    "ATS-optimized resumes",
    "Keyword matching analysis",
    "Professional templates",
    "AI content enhancement",
    "Real-time editing",
    "Multiple export formats"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <FileText className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ResumeAce</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button 
              onClick={() => navigate('/editor')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            AI-Powered Resume Builder
          </Badge>
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Create Professional Resumes & Cover Letters with{" "}
            <span className="text-blue-600">AI Assistance</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Build ATS-optimized resumes and compelling cover letters using our advanced AI tools, 
            live Markdown editor, and professional templates. Stand out from the competition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/editor')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              Start Building Resume
              <FileText className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/editor?mode=cover-letter')}
              className="px-8 py-3 text-lg border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900"
            >
              Create Cover Letter
            </Button>
          </div>
          
          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>4.9/5 rating</span>
            </div>
            <div>|</div>
            <div>50,000+ professionals hired</div>
            <div>|</div>
            <div>ATS-optimized templates</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Professional Documents
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need to create standout resumes and cover letters
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-900">
                <CardHeader className="text-center pb-2">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose ResumeAce?
              </h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Ready to Get Started?</h4>
              <p className="mb-6 text-blue-100">
                Join thousands of professionals who have landed their dream jobs with ResumeAce.
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/editor')}
                className="w-full bg-white text-blue-600 hover:bg-gray-100"
              >
                Create Your Resume Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">ResumeAce</span>
          </div>
          <p className="text-gray-400">
            © 2024 ResumeAce. All rights reserved. Built with AI-powered technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
