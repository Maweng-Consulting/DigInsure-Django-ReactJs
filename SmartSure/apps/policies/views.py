from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response

from apps.payments.models import PolicyPremium
from apps.payments.serializers import PolicyPremiumSerializer
from apps.policies.models import Policy
from apps.policies.serializers import PolicySerializer


# Create your views here.
class PolicyAPIView(generics.ListAPIView):
    queryset = Policy.objects.all()
    serializer_class = PolicySerializer


class PolicyDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Policy.objects.all()
    serializer_class = PolicySerializer

    lookup_field = "pk"


class PolicyPremiumsAPIView(generics.ListAPIView):
    queryset = PolicyPremium.objects.all()
    serializer_class = PolicyPremiumSerializer

    def get(self, request, *args, **kwargs):
        policy_id = kwargs.get("policy_id")
        if policy_id:
            queryset = PolicyPremium.objects.filter(policy=policy_id)
            serializer = self.serializer_class(instance=queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return super().get(request, *args, **kwargs)
