from django.contrib import admin

from apps.policies.models import Policy, PolicyStatusUpdate


# Register your models here.
@admin.register(Policy)
class PolicyAdmin(admin.ModelAdmin):
    list_display = ["id", "policy_number", "start_date", "status", "sub_status", "premium"]

admin.site.register(PolicyStatusUpdate)
