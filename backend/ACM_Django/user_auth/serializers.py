from .models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class SignUpSerializer(serializers.ModelSerializer):
    """ User sing up serializer"""
    name = serializers.CharField(max_length=50)
    """ name of the user """
    email = serializers.CharField(max_length=50)
    """ email of the user """
    password = serializers.CharField(max_length=30, write_only=True)
    """ password of the user, write_only=True so that it is not returned in the response """

    class Meta:
        model = User
        fields = ['name', 'email', 'password']

    def validate(self, attrs):
        """ Validate the user input """
        email_exists = User.objects.filter(email=attrs['email']).exists()
        if email_exists:
            raise serializers.ValidationError("Email already exists")
        return super().validate(attrs)


class LoginSerializer(serializers.ModelSerializer):
    """ User login serializer"""
    email = serializers.CharField(max_length=50)
    """ email of the user """
    password = serializers.CharField(max_length=30, write_only=True)
    """ password of the user, write_only=True so that it is not returned in the response """

    class Meta:
        model = User
        fields = ['email', 'password']

    def validate(self, attrs):
        """ Validate the user input """
        email = attrs['email']
        password = attrs['password']
        user = User.objects.filter(email=email, password=password).first()
        if not user:
            raise serializers.ValidationError("Invalid email or password")
        return super().validate(attrs)
