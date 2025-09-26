"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Eye, Mail, Phone, GraduationCap, Award, TrendingUp } from "lucide-react"
import { HolisticStudentProfile } from "@/components/holistic-student-profile"

// Mock data for demonstration
const mockStudents = [
  {
    id: 1,
    name: "Sarah Johnson",
    rollNo: "CS21B001",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    year: "3rd Year",
    branch: "Computer Science",
    cgpa: 9.2,
    attendance: 92,
    achievements: 8,
    lastActive: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    mentor: "Dr. Smith",
  },
  {
    id: 2,
    name: "Michael Chen",
    rollNo: "CS21B015",
    email: "michael.chen@university.edu",
    phone: "+1 (555) 234-5678",
    year: "3rd Year",
    branch: "Computer Science",
    cgpa: 8.7,
    attendance: 88,
    achievements: 5,
    lastActive: "2024-01-14",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    mentor: "Dr. Smith",
  },
  {
    id: 3,
    name: "Priya Sharma",
    rollNo: "CS21B032",
    email: "priya.sharma@university.edu",
    phone: "+1 (555) 345-6789",
    year: "3rd Year",
    branch: "Computer Science",
    cgpa: 9.5,
    attendance: 95,
    achievements: 12,
    lastActive: "2024-01-13",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    mentor: "Dr. Smith",
  },
  {
    id: 4,
    name: "David Wilson",
    rollNo: "CS21B008",
    email: "david.wilson@university.edu",
    phone: "+1 (555) 456-7890",
    year: "3rd Year",
    branch: "Computer Science",
    cgpa: 8.9,
    attendance: 90,
    achievements: 7,
    lastActive: "2024-01-12",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    mentor: "Dr. Smith",
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    rollNo: "CS21B025",
    email: "emily.rodriguez@university.edu",
    phone: "+1 (555) 567-8901",
    year: "3rd Year",
    branch: "Computer Science",
    cgpa: 8.4,
    attendance: 85,
    achievements: 4,
    lastActive: "2024-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "inactive",
    mentor: "Dr. Smith",
  },
]

export function StudentList() {
  const [selectedStudent, setSelectedStudent] = useState<(typeof mockStudents)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterYear, setFilterYear] = useState("all")

  const filteredStudents = mockStudents
    .filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesYear = filterYear === "all" || student.year.includes(filterYear)
      return matchesSearch && matchesYear
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "rollNo") {
        return a.rollNo.localeCompare(b.rollNo)
      } else if (sortBy === "cgpa") {
        return b.cgpa - a.cgpa
      } else if (sortBy === "achievements") {
        return b.achievements - a.achievements
      }
      return 0
    })

  if (selectedStudent) {
    return <HolisticStudentProfile student={selectedStudent} onBack={() => setSelectedStudent(null)} />
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground mt-1">Manage and mentor your assigned students</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {filteredStudents.length} Students
          </Badge>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, roll number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="rollNo">Sort by Roll No</SelectItem>
                  <SelectItem value="cgpa">Sort by CGPA</SelectItem>
                  <SelectItem value="achievements">Sort by Achievements</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="1st">1st Year</SelectItem>
                  <SelectItem value="2nd">2nd Year</SelectItem>
                  <SelectItem value="3rd">3rd Year</SelectItem>
                  <SelectItem value="4th">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card
            key={student.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedStudent(student)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">{student.rollNo}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={student.status === "active" ? "default" : "secondary"} className="text-xs">
                      {student.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{student.year}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">CGPA</span>
                  </div>
                  <span className="font-medium">{student.cgpa}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Attendance</span>
                  </div>
                  <span className="font-medium">{student.attendance}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Achievements</span>
                  </div>
                  <span className="font-medium">{student.achievements}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Eye className="h-3 w-3 mr-1" />
                  View Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
