from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response

from apps.pricing.models import PricingPlan
from apps.pricing.serializers import PricingPlanSerializer
from apps.schemes.models import Scheme, SchemeGroup
from apps.schemes.serializers import SchemeGroupSerializer, SchemeSerializer


# Create your views here.
class SchemeListCreateAPIView(generics.ListCreateAPIView):
    queryset = Scheme.objects.all()
    serializer_class = SchemeSerializer


class SchemeDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Scheme.objects.all()
    serializer_class = SchemeSerializer

    lookup_field = "pk"

class SchemePricingPlansAPIView(generics.ListAPIView):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer

    def get(self, request, *args, **kwargs):
        scheme_id = request.query_params.get("scheme_id")
        if scheme_id:
            queryset = PricingPlan.objects.filter(scheme_id=scheme_id)
            serializer = self.serializer_class(instance=queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response([], status=status.HTTP_200_OK)

class SchemeGroupAPIView(generics.ListCreateAPIView):
    queryset = SchemeGroup.objects.all()
    serializer_class = SchemeGroupSerializer


class SchemeGroupDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SchemeGroup.objects.all()
    serializer_class = SchemeGroupSerializer

    lookup_field = "pk"