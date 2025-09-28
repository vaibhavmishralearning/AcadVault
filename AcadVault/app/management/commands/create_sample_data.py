from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from app.models import Departments, Student, Achievement

class Command(BaseCommand):
    help = 'Create sample data for testing'

    def handle(self, *args, **options):
        # Create departments
        dept1, _ = Departments.objects.get_or_create(
            name="Computer Science",
            defaults={"head": "Dr. Smith"}
        )
        dept2, _ = Departments.objects.get_or_create(
            name="Electronics",
            defaults={"head": "Dr. Johnson"}
        )

        # Create test users
        user1, _ = User.objects.get_or_create(
            username="student1",
            defaults={
                "email": "student1@university.edu",
                "first_name": "John",
                "last_name": "Doe"
            }
        )
        user1.set_password("password123")
        user1.save()

        # Create students
        student1, _ = Student.objects.get_or_create(
            roll_no="CS001",
            defaults={
                "name": "John Doe",
                "email": "student1@university.edu",
                "phone": "+1234567890",
                "year": "3rd Year",
                "attendance": 85.5,
                "achievements_count": 3,
                "department": dept1,
                "status": "active"
            }
        )

        # Create sample achievements
        achievements_data = [
            {
                "title": "Web Development Workshop",
                "type": "Workshop",
                "organization": "Tech Club",
                "date": "2024-01-15",
                "status": "Approved",
                "description": "Completed 3-day intensive web development workshop",
                "skills": ["HTML", "CSS", "JavaScript", "React"]
            },
            {
                "title": "Summer Internship at TechCorp",
                "type": "Internship",
                "organization": "TechCorp Inc.",
                "date": "2024-01-10",
                "status": "Pending",
                "description": "3-month software development internship",
                "skills": ["Python", "Django", "PostgreSQL"]
            },
            {
                "title": "Data Science Certification",
                "type": "Certification",
                "organization": "Online Academy",
                "date": "2024-01-05",
                "status": "Approved",
                "description": "Certified in Data Science and Machine Learning",
                "skills": ["Python", "Pandas", "Scikit-learn", "TensorFlow"]
            },
            {
                "title": "Hackathon Winner",
                "type": "Competition",
                "organization": "University",
                "date": "2023-12-20",
                "status": "Approved",
                "description": "First place in university hackathon",
                "skills": ["React", "Node.js", "MongoDB"]
            }
        ]

        for achievement_data in achievements_data:
            Achievement.objects.get_or_create(
                student=student1,
                title=achievement_data["title"],
                defaults=achievement_data
            )

        self.stdout.write(
            self.style.SUCCESS('Successfully created sample data')
        )