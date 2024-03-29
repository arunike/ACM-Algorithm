from django.shortcuts import render, redirect
from rest_framework import status
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView
from users.models import User
from social_django.models import UserSocialAuth
import requests

from users.permissions import UserPermissions
from users.serializer import UserSerializer
from django.http import HttpResponseRedirect


class LoginView(TokenObtainPairView):
    def post(self, request: Request, *args, **kwargs):
        """ login view """
        login_type = request.data.get('login_type')
        if login_type == 'normal':
            serializer = self.get_serializer(data=request.data)
            try:
                serializer.is_valid(raise_exception=True)
            except TokenError as e:
                raise InvalidToken(e.args[0])

            result = serializer.validated_data
            result['username'] = serializer.user.username
            result['name'] = serializer.user.name
            result['email'] = serializer.user.email
            result['id'] = serializer.user.id
            result['token'] = result.pop('access')
            return Response(result, status=status.HTTP_200_OK)
        elif login_type == 'github':
            """ redirect to GitHub login page """
            redirect_url = reverse('social:begin', args=['github'])
            return Response({"redirect_url": f"http://127.0.0.1:8000{redirect_url}"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "login type not provided"}, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    def post(self, request):
        """ register new user """
        username = request.data.get('username')
        """ username """
        password = request.data.get('password')
        """ password """
        confirm_password = request.data.get('confirm_password')
        """ confirm_password """
        name = request.data.get('name')
        """ name """
        email = request.data.get('email')
        """ email """

        if not all([username, password, confirm_password, name, email]):
            return Response({"error": "missing data"}, status=status.HTTP_400_BAD_REQUEST)
        """ check if data is missing """
        if User.objects.filter(username=username).exists():
            """ check if username already exists """
            return Response({"error": "username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        if password != confirm_password:
            """ check if password is the same as confirm_password """
            return Response({"error": "passwords are not the same"}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            """ check if email already exists """
            return Response({"error": "email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        new_user = User.objects.create_user(username=username, password=password, name=name, email=email)
        """ create new user """
        new_user.save()
        """ save new user """
        res = {
            "id": new_user.id,
            "username": username,
            "name": name,
            "email": email
        }
        return Response(data=res, status=status.HTTP_201_CREATED)


class GitHubLoginView(APIView):
    """ GitHub login redirect view"""

    def get(self, request: Request, *args, **kwargs) -> HttpResponseRedirect:
        """ get request """
        if request.user.is_authenticated:
            github_social_auth = UserSocialAuth.objects.get(user=request.user, provider='github')
            access_token = github_social_auth.extra_data['access_token']
            headers = {
                "Accept": "application/vnd.github+json",
                "Authorization": f"Bearer {access_token}",
                "X-GitHub-Api-Version": "2022-11-28"
            }
            response = requests.get(f'https://api.github.com/user/emails', headers=headers)
            user_email = response.json()[0]['email']
            response = requests.get(f'https://api.github.com/user', headers=headers)
            name, username = response.json()['login'], response.json()['id']
            user = User.objects.filter(email=user_email).first()
            if user is None:
                random_password = User.objects.make_random_password()
                user = User.objects.create_user(username=username, password=random_password, name=name,
                                                email=user_email)
                user.save()
            user = User.objects.get(email=user_email)
            token = RefreshToken.for_user(user)
            print(user.id)
            print(token)
            print(token.access_token)
            frontend_url = f"http://127.0.0.1:3000/login-credentials?id={user.id}&username={username}&name={name}&email={user_email}&token={str(token.access_token)}&refresh={str(token)}"

            return HttpResponseRedirect(redirect_to=frontend_url, status=status.HTTP_302_FOUND)


class CustomTokenVerifyView(TokenVerifyView):
    """ custom token verify view, for both normal token and GitHub social token """

    def post(self, request: Request, *args, **kwargs) -> Response:
        """ post request for normal token verify and GitHub social token verify """
        token = request.data.get('token')
        """ get token """
        if token is None:
            return Response({"error": "token not provided"}, status=status.HTTP_400_BAD_REQUEST)
        """ check if token is provided """
        try:
            return super().post(request, *args, **kwargs)
        except InvalidToken as e:
            """ if it is not a jwt token, then check if it is a GitHub social token """
            headers = {'Authorization': f'token {token}'}  # headers for GitHub API
            response = requests.get('https://api.github.com/user', headers=headers)
            if response.status_code == 200:
                """ if GitHub API returns 200, then the token is valid """

                return Response({"message": "token is valid"}, status=status.HTTP_200_OK)
            else:
                """ if GitHub API returns other status code, then the token is invalid """
                return Response({"error": "token is invalid"}, status=status.HTTP_401_UNAUTHORIZED)


class UserViewSet(GenericViewSet, RetrieveModelMixin):
    """ user view """
    queryset = User.objects.all()
    """ queryset """
    serializer_class = UserSerializer
    """ serializer class """
    lookup_field = 'id'
    """ lookup field """
    permission_classes = [IsAuthenticated, UserPermissions]
    """ permission classes """

    def upload_avatar(self, request: Request, *args, **kwargs) -> Response:
        """ upload avatar """
        user = request.user
        """ get user """
        avatar = request.data.get('avatar')
        """ get avatar """
        if avatar is None:
            return Response({"error": "avatar not provided"}, status=status.HTTP_400_BAD_REQUEST)
        """ check if avatar is provided """
        user.avatar = avatar
        """ set avatar """
        user.save()
        """ save user """
        return Response({"message": "avatar uploaded successfully"}, status=status.HTTP_200_OK)

    def update_personal_info(self, request: Request) -> Response:
        """ update personal info """
        user = request.user
        """ get user """
        name = request.data.get('name')
        """ get name """
        bio = request.data.get('bio')
        """ get bio """
        email = request.data.get('email')
        """ get email """
        if email is not None:
            if User.objects.filter(email=email).exists():
                """ check if email already exists """
                return Response({"error": "email already exists"}, status=status.HTTP_400_BAD_REQUEST)
            user.email = email
            """ set email """

        if name is None:
            return Response({"error": "name not provided"}, status=status.HTTP_400_BAD_REQUEST)
        """ check if name is provided """
        user.name = name
        """ set name """
        user.bio = bio
        """ set bio """
        user.save()
        """ save user """
        return Response({"message": "personal info updated successfully"}, status=status.HTTP_200_OK)


def home(request):
    return render(request, 'home.html')
