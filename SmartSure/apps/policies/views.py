from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response

from apps.policies.models import Policy
from apps.policies.serializers import PolicySerializer


# Create your views here.
class PolicyAPIView(generics.ListAPIView):
    queryset = Policy.objects.all()
    serializer_class = PolicySerializer


