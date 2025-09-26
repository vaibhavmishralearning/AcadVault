"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  HelpCircle,
  Send,
  MessageSquare,
  Clock,
  ChevronDown,
  Search,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react"

// Mock FAQ data
const faqs = [
  {
    id: 1,
    category: "Achievements",
    question: "How do I submit an achievement for approval?",
    answer:
      "Go to the Achievements page and click 'Add Achievement'. Fill out the form with all required details including evidence and submit for faculty review. You'll receive notifications about the approval status.",
  },
  {
    id: 2,
    category: "Achievements",
    question: "What types of evidence are accepted?",
    answer:
      "We accept certificates (PDF), photos (JPG, PNG), documentation, and URLs to online portfolios or project repositories. Make sure all evidence clearly demonstrates your achievement.",
  },
  {
    id: 3,
    category: "Portfolio",
    question: "How do I generate a portfolio?",
    answer:
      "Visit the Portfolio Generator page, select a template, choose which approved achievements to include, and click 'Generate PDF' or 'Get Shareable Link' to create your portfolio.",
  },
  {
    id: 4,
    category: "Portfolio",
    question: "Can I customize my portfolio template?",
    answer:
      "Currently, you can choose from pre-designed templates and select which achievements to include. Custom template creation is planned for future updates.",
  },
  {
    id: 5,
    category: "Academic Records",
    question: "Why don't I see my latest grades?",
    answer:
      "Academic records are synced from the university ERP system. If you don't see recent grades, they may not have been updated by faculty yet. Contact your academic advisor if grades are missing after the official posting date.",
  },
  {
    id: 6,
    category: "Technical",
    question: "I'm having trouble uploading files",
    answer:
      "Ensure your files are under 5MB and in supported formats (PDF, JPG, PNG). Clear your browser cache and try again. If the problem persists, contact technical support.",
  },
  {
    id: 7,
    category: "Account",
    question: "How do I reset my password?",
    answer:
      "Go to Settings > Account and use the password reset form. You can also use the 'Forgot Password' link on the login page to receive a reset email.",
  },
  {
    id: 8,
    category: "Privacy",
    question: "Who can see my achievements and portfolio?",
    answer:
      "You can control visibility in Settings > Privacy. Options include Public (anyone), University (only university members), or Private (only you).",
  },
]

// Mock support tickets
const supportTickets = [
  {
    id: "TK-001",
    subject: "Unable to upload certificate",
    status: "Open",
    priority: "Medium",
    created: "2024-01-15",
    lastUpdate: "2024-01-16",
  },
  {
    id: "TK-002",
    subject: "Portfolio generation error",
    status: "In Progress",
    priority: "High",
    created: "2024-01-10",
    lastUpdate: "2024-01-14",
  },
  {
    id: "TK-003",
    subject: "Missing academic records",
    status: "Resolved",
    priority: "Low",
    created: "2024-01-05",
    lastUpdate: "2024-01-08",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-red-100 text-red-800 border-red-200"
    case "In Progress":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Resolved":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800 border-red-200"
    case "Medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  })

  const categories = ["all", "Achievements", "Portfolio", "Academic Records", "Technical", "Account", "Privacy"]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle ticket submission
    console.log("Ticket submitted:", ticketForm)
    alert("Support ticket submitted successfully! You'll receive updates via email.")
    setTicketForm({ subject: "", category: "", priority: "", description: "" })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground text-balance">Support & Help</h1>
        <p className="text-muted-foreground mt-1">Find answers to common questions or get help from our support team</p>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search FAQs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id}>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <HelpCircle className="h-5 w-5 text-primary" />
                          <div className="text-left">
                            <CardTitle className="text-base">{faq.question}</CardTitle>
                            <Badge variant="secondary" className="mt-1">
                              {faq.category}
                            </Badge>
                          </div>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <p className="text-foreground leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6">
          {/* Create New Ticket */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Create Support Ticket
              </CardTitle>
              <CardDescription>Can't find an answer? Submit a support ticket and we'll help you out.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={ticketForm.category}
                      onValueChange={(value) => setTicketForm({ ...ticketForm, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="achievements">Achievements</SelectItem>
                        <SelectItem value="portfolio">Portfolio</SelectItem>
                        <SelectItem value="academic">Academic Records</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="account">Account</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={ticketForm.priority}
                    onValueChange={(value) => setTicketForm({ ...ticketForm, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                    placeholder="Please provide detailed information about your issue..."
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="gap-2">
                  <Send className="h-4 w-4" />
                  Submit Ticket
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing Tickets */}
          <Card>
            <CardHeader>
              <CardTitle>Your Support Tickets</CardTitle>
              <CardDescription>Track the status of your submitted tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                        <h4 className="font-medium">{ticket.subject}</h4>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Created: {new Date(ticket.created).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Updated: {new Date(ticket.lastUpdate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@university.edu</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-xs text-muted-foreground">Mon-Fri, 9AM-5PM EST</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Office Location</p>
                    <p className="text-sm text-muted-foreground">
                      Student Services Building
                      <br />
                      Room 201, University Campus
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
                <CardDescription>Helpful links and documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <ExternalLink className="h-4 w-4" />
                  Student Handbook
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <ExternalLink className="h-4 w-4" />
                  Academic Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <ExternalLink className="h-4 w-4" />
                  University Policies
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <ExternalLink className="h-4 w-4" />
                  Technical Requirements
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Office Hours</CardTitle>
              <CardDescription>When you can reach us for immediate assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Academic Support</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Technical Support</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Weekend: Emergency only</p>
                    <p>Response time: 24-48 hours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
