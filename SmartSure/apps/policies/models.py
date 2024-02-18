from django.db import models

from apps.core.models import AbstractBaseModel


# Create your models here.
class Policy(AbstractBaseModel):
    policy_number = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    sub_status = models.CharField(max_length=255, null=True)
    start_date = models.DateField()
    activation_date = models.DateField()
    premium = models.DecimalField(max_digits=100, decimal_places=2, default=0)
    

    def __str__(self):
        return self.policy_number