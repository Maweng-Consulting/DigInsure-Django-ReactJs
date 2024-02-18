from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response

from apps.payments.models import PolicyPremium
from apps.payments.serializers import PolicyPremiumSerializer
from apps.policies.models import Policy, PolicyStatusUpdate
from apps.policies.serializers import (PolicySerializer,
                                       PolicyStatusUpdateSerializer)


# Create your views here.
class PolicyAPIView(generics.ListAPIView):
    queryset = Policy.objects.all()
    serializer_class = PolicySerializer


class PolicyDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Policy.objects.all()
    serializer_class = PolicySerializer

    lookup_field = "pk"


class PolicyStatusUpdateAPIView(generics.ListAPIView):
    queryset = PolicyStatusUpdate.objects.all()
    serializer_class = PolicyStatusUpdateSerializer

    def get(self, request, *args, **kwargs):
        policy_id = kwargs.get("policy_id")

        print(f"Policy ID: {policy_id}")

        if policy_id:
            queryset = PolicyStatusUpdate.objects.filter(policy=policy_id)
            serializer = self.serializer_class(instance=queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response([], status=status.HTTP_200_OK)


class PolicyPremiumsAPIView(generics.ListAPIView):
    queryset = PolicyPremium.objects.all().order_by("-expected_date")
    serializer_class = PolicyPremiumSerializer

    def get(self, request, *args, **kwargs):
        policy_id = kwargs.get("policy_id")
        if policy_id:
            queryset = PolicyPremium.objects.filter(policy=policy_id).order_by("-expected_date")
            serializer = self.serializer_class(instance=queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return super().get(request, *args, **kwargs)
