from rest_framework_simplejwt.views import TokenRefreshView
from users.views import LoginView, RegisterView, GitHubLoginView, CustomTokenVerifyView, home
from django.urls import path


urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),  # login view
    path('register/', RegisterView.as_view(), name='register'),  # register view
    path('home/', GitHubLoginView.as_view(), name='github_login'),   # GitHub login view
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # refresh token view
    path('token/verify/', CustomTokenVerifyView.as_view(), name='token_verify'),  # verify token view
    path('', home, name='home'),
]