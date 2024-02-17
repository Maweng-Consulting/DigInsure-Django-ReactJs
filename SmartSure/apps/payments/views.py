from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response

from apps.payments.models import PolicyPayment, PolicyPremium
from apps.payments.serializers import (PolicyPaymentSerializer,
                                       PolicyPremiumSerializer)


# Create your views here.
class PolicyPaymentAPIView(generics.ListAPIView):
    queryset = PolicyPayment.objects.all()
    serializer_class = PolicyPaymentSerializer


class PolicyPremiumAPIView(generics.ListAPIView):
    queryset = PolicyPremium.objects.all()
    serializer_class = PolicyPremiumSerializer