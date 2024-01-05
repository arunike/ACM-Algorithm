from django.db import models


class User(models.Model):
    """ User Profile Model """
    name = models.CharField(max_length=100)
    """ User's name """
    email = models.EmailField()
    """ User's email """
    password = models.CharField(max_length=100)
    """ User's password """

    def create_user(self, name: str, email: str, password: str) -> None:
        """ Create a new user """
        self.name = name
        self.email = email
        self.password = password
        self.save()

    def __str__(self):
        return self.name
