from django.db import models

from apps.core.models import AbstractBaseModel

# Create your models here.
PAYMENT_STATUS_CHOICES = (
    ("Failed", "Failed"),
    ("Successful", "Successful"),
)

PREMIUM_STATUS_CHOICES = (
    ("Future", "Future"),
    ("Failed", "Failed"),
    ("Paid", "Paid"),
    ("Pending", "Pending"),
)

PAYMENT_METHODS = (
    ("Mpesa", "Mpesa"),
    ("Card", "Card"),
    ("Manual", "Manual"),
)

class PolicyPayment(AbstractBaseModel):
    policy = models.ForeignKey("policies.Policy", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=100, decimal_places=2)
    payment_date = models.DateField()
    status = models.CharField(max_length=255, choices=PAYMENT_STATUS_CHOICES)
    payment_method = models.CharField(max_length=255, choices=PAYMENT_METHODS)

    def __str__(self):
        return f"{self.policy.policy_number} - {self.payment_date}"


class PolicyPremium(AbstractBaseModel):
    policy = models.ForeignKey("policies.Policy", on_delete=models.CASCADE)
    membership = models.ForeignKey("users.Membership", on_delete=models.SET_NULL, null=True)
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=100, decimal_places=2)
    balance = models.DecimalField(max_digits=100, decimal_places=2)
    expected_date = models.DateField()
    status = models.CharField(max_length=255, choices=PREMIUM_STATUS_CHOICES)
    payments = models.JSONField(default=list)
    payment_method = models.CharField(max_length=255, choices=PAYMENT_METHODS)

    def __str__(self):
        return f"{self.policy.policy_number} - {self.expected_date}"