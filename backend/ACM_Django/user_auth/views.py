from rest_framework.response import Response
from .serializers import SignUpSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.request import Request
from .models import User


class SignUpView(generics.GenericAPIView):
    """ User sign up view """
    serializer_class = SignUpSerializer

    def post(self, request: Request) -> Response:
        """ User sign up post request """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            if not User.objects.filter(email=email).exists():
                serializer.save()
                response = {
                    "message": "User registered successfully",
                    "user": serializer.data
                }
                return Response(data=response, status=status.HTTP_201_CREATED)
            else:
                print("Email already exists")
                response = {
                    "message": "Email already exists"
                }
                return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
