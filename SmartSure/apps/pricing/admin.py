from django.contrib import admin

from apps.pricing.models import (MainMemberPricing, PricingPlan,
                                 PricingPlanCategory,
                                 PricingPlanDependentPricing,
                                 PricingPlanExtendedDependentPricing)

# Register your models here.
admin.site.register(PricingPlanCategory)
admin.site.register(PricingPlan)
admin.site.register(PricingPlanDependentPricing)
admin.site.register(PricingPlanExtendedDependentPricing)
admin.site.register(MainMemberPricing)