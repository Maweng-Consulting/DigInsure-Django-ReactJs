from django.contrib import admin

from apps.payments.models import PolicyPayment, PolicyPremium

# Register your models here.
admin.site.register(PolicyPremium)
admin.site.register(PolicyPayment)