from django.contrib import admin

from apps.payments.models import PolicyPayment, PolicyPremium


# Register your models here.
@admin.register(PolicyPremium)
class PolicyPremiumAdmin(admin.ModelAdmin):
    list_display = ["id", "membership", "policy", "scheme_group", "amount", "expected_date", "status"]

admin.site.register(PolicyPayment)