from rest_framework import serializers

from users.models import User


class UserSerializer(serializers.ModelSerializer):
    """ user serializer """

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'email', 'avatar', 'bio']


