"use client"

import { useState } from "react"
import { jsPDF } from "jspdf"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Award, Calendar, Building, Eye, Palette, Download, User, Mail, Phone, GraduationCap, Star
} from "lucide-react"

// ======= PLACEHOLDER DATA - TODO: Replace with backend API integration =======
const studentProfile = {
  name: "Vaibhav Mishra",
  rollNumber: "BTCS20250123",
  email: "vaibhav@example.com",
  phone: "+91-9876543210",
  profileImage: null,
  bio: "Passionate Computer Science student with expertise in full-stack development and AI research.",
}

const education = [
  {
    id: 1,
    degree: "B.Tech Computer Science",
    institution: "AKTU Lucknow",
    year: "2021-2025",
    grade: "8.6 CGPA",
    specialization: "Artificial Intelligence & Machine Learning"
  },
  {
    id: 2,
    degree: "XII (Science)",
    institution: "DAV Public School",
    year: "2021",
    grade: "92.4%"
  }
]

const achievements = [
  { 
    id: 1, 
    title: "AcadVault EdTech Platform", 
    description: "Full-stack educational technology system with AI-powered features", 
    organization: "Smart India Hackathon", 
    date: "2024-03-01",
    type: "project",
    technologies: ["React", "Django", "PostgreSQL", "AI/ML"]
  },
  { 
    id: 2, 
    title: "Best Presenter Award", 
    description: "Outstanding presentation on EdTech innovation solutions", 
    organization: "Government of India", 
    date: "2024-02-15",
    type: "award",
    category: "National Level"
  },
  { 
    id: 3, 
    title: "Research Paper Publication", 
    description: "Transformer Models in Educational Technology: A Comprehensive Study", 
    organization: "IEEE Conference", 
    date: "2024-01-23",
    type: "research",
    impact: "Cited by 15+ papers"
  },
  {
    id: 4,
    title: "Open Source Contributor",
    description: "Active contributor to React ecosystem with 500+ GitHub contributions",
    organization: "GitHub",
    date: "2023-ongoing",
    type: "experience",
    contributions: "15+ repositories"
  }
]

const skills = [
  { name: "React.js", level: "Advanced", category: "Frontend" },
  { name: "Next.js", level: "Intermediate", category: "Frontend" },
  { name: "Django", level: "Advanced", category: "Backend" },
  { name: "Python", level: "Expert", category: "Programming" },
  { name: "Machine Learning", level: "Intermediate", category: "AI/ML" },
  { name: "PostgreSQL", level: "Intermediate", category: "Database" },
  { name: "Public Speaking", level: "Advanced", category: "Soft Skills" },
  { name: "Leadership", level: "Advanced", category: "Soft Skills" }
]

const certifications = [
  {
    id: 1,
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024-01-15",
    credentialId: "ABC123XYZ"
  },
  {
    id: 2,
    name: "Google AI/ML Certificate",
    issuer: "Google",
    date: "2023-11-20",
    credentialId: "GOOGLE456"
  }
]
// ======= END PLACEHOLDER DATA =======

const portfolioTemplates = [
  {
    id: "tech",
    name: "Technology Professional",
    color: "#2563eb",
    secondaryColor: "#3b82f6",
    accentColor: "#1e40af",
    frame: "modern",
    font: "helvetica",
    description: "Clean, modern design perfect for tech professionals",
    preview: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=400&q=80"
  },
  {
    id: "research",
    name: "Academic Researcher",
    color: "#1f2937",
    secondaryColor: "#374151",
    accentColor: "#111827",
    frame: "classic",
    font: "times",
    description: "Traditional academic layout for research professionals",
    preview: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fit=crop&w=400&q=80"
  },
  {
    id: "engineering",
    name: "Engineering Excellence",
    color: "#0f766e",
    secondaryColor: "#14b8a6",
    accentColor: "#0d9488",
    frame: "structured",
    font: "courier",
    description: "Structured design emphasizing technical expertise",
    preview: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=400&q=80"
  },
  {
    id: "creative",
    name: "Creative Professional",
    color: "#dc2626",
    secondaryColor: "#ef4444",
    accentColor: "#b91c1c",
    frame: "artistic",
    font: "helvetica",
    description: "Vibrant design for creative and artistic professionals",
    preview: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?fit=crop&w=400&q=80"
  },
]

