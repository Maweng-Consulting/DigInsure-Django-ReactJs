from django.contrib.auth.models import AbstractUser
from django.db import models

from apps.core.models import AbstractBaseModel

ROLE_CHOICES = (
    ("Customer", "Customer"),
    ("Admin", "Admin"),
    ("Agent", "Agent"),
    ("Broker", "Broker"),
)

BROKERAGE_TYPES = (
    ("Internal", "Internal"),
    ("External", "External"),
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
    postal_address = models.CharField(max_length=255, null=True)
    physical_address = models.CharField(max_length=255, null=True)
    token = models.CharField(null=True, max_length=255)
    token_expiration_date = models.DateTimeField(null=True)
    activation_date = models.DateTimeField(null=True)

    def __str__(self):
        return self.username


class BrokerAge(AbstractBaseModel):
    name = models.CharField(max_length=255)
    website = models.URLField(null=True)
    contact_person = models.CharField(max_length=255, null=True)
    phone_number = models.CharField(max_length=255, null=True)
    email = models.EmailField(null=True)
    city = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)
    postal_address = models.CharField(max_length=255, null=True)
    physical_address = models.CharField(max_length=255, null=True)
    brokerage_type = models.CharField(max_length=255, choices=BROKERAGE_TYPES, null=True)

    def __str__(self):
        return self.name

class Broker(AbstractBaseModel):
    brokerage=models.ForeignKey(BrokerAge, on_delete=models.CASCADE, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="brokers")

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.brokerage.name}"


class SalesAgent(AbstractBaseModel):
    broker = models.ForeignKey(Broker, on_delete=models.CASCADE, null=True)
    brokerage=models.ForeignKey(BrokerAge, on_delete=models.CASCADE, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    
class Membership(AbstractBaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.SET_NULL, null=True)
    membership_certificate = models.FileField(upload_to="membership_certificates", null=True)
    premium = models.DecimalField(max_digits=100, decimal_places=2)
    cover_amount = models.DecimalField(max_digits=100, decimal_places=2, default=0)
    status = models.CharField(max_length=255, choices=MEMBERSHIP_STATUS_CHOICES)

    def __str__(self):
        return self.user.username