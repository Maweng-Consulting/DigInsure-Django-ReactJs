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

    def get(self, request, *args, **kwargs):
        dependent_type = request.query_params.get("dependent_type")
        date_of_birth = request.query_params.get("date_of_birth")
        pricing_plan = request.query_params.get("pricing_plan")

        if dependent_type and date_of_birth and pricing_plan:

            if dependent_type == "Spouse":
                dependent_pricing = PricingPlanDependentPricing.objects.filter(
                pricing_plan=pricing_plan,
                dependent_type=dependent_type
                )

            
            print(dependent_pricing)

            print(date_of_birth)

            return Response({"cover_amount": 100, "premium": 10}, status=status.HTTP_200_OK)

        return super().get(request, *args, **kwargs)


class DependentPricingDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PricingPlanDependentPricing.objects.all()
    serializer_class = PricingPlanDependentPricingSerializer

    lookup_field = "pk"


class ExtendedDependentPricingAPIView(generics.ListCreateAPIView):
    queryset = PricingPlanExtendedDependentPricing.objects.all()
    serializer_class = PricingPlanExtendedDependentPricingSerializer


class ExtendedDependentPricingDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PricingPlanExtendedDependentPricing.objects.all()
    serializer_class = PricingPlanExtendedDependentPricingSerializer

    lookup_field = "pk"


## Pricing Endpoints
