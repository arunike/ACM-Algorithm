from django.db import models


class BaseModel(models.Model):
    """ model abstract class """
    create_time = models.DateTimeField(auto_now_add=True, verbose_name="create time")
    """ auto_now_add: when create, auto add time """
    update_time = models.DateTimeField(auto_now=True, verbose_name="update time")
    """ auto_now: when update, auto update time """
    is_delete = models.BooleanField(default=False, verbose_name="delete flag")
    """ delete flag """

    class Meta:
        abstract = True
        """ abstract class, not create table in database """
        verbose_name = "base model"
        """ verbose name """
        db_table = "BaseTable"
        """ table name """