export function PortfolioGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState("tech")
  const [selectedAchievements, setSelectedAchievements] = useState(achievements.map(a => a.id))
  const [selectedSkills, setSelectedSkills] = useState(skills.map(s => s.name))
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    const template = portfolioTemplates.find(t => t.id === selectedTemplate)!
    const primaryColor = template.color
    const secondaryColor = template.secondaryColor
    const accentColor = template.accentColor
    
    const doc = new jsPDF('p', 'mm', 'a4')
    const pageWidth = 210
    let y = 25

    // Header background (color block)
    doc.setFillColor(primaryColor)
    doc.rect(0, 0, pageWidth, 45, 'F')

    // Decorative elements per template
    if (template.frame === "modern") {
      doc.setFillColor(secondaryColor)
      doc.circle(pageWidth - 20, 20, 15, 'F')
      doc.setFillColor(accentColor)
      doc.rect(0, 40, pageWidth, 5, 'F')
    } else if (template.frame === "artistic") {
      doc.setFillColor(secondaryColor)
      doc.ellipse(30, 25, 25, 15, 'F')
      doc.setFillColor(accentColor)
      doc.triangle(pageWidth - 40, 10, pageWidth - 20, 35, pageWidth - 10, 15, 'F')
    }

    // Student Name and Title (Header)
    doc.setFont(template.font, "bold")
    doc.setFontSize(28)
    doc.setTextColor(255, 255, 255)
    doc.text(studentProfile.name, 20, 25)
    doc.setFontSize(14)
    doc.setFont(template.font, "normal")
    doc.text(studentProfile.bio, 20, 33)

    // Contact Information (Header)
    doc.setFontSize(10)
    doc.text(
      `Email: ${studentProfile.email} | Phone: ${studentProfile.phone} | Roll No: ${studentProfile.rollNumber}`,
      20, 40
    )

    y = 60

    const selectedAchievementsList = achievements.filter(a => selectedAchievements.includes(a.id))
    const selectedSkillsList = skills.filter(s => selectedSkills.includes(s.name))

    // Section order for each template
    let sectionOrder: string[] = []
    switch (template.id) {
      case "tech":
        sectionOrder = ["education", "skills", "projects", "certifications"]
        break
      case "research":
        sectionOrder = ["education", "research", "certifications", "skills"]
        break
      case "engineering":
        sectionOrder = ["skills", "education", "projects", "certifications"]
        break
      case "creative":
        sectionOrder = ["education", "projects", "skills", "certifications"]
        break
      default:
        sectionOrder = ["education", "skills", "projects", "certifications"]
    }
    sectionOrder.forEach(section => {
      y = addSection(doc, template, section, y, selectedAchievementsList, selectedSkillsList)
    })

    // Footer
    y += 10
    doc.setFontSize(10)
    doc.setTextColor(primaryColor)
    doc.text("Generated by AcadVault Portfolio Generator", 105, 290, { align: "center" })

    // Pages border
    doc.setDrawColor(primaryColor)
    doc.setLineWidth(0.7)
    doc.rect(10, 10, 190, 277, 'S')

    doc.save(`${studentProfile.name.replace(/\s+/g, '_')}_Portfolio_${new Date().getFullYear()}.pdf`)
    setIsGenerating(false)
  }

  // Add individual sections (no emoji, only plain text)
  const addSection = (doc: jsPDF, template: any, sectionType: string, y: number, achievementsList: any[], skillsList: any[]) => {
    const { color: primaryColor, font } = template
    if (y > 250) return y

    if (sectionType === "education") {
      doc.setFontSize(16)
      doc.setTextColor(primaryColor)
      doc.text("EDUCATION", 20, y)
      y += 8
      doc.setDrawColor(primaryColor)
      doc.setLineWidth(0.3)
      doc.line(20, y - 5, 190, y - 5)
      y += 2
      education.forEach(edu => {
        doc.setFontSize(12)
        doc.setTextColor(60, 60, 60)
        doc.setFont(font, "bold")
        doc.text(`${edu.degree} | ${edu.grade}`, 20, y)
        y += 5
        doc.setFont(font, "normal")
        doc.setFontSize(10)
        doc.text(`${edu.institution} (${edu.year})`, 20, y)
        if (edu.specialization) {
          y += 4
          doc.setTextColor(primaryColor)
          doc.text(`Specialization: ${edu.specialization}`, 25, y)
        }
        y += 8
      })
    }
    if (sectionType === "skills") {
      doc.setFontSize(16)
      doc.setTextColor(primaryColor)
      doc.text("CORE COMPETENCIES", 20, y)
      y += 8
      doc.setDrawColor(primaryColor)
      doc.line(20, y - 5, 190, y - 5)
      y += 5
      const skillCategories = skillsList.reduce((acc: any, skill) => {
        if (!acc[skill.category]) acc[skill.category] = []
        acc[skill.category].push(skill)
        return acc
      }, {})
      Object.entries(skillCategories).forEach(([category, categorySkills]: [string, any]) => {
        doc.setFontSize(11)
        doc.setTextColor(primaryColor)
        doc.setFont(font, "bold")
        doc.text(`${category}:`, 20, y)
        y += 5
        doc.setFontSize(10)
        doc.setTextColor(80, 80, 80)
        doc.setFont(font, "normal")
        const skillText = categorySkills.map((s: any) => `${s.name} (${s.level})`).join(" | ")
        const wrappedText = doc.splitTextToSize(skillText, 170)
        doc.text(wrappedText, 25, y)
        y += wrappedText.length * 4 + 3
      })
    }
    if (sectionType === "projects" || sectionType === "research") {
      const sectionTitle = sectionType === "research"
        ? "RESEARCH & PUBLICATIONS"
        : "PROJECTS & EXPERIENCE"
      doc.setFontSize(16)
      doc.setTextColor(primaryColor)
      doc.text(sectionTitle, 20, y)
      y += 8
      doc.setDrawColor(primaryColor)
      doc.line(20, y - 5, 190, y - 5)
      y += 5
      const filteredAchievements = sectionType === "research"
        ? achievementsList.filter(a => a.type === "research")
        : achievementsList.filter(a => ["project", "experience", "award"].includes(a.type))
      filteredAchievements.forEach(achievement => {
        if (y > 240) return
        doc.setFontSize(12)
        doc.setTextColor(primaryColor)
        doc.setFont(font, "bold")
        doc.text(achievement.title, 20, y)
        y += 5
        doc.setFontSize(10)
        doc.setTextColor(80, 80, 80)
        doc.setFont(font, "normal")
        const description = doc.splitTextToSize(achievement.description, 165)
        doc.text(description, 25, y)
        y += description.length * 4
        doc.setFontSize(9)
        doc.setTextColor(primaryColor)
        let metadata = `${achievement.organization} | ${achievement.date}`
        if (achievement.technologies) { metadata += ` | Tech: ${achievement.technologies.join(", ")}` }
        if (achievement.impact) { metadata += ` | ${achievement.impact}` }
        doc.text(metadata, 25, y)
        y += 8
      })
    }
    if (sectionType === "certifications") {
      if (certifications.length === 0) return y
      doc.setFontSize(16)
      doc.setTextColor(primaryColor)
      doc.text("CERTIFICATIONS", 20, y)
      y += 8
      doc.setDrawColor(primaryColor)
      doc.line(20, y - 5, 190, y - 5)
      y += 5
      certifications.forEach(cert => {
        doc.setFontSize(11)
        doc.setTextColor(80, 80, 80)
        doc.setFont(font, "bold")
        doc.text(cert.name, 20, y)
        y += 4
        doc.setFont(font, "normal")
        doc.setFontSize(9)
        doc.text(`${cert.issuer} | ${cert.date} | ID: ${cert.credentialId}`, 25, y)
        y += 7
      })
    }
    return y + 5
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Template Selection */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Choose Your Portfolio Theme
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <RadioGroup value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {portfolioTemplates.map(template => (
                  <div key={template.id} className="relative group">
                    <Label htmlFor={template.id} className="cursor-pointer block">
                      <div className={`
                        border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-lg
                        ${selectedTemplate === template.id 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}>
                        <div className="flex items-center space-x-3 mb-4">
                          <RadioGroupItem value={template.id} id={template.id} />
                          <span className="font-semibold text-gray-900">{template.name}</span>
                        </div>
                        <div className="relative overflow-hidden rounded-lg mb-3">
                          <img 
                            src={template.preview} 
                            alt={template.name} 
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{template.description}</p>
                        <div 
                          className="w-full h-2 rounded-full mt-3" 
                          style={{ backgroundColor: template.color }}
                        ></div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Content Sections (as before, omitted here for brevity) */}
        {/* ...Profile, Education, Skills, Achievements Cards - no emojis needed... */}

        {/* Download button */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={handleGeneratePDF}
            disabled={isGenerating || selectedAchievements.length === 0}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Generate PDF Portfolio
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}