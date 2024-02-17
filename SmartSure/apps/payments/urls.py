from django.urls import path

from apps.payments.views import PolicyPaymentAPIView, PolicyPremiumAPIView

urlpatterns = [
    path("premiums/", PolicyPremiumAPIView.as_view(), name="premiums"),
    path("policy-payments/", PolicyPaymentAPIView.as_view(), name="payments"),
]