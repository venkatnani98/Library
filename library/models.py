from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .models import *
from django.utils.translation import gettext_lazy as _


# Create your models here.
class User(AbstractBaseUser):
    PIN = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.TextField(default="Pass123")
    aToken = models.TextField(null=True)
    rToken = models.TextField(null=True)
    account_type = models.CharField(max_length=100, default='user')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.first_name


class Books(models.Model):
    BookId = models.CharField(max_length=100, primary_key=True)
    BookName = models.CharField(max_length=100)
    Author = models.CharField(max_length=100, default='None')
    Branch = models.CharField(max_length=100)
    Year = models.CharField(max_length=100)
    Stock = models.IntegerField(default= 10)

    def __str__(self):
        return self.BookName
    

class Student(models.Model):
    FirstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100, null=True)
    FatherName = models.CharField(max_length=100, null=True)
    DOB = models.DateField(null=True)
    Gender = models.CharField(max_length=100, null=True)
    PIN = models.CharField(max_length=100, primary_key=True)
    Email = models.EmailField(max_length=100)
    Mobile = models.IntegerField(null=True)
    Branch = models.CharField(max_length=100, null=True)
    Year = models.CharField(max_length=100, null=True)


    def __str__(self):
        return self.FirstName
    

class Rents(models.Model):
    PIN = models.CharField(max_length=100)
    FirstName = models.CharField(max_length=100)
    BookId = models.CharField(max_length=100)
    Rent_Date = models.DateField(null=True)
    Return_Date = models.DateField(null=True)
    Returned_On = models.DateField(null=True)
    Days = models.DurationField(blank=True, null=True)
    Due = models.IntegerField(default=0)
    Rtn = models.BooleanField(default=False)
    Payment = models.CharField(max_length=100, default='Unpaid')

    def save(self, *args, **kwargs):
        if self.Rent_Date and self.Returned_On:
            self.Days = self.Returned_On - self.Rent_Date
        else:
            self.Days = None
        super().save(*args, **kwargs)


