from django.contrib import admin

from apps.users.models import Membership, User

# Register your models here.
admin.site.register(User)


@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "scheme_group", "premium", "cover_amount"]
