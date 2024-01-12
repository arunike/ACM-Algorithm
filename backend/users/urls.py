from rest_framework_simplejwt.views import TokenRefreshView
from users.views import RegisterView, GitHubLoginView, CustomTokenVerifyView, home, UserViewSet, LoginView

from django.urls import path


"""
api/user/login/ - login view
api/user/register/ - register view
api/user/home/ - home view
api/user/token/refresh/ - refresh token view
api/user/token/verify/ - verify token view
api/user/user/<int:id>/ - user detail view
api/user/users/<int:id>/avatar/upload/ - upload avatar view
"""
urlpatterns = [
    # path('login/', LoginView.as_view(), name='login'),  # login view
    path('register/', RegisterView.as_view(), name='register'),  # register view
    path('github-credential-redirect/', GitHubLoginView.as_view(), name='github_login'),   # GitHub login view
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # refresh token view
    path('token/verify/', CustomTokenVerifyView.as_view(), name='token_verify'),  # verify token view
    path('user/<int:id>/', UserViewSet.as_view({'get': 'retrieve'}), name='user_detail'),  # user detail view
    path('user/<int:id>/avatar/upload/', UserViewSet.as_view({'post': 'upload_avatar'}), name='upload_avatar'),
    path('user/update-personal-info/', UserViewSet.as_view({'post': 'update_personal_info'}), name='update_user'),
    path('login/', LoginView.as_view(), name='login'),  # login view
    path('', home, name='home'),  # home view
]