from django.db import models
from common.db import BaseModel
from django.contrib.auth.models import AbstractUser


class User(AbstractUser, BaseModel):
    name = models.CharField(max_length=20, verbose_name="name", default="")
    """ name """
    username = models.CharField(max_length=20, verbose_name="username", default="", unique=True)
    """ username """
    password = models.CharField(max_length=100, verbose_name="password")
    """ password """
    email = models.EmailField(verbose_name="email")
    """ email """
    avatar = models.ImageField(verbose_name="avatar", null=True, blank=True)
    """ avatar """
    class Meta:
        db_table = "user"
        verbose_name = "user"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username
