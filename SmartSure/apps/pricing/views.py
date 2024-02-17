from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response

from apps.pricing.models import (PricingPlan, PricingPlanDependentPricing,
                                 PricingPlanExtendedDependentPricing)
from apps.pricing.serializers import (
    PricingPlanDependentPricingSerializer,
    PricingPlanExtendedDependentPricingSerializer, PricingPlanSerializer)


# Create your views here.
class PricingPlanListCreateAPIView(generics.ListCreateAPIView):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer


class PricingPlanDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer

    lookup_field = "pk"


class DependentPricingAPIView(generics.ListCreateAPIView):
    queryset = PricingPlanDependentPricing.objects.all()
    serializer_class = PricingPlanDependentPricingSerializer


class DependentPricingDetailAPIView(generics.ListCreateAPIView):
    queryset = PricingPlanDependentPricing.objects.all()
    serializer_class = PricingPlanDependentPricingSerializer

    lookup_field = "pk"


class ExtendedDependentPricingAPIView(generics.ListCreateAPIView):
    queryset = PricingPlanExtendedDependentPricing.objects.all()
    serializer_class = PricingPlanExtendedDependentPricingSerializer


class ExtendedDependentPricingDetailAPIView(generics.ListCreateAPIView):
    queryset = PricingPlanExtendedDependentPricing.objects.all()
    serializer_class = PricingPlanExtendedDependentPricingSerializer

    lookup_field = "pk"