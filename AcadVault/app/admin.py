from django.contrib import admin
from .models import Departments, Batch, Semester, Student, Faculty, Subject, AcademicRecord, Achievement, Marks, Sections, Tickets, Portfolio


# Register your models here.
admin.site.register(Departments)
admin.site.register(Batch)
admin.site.register(Semester)
admin.site.register(Student)
admin.site.register(Faculty)
admin.site.register(Subject)
admin.site.register(AcademicRecord)
admin.site.register(Achievement)
admin.site.register(Marks)
admin.site.register(Sections)
admin.site.register(Tickets)
admin.site.register(Portfolio)  
