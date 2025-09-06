from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Submission, UserProfile, University, Course, UserSavedCourse

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['role', 'created_at']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']
        extra_kwargs = {'password': {'write_only': True}}
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        print(f"User representation: {representation}")
        # Make sure profile is included
        if not representation.get('profile') and hasattr(instance, 'userprofile'):
            representation['profile'] = UserProfileSerializer(instance.userprofile).data
            print(f"Added profile: {representation['profile']}")
        return representation

class UserRegistrationSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(write_only=True)
    role = serializers.CharField(write_only=True, required=False, default='student')
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'first_name', 'last_name', 'role']
        extra_kwargs = {'password': {'write_only': True}}
    
    def validate(self, data):
        if data['password'] != data.pop('password_confirm'):
            raise serializers.ValidationError("Passwords do not match!")
        return data
    
    def create(self, validated_data):
        role = validated_data.pop('role', 'student')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user, role=role)
        return user

class CourseSerializer(serializers.ModelSerializer):
    university_name = serializers.CharField(source='university.name', read_only=True)
    
    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'duration', 'fees', 'level', 'university', 'university_name']

class UniversitySerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True, read_only=True)
    
    class Meta:
        model = University
        fields = ['id', 'name', 'description', 'location', 'ranking', 'website', 'image', 'courses']

class UserSavedCourseSerializer(serializers.ModelSerializer):
    course_details = CourseSerializer(source='course', read_only=True)
    
    class Meta:
        model = UserSavedCourse
        fields = ['id', 'course', 'saved_at', 'course_details']