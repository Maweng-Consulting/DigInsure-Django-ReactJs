from django.urls import path

from apps.policies.views import (PolicyAPIView, PolicyDetailAPIView,
                                 PolicyPremiumsAPIView)

urlpatterns = [
    path("", PolicyAPIView.as_view(), name="policies"),
    path("<int:pk>/", PolicyDetailAPIView.as_view(), name="policy-details"),
    path("policy-premiums/<int:policy_id>/", PolicyPremiumsAPIView.as_view(), name="policy-premiums"),
]