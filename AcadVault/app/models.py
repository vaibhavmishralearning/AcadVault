from django.db import models


class Departments(models.Model):
    name = models.CharField(max_length=100)
    head = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.name
        
class Faculty(models.Model):
    name = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.name

class Batch(models.Model):
    year = models.IntegerField()
    department = models.ForeignKey(Departments, on_delete=models.CASCADE)
    number_of_students = models.IntegerField()

    def __str__(self):
        return f"{self.year} - {self.department.name}"

class Semester(models.Model):
    name = models.CharField(max_length=30)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True) 
    department_id = models.ForeignKey(Departments, on_delete=models.CASCADE)
    batch_id = models.ForeignKey(Batch, on_delete=models.CASCADE)
    def __str__(self):
         return self.name


class Student(models.Model):
    name = models.CharField(max_length=100)
    roll_no = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    year = models.CharField(max_length=20)
    attendance = models.FloatField(default=0)
    achievements_count = models.IntegerField(default=0)
    last_active = models.DateTimeField(null=True, blank=True)
    department = models.ForeignKey(Departments, on_delete=models.CASCADE, null=True)
    avatar = models.URLField(blank=True)
    status = models.CharField(max_length=20, default='active')
    faculty_ID = models.CharField(max_length=100, blank=True)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE, null=True)
    def __str__(self):
          return f"{self.name} ({self.roll_no})"
    


    
class Subject(models.Model):
    code = models.CharField(max_length=20)
    name = models.CharField(max_length=100)
    credits = models.IntegerField()
    grade = models.CharField(max_length=5)
    points = models.FloatField()
    # (semester : department)
    semester_list = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.code} - {self.name}"
      
class Marks(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    marks_obtained = models.FloatField()

    def __str__(self):
        return f"{self.student.name} - {self.course.title}"

class Sections(models.Model):
    name = models.CharField(max_length=10)
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE)
    students = models.JSONField(default=list, blank=True)
    department = models.ForeignKey(Departments, on_delete=models.CASCADE)
    faculty_in_charge = models.ForeignKey(Faculty, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} - {self.batch.year}"
    




class AcademicRecord(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='academic_records')
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='academic_records')
    gpa = models.FloatField()
    credits = models.IntegerField()
    subjects = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.student} - {self.semester}"


class Achievement(models.Model):
    STATUS_CHOICES = [
        ("Approved", "Approved"),
        ("Pending", "Pending"),
        ("Rejected", "Rejected"),
    ]
    TYPE_CHOICES = [
        ("Workshop", "Workshop"),
        ("Internship", "Internship"),
        ("Volunteer Work", "Volunteer Work"),
        ("Certification", "Certification"),
        ("Competition", "Competition"),
        ("Project", "Project"),
        ("Research", "Research"),
    ]
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='achievements')
    title = models.CharField(max_length=200)
    type = models.CharField(max_length=30, choices=TYPE_CHOICES)
    organization = models.CharField(max_length=100)
    date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")
    description = models.TextField(blank=True)
    # evidence_file = models.URLField(blank=True)
    # evidence_url = models.URLField(blank=True)
    skills = models.JSONField(default=list, blank=True)
    feedback = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} ({self.student})"


class Portfolio(models.Model):
	student = models.OneToOneField(Student, on_delete=models.CASCADE, related_name='portfolio')
	achievements = models.ManyToManyField(Achievement, blank=True)
	skills = models.JSONField(default=list, blank=True)
	template = models.CharField(max_length=50, blank=True)
	# url = models.URLField(blank=True)

	def __str__(self):
		return f"Portfolio of {self.student}"


class Tickets(models.Model):
    STATUS_CHOICES = [
        ("Open", "Open"),
        ("In Progress", "In Progress"),
        ("Resolved", "Resolved"),
        ("Closed", "Closed"),
    ]
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='tickets')
    subject = models.TextField()
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Open")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Ticket {self.id} - {self.subject} ({self.student})"