from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.db.models import Q
from .models import Submission, User, UserProfile, University, Course, UserSavedCourse
from .serializers import (
    SubmissionSerializer, UserSerializer, UserRegistrationSerializer,
    UniversitySerializer, CourseSerializer, UserSavedCourseSerializer
)

@api_view(['GET', 'POST'])
def hello(request):
    return Response({"message": 'Hello, World in Django world!'})

@api_view(['GET', 'POST'])
def submissions(request):
    if request.method == 'POST':
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
    submissions = Submission.objects.all().order_by('-created_at')
    serializer = SubmissionSerializer(submissions, many=True)
    return Response(serializer.data)

# Authentication views
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    print(f"Login attempt: {username}")
    
    user = authenticate(username=username, password=password)
    if user:
        print(f"User authenticated: {user.username}")
        refresh = RefreshToken.for_user(user)
        user_data = UserSerializer(user).data
        print(f"User data: {user_data}")
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': user_data
        })
    print(f"Authentication failed for user: {username}")
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    print(f"Getting user profile for: {request.user.username}")
    serializer = UserSerializer(request.user)
    print(f"User profile data: {serializer.data}")
    return Response(serializer.data)

# University and Course views
@api_view(['GET', 'POST'])
def list_universities(request):
    if request.method == 'GET':
        universities = University.objects.all()
        serializer = UniversitySerializer(universities, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        # Check if the user is admin
        if not request.user.is_authenticated or not request.user.profile.role == 'admin':
            return Response({'error': 'Only admins can create universities'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = UniversitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def university_detail(request, pk):
    try:
        university = University.objects.get(pk=pk)
    except University.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = UniversitySerializer(university)
        return Response(serializer.data)
    
    # Check if user is admin for modifying operations
    if not request.user.is_authenticated or not request.user.profile.role == 'admin':
        return Response({'error': 'Only admins can modify universities'}, status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'PUT':
        serializer = UniversitySerializer(university, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        university.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def list_courses(request):
    if request.method == 'GET':
        query = request.query_params.get('query', '')
        university_id = request.query_params.get('university', None)
        level = request.query_params.get('level', None)
        
        courses = Course.objects.all()
        
        if query:
            courses = courses.filter(
                Q(name__icontains=query) | 
                Q(description__icontains=query) |
                Q(university__name__icontains=query)
            )
        
        if university_id:
            courses = courses.filter(university__id=university_id)
            
        if level:
            courses = courses.filter(level=level)
        
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        # Check if the user is admin
        if not request.user.is_authenticated or not request.user.profile.role == 'admin':
            return Response({'error': 'Only admins can create courses'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def course_detail(request, pk):
    try:
        course = Course.objects.get(pk=pk)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'GET':
        serializer = CourseSerializer(course)
        return Response(serializer.data)
    
    # Check if user is admin for modifying operations
    if not request.user.is_authenticated or not request.user.profile.role == 'admin':
        return Response({'error': 'Only admins can modify courses'}, status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'PUT':
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# User saved courses
@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_saved_courses(request):
    if request.method == 'GET':
        saved_courses = UserSavedCourse.objects.filter(user=request.user)
        serializer = UserSavedCourseSerializer(saved_courses, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        course_id = request.data.get('course_id')
        try:
            course = Course.objects.get(pk=course_id)
            saved_course, created = UserSavedCourse.objects.get_or_create(
                user=request.user,
                course=course
            )
            if created:
                return Response({'message': 'Course saved successfully'}, status=status.HTTP_201_CREATED)
            return Response({'message': 'Course already saved'}, status=status.HTTP_200_OK)
        except Course.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'DELETE':
        course_id = request.data.get('course_id')
        try:
            saved_course = UserSavedCourse.objects.get(user=request.user, course_id=course_id)
            saved_course.delete()
            return Response({'message': 'Course removed from saved list'}, status=status.HTTP_200_OK)
        except UserSavedCourse.DoesNotExist:
            return Response({'error': 'Saved course not found'}, status=status.HTTP_404_NOT_FOUND)