from django.contrib.auth.backends import ModelBackend


class UserBackend(ModelBackend):
    """
    Custom user authentication
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        """
        Custom user authentication
        :param request: request
        :param username: username
        :param password: password
        :param kwargs: kwargs
        :return: user
        """
        try:
            user = User.objects.get(username=username)
            if user.check_password(password):
                return user
        except Exception as e:
            return None
