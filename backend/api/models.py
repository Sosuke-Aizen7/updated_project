from django.db import models
from django.contrib.auth.models import User

class Submission(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)  # For demo only; don't store plain passwords in real apps!
    created_at = models.DateTimeField(auto_now_add=True)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=[('student', 'Student'), ('admin', 'Admin')], default='student')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s profile"

class University(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=100)
    ranking = models.IntegerField(null=True, blank=True)
    website = models.URLField()
    image = models.CharField(max_length=255, null=True, blank=True)  # URL to image
    
    def __str__(self):
        return self.name

class Course(models.Model):
    university = models.ForeignKey(University, on_delete=models.CASCADE, related_name='courses')
    name = models.CharField(max_length=200)
    description = models.TextField()
    duration = models.CharField(max_length=50)  # e.g., "3 years", "4 semesters"
    fees = models.DecimalField(max_digits=10, decimal_places=2)
    level = models.CharField(max_length=50)  # e.g., "Undergraduate", "Postgraduate"
    
    def __str__(self):
        return f"{self.name} at {self.university.name}"

class UserSavedCourse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_courses')
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'course']
    
    def __str__(self):
        return f"{self.user.username} saved {self.course.name}"