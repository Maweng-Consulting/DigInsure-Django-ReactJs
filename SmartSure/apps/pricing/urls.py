from django.urls import path

from apps.pricing.views import (DependentPricingAPIView,
                                DependentPricingDetailAPIView,
                                ExtendedDependentPricingAPIView,
                                ExtendedDependentPricingDetailAPIView,
                                PricingPlanDetailAPIView,
                                PricingPlanListCreateAPIView)

urlpatterns = [
    path("pricing-plans/", PricingPlanListCreateAPIView.as_view(), name="pricing-plans"),
    path("pricing-plans/<int:pk>/", PricingPlanDetailAPIView.as_view(), name="pricing-plan-details"),
    path("dependent-pricing/", DependentPricingAPIView.as_view(), name="dependent-pricing"),
]