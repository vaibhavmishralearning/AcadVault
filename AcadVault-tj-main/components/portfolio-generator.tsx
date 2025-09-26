"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Download,
  Share2,
  Eye,
  Palette,
  CheckCircle,
  Calendar,
  Building,
  Award,
  Trophy,
  GraduationCap,
} from "lucide-react"

// Mock approved achievements data
const approvedAchievements = [
  {
    id: 1,
    title: "Web Development Workshop",
    type: "Workshop",
    organization: "Tech Club",
    date: "2024-01-15",
    description: "Completed advanced React.js workshop covering hooks, context, and state management.",
    skills: ["React", "JavaScript", "Frontend"],
  },
  {
    id: 4,
    title: "Data Science Certification",
    type: "Certification",
    organization: "Online Academy",
    date: "2024-01-05",
    description: "Earned certification in data analysis, machine learning, and statistical modeling.",
    skills: ["Python", "Machine Learning", "Statistics"],
  },
  {
    id: 5,
    title: "Hackathon Winner",
    type: "Competition",
    organization: "University Tech Fest",
    date: "2023-12-20",
    description: "First place in 48-hour hackathon developing sustainable technology solutions.",
    skills: ["Innovation", "Teamwork", "Problem Solving"],
  },
  {
    id: 6,
    title: "Research Assistant",
    type: "Research",
    organization: "Computer Science Department",
    date: "2023-11-15",
    description: "Assisted in AI research project focusing on natural language processing applications.",
    skills: ["Research", "AI", "Academic Writing"],
  },
]

const portfolioTemplates = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean, minimalist design perfect for tech and business roles",
    preview: "/modern-professional-portfolio-template.jpg",
    color: "emerald",
  },
  {
    id: "academic",
    name: "Academic Excellence",
    description: "Traditional layout emphasizing research and academic achievements",
    preview: "/academic-portfolio-template.jpg",
    color: "blue",
  },
  {
    id: "creative",
    name: "Creative Showcase",
    description: "Dynamic design highlighting projects and creative work",
    preview: "/creative-portfolio-template.png",
    color: "purple",
  },
  {
    id: "corporate",
    name: "Corporate Ready",
    description: "Professional format suitable for corporate environments",
    preview: "/corporate-portfolio-template.jpg",
    color: "slate",
  },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Workshop":
      return <GraduationCap className="h-4 w-4" />
    case "Certification":
      return <Award className="h-4 w-4" />
    case "Competition":
      return <Trophy className="h-4 w-4" />
    case "Research":
      return <FileText className="h-4 w-4" />
    default:
      return <CheckCircle className="h-4 w-4" />
  }
}

export function PortfolioGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [selectedAchievements, setSelectedAchievements] = useState<number[]>([1, 4, 5])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleAchievementToggle = (achievementId: number) => {
    setSelectedAchievements((prev) =>
      prev.includes(achievementId) ? prev.filter((id) => id !== achievementId) : [...prev, achievementId],
    )
  }

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    // In a real app, this would trigger a PDF download
    alert("Portfolio PDF generated successfully!")
  }

  const handleGenerateLink = async () => {
    setIsGenerating(true)
    // Simulate link generation
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsGenerating(false)
    // In a real app, this would generate a shareable URL
    const mockUrl = `https://portfolio.university.edu/student/${Math.random().toString(36).substr(2, 9)}`
    navigator.clipboard.writeText(mockUrl)
    alert(`Shareable link generated and copied to clipboard: ${mockUrl}`)
  }

  const selectedTemplateData = portfolioTemplates.find((t) => t.id === selectedTemplate)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground text-balance">Portfolio Generator</h1>
        <p className="text-muted-foreground mt-1">Create a professional portfolio from your approved achievements</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Template Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Choose Template
              </CardTitle>
              <CardDescription>Select a design template that matches your career goals</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <div className="grid gap-4 md:grid-cols-2">
                  {portfolioTemplates.map((template) => (
                    <div key={template.id} className="relative">
                      <Label
                        htmlFor={template.id}
                        className="cursor-pointer block border-2 border-border rounded-lg p-4 hover:border-primary transition-colors"
                      >
                        <div className="flex items-center space-x-2 mb-3">
                          <RadioGroupItem value={template.id} id={template.id} />
                          <span className="font-medium">{template.name}</span>
                        </div>
                        <img
                          src={template.preview || "/placeholder.svg"}
                          alt={template.name}
                          className="w-full h-32 object-cover rounded-md mb-2"
                        />
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Content Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Select Content
              </CardTitle>
              <CardDescription>Choose which approved achievements to include in your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvedAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                    <Checkbox
                      id={`achievement-${achievement.id}`}
                      checked={selectedAchievements.includes(achievement.id)}
                      onCheckedChange={() => handleAchievementToggle(achievement.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor={`achievement-${achievement.id}`} className="cursor-pointer block">
                        <div className="flex items-center gap-2 mb-1">
                          {getTypeIcon(achievement.type)}
                          <h4 className="font-medium text-foreground">{achievement.title}</h4>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {achievement.organization}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(achievement.date).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-sm text-foreground mb-2">{achievement.description}</p>
                        <div className="flex gap-1 flex-wrap">
                          {achievement.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview and Export */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <img
                    src={selectedTemplateData?.preview || "/placeholder.svg"}
                    alt="Portfolio Preview"
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-medium text-foreground mb-1">{selectedTemplateData?.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {selectedAchievements.length} achievements selected
                  </p>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Eye className="h-4 w-4" />
                    Full Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
              <CardDescription>Generate your portfolio in different formats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleGeneratePDF}
                disabled={isGenerating || selectedAchievements.length === 0}
                className="w-full gap-2"
              >
                <Download className="h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate PDF"}
              </Button>

              <Button
                onClick={handleGenerateLink}
                disabled={isGenerating || selectedAchievements.length === 0}
                variant="outline"
                className="w-full gap-2 bg-transparent"
              >
                <Share2 className="h-4 w-4" />
                {isGenerating ? "Generating..." : "Get Shareable Link"}
              </Button>

              <Separator />

              <div className="text-sm text-muted-foreground space-y-1">
                <p>• PDF: Download for applications</p>
                <p>• Shareable Link: Public web portfolio</p>
                <p>• Updates automatically with new achievements</p>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Achievements</span>
                <Badge variant="secondary">{approvedAchievements.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Selected</span>
                <Badge variant="default">{selectedAchievements.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completeness</span>
                <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                  {Math.round((selectedAchievements.length / approvedAchievements.length) * 100)}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
