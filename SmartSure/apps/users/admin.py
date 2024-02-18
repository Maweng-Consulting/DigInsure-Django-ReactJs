from django.contrib import admin

from apps.users.models import Membership, User

# Register your models here.
admin.site.register(User)
admin.site.register(Membership)
