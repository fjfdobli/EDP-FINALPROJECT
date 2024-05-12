from django.db import models

COURSES = [
    ('BS-CS', 'BS in Computer Science'),
    ('BS-DS', 'BS in Data Science'),
    ('BS-IT', 'BS in Information Technology'),
    ('BS-IS', 'BS in Information Systems'),
]

GENDER = [
    ('Male', 'Male'),
    ('Female', 'Female'),
]

class Student(models.Model):
    firstName = models.CharField(max_length = 100)
    lastName = models.CharField(max_length = 100)
    course = models.CharField(max_length = 10, choices = COURSES)
    gender = models.CharField(max_length = 6, choices = GENDER)
    age = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.firstName} {self.lastName}"