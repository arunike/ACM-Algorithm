from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from users.models import User
from social_django.models import UserSocialAuth


class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            print("serializer is valid")
        except TokenError as e:
            raise InvalidToken(e.args[0])

        result = serializer.validated_data
        result['username'] = serializer.user.username
        result['name'] = serializer.user.name
        result['email'] = serializer.user.email

        return Response(result, status=status.HTTP_200_OK)


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
            "username": username,
            "name": name,
            "email": email
        }
        return Response(data=res, status=status.HTTP_201_CREATED)


class GitHubLoginView(APIView):
    """ GitHub login redirect view"""
    def get(self, request):
        """ get request """
        print(request.user.is_authenticated)
        print(request.user.id)
        if request.user.is_authenticated:
            github_social_auth = UserSocialAuth.objects.get(user=request.user, provider='github')
            access_token = github_social_auth.extra_data['access_token']
            """ get access token """
            print(access_token)
            return Response(data={"access_token": access_token}, status=status.HTTP_200_OK)
        else:
            return Response(data={"error": "user not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)


def home(request):
    # print(type(request))
    # print(request.user)
    return render(request, 'home.html')
