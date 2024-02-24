from django.contrib import admin

from apps.schemes.models import Scheme, SchemeGroup

# Register your models here.
admin.site.register(Scheme)

@admin.register(SchemeGroup)
class SchemeGroupAdmin(admin.ModelAdmin):
    list_display = ["id", "scheme", "policy", "name", "pricing_plan", "premium"]