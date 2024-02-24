from django.contrib.auth.models import AbstractUser
from django.db import models

from apps.core.models import AbstractBaseModel

ROLE_CHOICES = (
    ("Customer", "Customer"),
    ("Admin", "Admin"),
    ("Agent", "Agent"),
    ("Broker", "Broker"),
)

GENDER_CHOICES = (
    ("Male", "Male"),
    ("Female", "Female"),
)

MEMBERSHIP_STATUS_CHOICES = (
    ("Cancelled", "Cancelled"),
    ("Lapsed", "Lapsed"),
    ("Active", "Active"),
)
# Create your models here.
class User(AbstractUser, AbstractBaseModel):
    role = models.CharField(choices=ROLE_CHOICES, max_length=32, null=True)
    phone_number = models.CharField(max_length=255, null=True)
    id_number = models.CharField(max_length=255, null=True)
    gender = models.CharField(max_length=255, null=True, choices=GENDER_CHOICES)
    date_of_birth = models.DateField(null=True)
    city = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)
    address = models.CharField(max_length=255, null=True)
    token = models.CharField(null=True, max_length=255)
    token_expiration_date = models.DateTimeField(null=True)
    activation_date = models.DateTimeField(null=True)

    def __str__(self):
        return self.username
    

class Membership(AbstractBaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.SET_NULL, null=True)
    membership_certificate = models.FileField(upload_to="membership_certificates", null=True)
    premium = models.DecimalField(max_digits=100, decimal_places=2)
    cover_amount = models.DecimalField(max_digits=100, decimal_places=2, default=0)
    status = models.CharField(max_length=255, choices=MEMBERSHIP_STATUS_CHOICES)

    def __str__(self):
        return self.user.username