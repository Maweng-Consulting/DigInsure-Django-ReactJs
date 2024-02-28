from django.contrib import admin

from apps.schemes.models import Scheme, SchemeGroup


# Register your models here.
@admin.register(Scheme)
class SchemeAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "scheme_type"]

@admin.register(SchemeGroup)
class SchemeGroupAdmin(admin.ModelAdmin):
    list_display = ["id", "scheme", "policy", "name", "pricing_plan", "premium"]