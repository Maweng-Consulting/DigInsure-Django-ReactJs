from django.db import models

from apps.core.choices import (DEPENDENT_TYPES,
                               EXTENDED_FAMILY_DEPENDENT_TYPES,
                               FAMILY_RELATIONSHIP_TYPES, GENDER_CHOICES)
from apps.core.models import AbstractBaseModel


# Create your models here.
class FamilyMemberType(AbstractBaseModel):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Dependent(AbstractBaseModel):
    membership = models.ForeignKey("users.Membership", on_delete=models.CASCADE)
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.SET_NULL, null=True)
    dependent_type = models.CharField(max_length=255, choices=DEPENDENT_TYPES)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(null=True)
    id_number = models.CharField(max_length=255, null=True)
    phone_number = models.CharField(max_length=255, null=True)
    gender = models.CharField(max_length=255, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    premium = models.DecimalField(max_digits=100, decimal_places=2, default=0)
    cover_amount = models.DecimalField(max_digits=100, decimal_places=2, default=0)
    address = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class ExtendedDependent(AbstractBaseModel):
    membership = models.ForeignKey("users.Membership", on_delete=models.CASCADE)
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.SET_NULL, null=True)
    dependent_type = models.CharField(max_length=255, choices=EXTENDED_FAMILY_DEPENDENT_TYPES)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(null=True)
    id_number = models.CharField(max_length=255, null=True)
    phone_number = models.CharField(max_length=255, null=True)
    gender = models.CharField(max_length=255, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    premium = models.DecimalField(max_digits=100, decimal_places=2, default=0)
    cover_amount = models.DecimalField(max_digits=100, decimal_places=2, default=0)
    address = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Beneficiary(AbstractBaseModel):
    membership = models.ForeignKey("users.Membership", on_delete=models.CASCADE)
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.SET_NULL, null=True)
    relationship = models.CharField(max_length=255, choices=FAMILY_RELATIONSHIP_TYPES)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(null=True)
    id_number = models.CharField(max_length=255, null=True)
    phone_number = models.CharField(max_length=255, null=True)
    gender = models.CharField(max_length=255, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    guardian_name = models.CharField(max_length=255, null=True)
    guardian_phone_number =models.CharField(max_length=255, null=True)
    guardian_email = models.CharField(max_length=255, null=True)
    guardian_relationship = models.CharField(max_length=255, choices=EXTENDED_FAMILY_DEPENDENT_TYPES, null=True)
    guardian_date_of_birth = models.DateField(null=True)
    guardian_address = models.CharField(max_length=255, null=True)
    guarding_city = models.CharField(max_length=255, null=True)
    guardian_country = models.CharField(max_length=255, null=True)
    address = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)
    is_active = models.BooleanField(default=True)
    

    def __str__(self):
        return f"{self.first_name} {self.last_name}"