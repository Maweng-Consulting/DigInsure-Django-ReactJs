from django.db import models

from apps.core.choices import DEPENDENT_TYPES, EXTENDED_FAMILY_DEPENDENT_TYPES
from apps.core.models import AbstractBaseModel

# Create your models here.
PRICING_PLAN_KINDS = (
    ("short_term", "Short Term"),
    ("long_term", "Long Term"),
)

SCHEME_TYPE_CHOICES = (
    ("Car", "Car"),
    ("Pet", "Pet"),
    ("Group", "Group"),
    ("Retail", "Retail"),
    ("Credit", "Credit"),
    ("Funeral", "Funeral"),
)

PLAN_TYPES = (
    ("Short Term", "Short Term"),
    ("Long Term", "Long Term"),
)

EXTENDED_COVER_LEVELS = (
    (15000, 15000),
    (25000, 25000),
    (35000, 35000),
)

MAIN_MEMBER_COVER_LEVELS = (
    (150000, 150000),
    (200000, 200000),
    (260000, 260000),
    (300000, 300000),
)

class PricingPlanCategory(AbstractBaseModel):
    name = models.CharField(max_length=255)
    kind = models.CharField(max_length=255, default="long_term", choices=PRICING_PLAN_KINDS)

    def __str__(self):
        return self.name


class PricingPlan(AbstractBaseModel):
    name = models.CharField(max_length=255)
    base_premium = models.DecimalField(max_digits=100, decimal_places=2)
    vat = models.DecimalField(max_digits=100, decimal_places=2)
    total_premium = models.DecimalField(max_digits=100, decimal_places=2)
    scheme = models.ForeignKey("schemes.Scheme", on_delete=models.SET_NULL, null=True)
    plan_type = models.CharField(max_length=255, choices=PLAN_TYPES, null=True)
    base_cover = models.DecimalField(max_digits=100, decimal_places=2, default=0)

    def __str__(self):
        return self.name


class MainMemberPricing(AbstractBaseModel):
    pricing_plan = models.ForeignKey(PricingPlan, on_delete=models.CASCADE, related_name="mainmemberprices")
    cover_amount = models.DecimalField(max_digits=100, decimal_places=2, choices=MAIN_MEMBER_COVER_LEVELS)
    premium = models.DecimalField(max_digits=100, decimal_places=2)
    dependent_type = models.CharField(max_length=255, default="Main Member")

    def __str__(self):
        return self.pricing_plan.name
    

class PricingPlanDependentPricing(AbstractBaseModel):
    pricing_plan = models.ForeignKey(PricingPlan, on_delete=models.CASCADE, related_name="dependentpricing")
    min_age = models.IntegerField(default=0)
    max_age = models.IntegerField(default=0)
    premium = models.DecimalField(max_digits=100, decimal_places=2)
    cover_amount = models.DecimalField(max_digits=100, decimal_places=2)
    dependent_type = models.CharField(max_length=255, choices=DEPENDENT_TYPES)

    def __str__(self):
        return f"{self.pricing_plan.name} cover for {self.dependent_type} is {self.cover_amount}, Prem is: {self.premium}"


class PricingPlanExtendedDependentPricing(AbstractBaseModel):
    pricing_plan = models.ForeignKey(PricingPlan, on_delete=models.CASCADE, related_name="extendedpricing")
    min_age = models.IntegerField(default=0)
    max_age = models.IntegerField(default=0)
    premium = models.DecimalField(max_digits=100, decimal_places=2)
    cover_amount = models.DecimalField(max_digits=100, decimal_places=2, choices=EXTENDED_COVER_LEVELS)
    dependent_type = models.CharField(max_length=255, default="Extended")

    def __str__(self):
        return f"{self.pricing_plan.name} cover for {self.dependent_type} is {self.cover_amount},({self.min_age} - {self.max_age}) Prem is: {self.premium}"