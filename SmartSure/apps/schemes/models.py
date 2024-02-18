from django.db import models

from apps.core.models import AbstractBaseModel

# Create your models here.
PAYMENT_PERIOD_CHOICES = (
    ("weekly", "Weekly"),
    ("monthly", "Monthly"),
    ("quarterly", "Quarterly"),
    ("biannual", "Biannual"),
    ("yearly", "Yearly"),
    ("single", "Single"),
)

PAYMENT_METHODS = (
    ("cash", "Cash"),
    ("debit_order", "Debit Order"),
    ("stop_order", "Stop Order"),
    ("off_platform", "Off Platform"),
    ("mpesa", "Mpesa"),
    ("manual", "Manual"),
)


SCHEME_TYPES = (
    ("Car", "Car"),
    ("Pet", "Pet"),
    ("Group", "Group"),
    ("Retail", "Retail"),
    ("Credit", "Credit"),
    ("Funeral", "Funeral"),
)
SCHEME_TERM_CHOICES = (
    ("Short Term", "Short Term"),
    ("Long Term", "Long Term"),
)

CYCLE_CHOICE_TYPES = (
    ("member", "Member"),
    ("group", "Group"),
)


class Scheme(AbstractBaseModel):
    name = models.CharField(max_length=255)
    max_number_of_people = models.IntegerField(default=1)
    scheme_type = models.CharField(max_length=255, choices=SCHEME_TYPES)
    description = models.TextField(null=True)

    def __str__(self):
        return self.name


class SchemeGroup(AbstractBaseModel):
    scheme = models.ForeignKey(Scheme, on_delete=models.CASCADE)
    policy = models.OneToOneField("policies.Policy", on_delete=models.CASCADE, null=True, related_name="schemegroups")
    name = models.CharField(max_length=255, null=True, blank=True)
    payment_method = models.CharField(max_length=255, choices=PAYMENT_METHODS)
    period_type = models.CharField(max_length=255, choices=PAYMENT_PERIOD_CHOICES)
    period_frequency = models.IntegerField(default=1)
    pricing_plan = models.ForeignKey("pricing.PricingPlan", on_delete=models.CASCADE, null=True, blank=True)
    cycle_type = models.CharField(max_length=255, choices=CYCLE_CHOICE_TYPES)
    description = models.TextField(null=True, blank=True)
    premium = models.DecimalField(max_digits=100, decimal_places=2, default=0)

    def __str__(self):
        return self.name