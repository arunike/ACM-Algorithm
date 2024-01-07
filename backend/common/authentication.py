from django.contrib.auth.backends import ModelBackend
from django.db.models import Q
from users.models import User
from rest_framework import serializers


class MyBackend(ModelBackend):
    """ custom authentication backend """
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(Q(username=username) | Q(email=username))
        except User.DoesNotExist:
            raise serializers.ValidationError({"error": "username or password is wrong"})
        else:
            if user.check_password(password):
                return user
            else:
                raise serializers.ValidationError({"error": "username or password is wrong"})
