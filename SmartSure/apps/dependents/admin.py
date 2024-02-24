from django.contrib import admin

from apps.dependents.models import (Beneficiary, Dependent, ExtendedDependent,
                                    FamilyMemberType)


# Register your models here.
@admin.register(FamilyMemberType)
class FamilyMemberTypeAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "category"]