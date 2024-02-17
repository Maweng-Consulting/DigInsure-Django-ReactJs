from django.urls import path

from apps.policies.views import PolicyAPIView

urlpatterns = [
    path("", PolicyAPIView.as_view(), name="policies"),
]