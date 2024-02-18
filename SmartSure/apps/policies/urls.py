from django.urls import path

from apps.policies.views import (PolicyAPIView, PolicyDetailAPIView,
                                 PolicyPremiumsAPIView,
                                 PolicyStatusUpdateAPIView)

urlpatterns = [
    path("", PolicyAPIView.as_view(), name="policies"),
    path("<int:pk>/", PolicyDetailAPIView.as_view(), name="policy-details"),
    path("policy-premiums/<int:policy_id>/", PolicyPremiumsAPIView.as_view(), name="policy-premiums"),
    path("policy-status-updates/<int:policy_id>/", PolicyStatusUpdateAPIView.as_view(), name="policy-status-updates"),
]