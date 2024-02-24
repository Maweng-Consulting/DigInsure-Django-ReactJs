from django.contrib import admin

from apps.pricing.models import (MainMemberPricing, PricingPlan,
                                 PricingPlanCategory,
                                 PricingPlanDependentPricing,
                                 PricingPlanExtendedDependentPricing)

# Register your models here.
admin.site.register(PricingPlanCategory)
admin.site.register(PricingPlan)

@admin.register(PricingPlanDependentPricing)
class PricingPlanDependentPricingAdmin(admin.ModelAdmin):
    list_display = ["id", "pricing_plan", "min_age", "max_age", "premium", "cover_amount", "dependent_type"]

admin.site.register(PricingPlanExtendedDependentPricing)
admin.site.register(MainMemberPricing)