from django.contrib import admin
from users.views import LoginView, RegisterView, GitHubLoginView
from users.views import home
from django.urls import path

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('home/', GitHubLoginView.as_view(), name='github_login'),
    path('', home, name='home'),
]