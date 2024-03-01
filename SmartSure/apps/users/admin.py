from django.contrib import admin

from apps.users.models import Broker, BrokerAge, Membership, SalesAgent, User


# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["id", "first_name", "last_name", "email", "username", "role"]


admin.site.register(BrokerAge)
@admin.register(SalesAgent)
class SalesAgentAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "broker", "brokerage"]

@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "scheme_group", "premium", "cover_amount"]
