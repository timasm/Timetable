from enum import unique
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.auth.hashers import make_password

# Create your models here.


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, firstname, lastname, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(firstname=firstname, lastname=lastname, password=password, **other_fields)

    def create_user(self, firstname, lastname, password, **other_fields):
        user = self.model(firstname=firstname, lastname=lastname, password=make_password(
            password, salt=None, hasher='default'), **other_fields)
        user.save()
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    firstname = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    username = models.CharField(max_length=25, unique=True)
    is_staff = models.BooleanField(default=False, blank=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["firstname", "lastname"]

    def __str__(self):
        return self.firstname


class Day(models.Model):
    day = models.CharField(max_length=25, unique=True)
    slots = models.JSONField()

    def __str__(self):
        return self.day


class Shiftschedule(models.Model):
    date = models.DateField()
    name = models.CharField(max_length=20, default="")
    data = models.JSONField()

    def __str__(self):
        return self.name


class SingleShiftSchedule(models.Model):
    scheduleId = models.IntegerField()
    data = models.JSONField()
    activated = models.BooleanField(default=False)

    def __str__(self):
        return self.scheduleId


class Employee(models.Model):
    firstname = models.CharField(max_length=25)
    lastname = models.CharField(max_length=25)
    duration = models.IntegerField(default=0)
    preferences = models.JSONField()
    role = models.JSONField()

    def __str__(self):
        return "{} {}".format(self.firstname, self.lastname)

    class Meta:
        unique_together = ('firstname', 'lastname')
