from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response

from apps.dependents.models import (Beneficiary, Dependent, ExtendedDependent,
                                    FamilyMemberType)
from apps.dependents.serializers import (BeneficiarySerializer,
                                         DependentSerializer,
                                         ExtendedDependentSerializer,
                                         FamilyMemberTypeSerializer)


# Create your views here.
class FamilyMemberTypeListAPIView(generics.ListAPIView):
    queryset = FamilyMemberType.objects.all()
    serializer_class = FamilyMemberTypeSerializer

    """
    def get(self, request, *args, **kwargs):
        category = request.query_params.get("category")

        if category:
            family_types = FamilyMemberType.objects.filter(category=category)
            serializer = self.serializer_class(instance=family_types, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response([], status=status.HTTP_200_OK)
    """

class DependentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Dependent.objects.all()
    serializer_class = DependentSerializer

    def get(self, request, *args, **kwargs):
        membership = request.query_params.get("membership")
        scheme_group = request.query_params.get("scheme_group")

        print(f"Scheme Group: {scheme_group}, Membership: {membership}")
        print(request.query_params)

        if membership and scheme_group:
            dependents = Dependent.objects.filter(membership=membership, scheme_group=scheme_group)
            serializer = self.serializer_class(instance=dependents, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return super().get(request, *args, **kwargs)


class DependentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dependent.objects.all()
    serializer_class = DependentSerializer

    lookup_field = "pk"


class BeneficiaryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Beneficiary.objects.all()
    serializer_class = BeneficiarySerializer

    def get(self, request, *args, **kwargs):
        membership = request.query_params.get("membership")
        scheme_group = request.query_params.get("scheme_group")

        print(f"Scheme Group: {scheme_group}, Membership: {membership}")
        print(request.query_params)

        if membership and scheme_group:
            beneficiaries = Beneficiary.objects.filter(membership=membership, scheme_group=scheme_group)
            serializer = self.serializer_class(instance=beneficiaries, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return super().get(request, *args, **kwargs)


class BeneficiaryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Beneficiary.objects.all()
    serializer_class = BeneficiarySerializer

    lookup_field = "pk"


class ExtendedDepedentListCreateAPIView(generics.ListCreateAPIView):
    queryset = ExtendedDependent.objects.all()
    serializer_class = ExtendedDependentSerializer

    def get(self, request, *args, **kwargs):
        membership = request.query_params.get("membership")
        scheme_group = request.query_params.get("scheme_group")

        print("*****************Inside Extended Dependents********************")
        print(f"Scheme Group: {scheme_group}, Membership: {membership}")
        print(request.query_params)
        print("*****************Inside Extended Dependents********************")

        if membership and scheme_group:
            dependents = ExtendedDependent.objects.filter(membership=membership, scheme_group=scheme_group)
            serializer = self.serializer_class(instance=dependents, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return super().get(request, *args, **kwargs)


class ExtendedDependentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExtendedDependent.objects.all()
    serializer_class = ExtendedDependentSerializer

    lookup_field = "pk"