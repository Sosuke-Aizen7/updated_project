from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    hello, submissions, register_user, login_user, get_user_profile,
    list_universities, university_detail, list_courses, course_detail,
    user_saved_courses
)

urlpatterns = [
    path('hello/', hello, name='hello'),
    path('submissions/', submissions, name='submissions'),
    
    # Authentication URLs
    path('auth/register/', register_user, name='register'),
    path('auth/login/', login_user, name='login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', get_user_profile, name='user_profile'),
    
    # University and Course URLs
    path('universities/', list_universities, name='universities'),
    path('universities/<int:pk>/', university_detail, name='university_detail'),
    path('courses/', list_courses, name='courses'),
    path('courses/<int:pk>/', course_detail, name='course_detail'),
    
    # User saved courses
    path('user/saved-courses/', user_saved_courses, name='user_saved_courses'),
]
