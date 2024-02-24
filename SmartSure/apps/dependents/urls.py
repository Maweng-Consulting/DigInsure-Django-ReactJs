from django.urls import path

from apps.dependents.views import (BeneficiaryDetailAPIView,
                                   BeneficiaryListCreateAPIView,
                                   DependentDetailAPIView,
                                   DependentListCreateAPIView,
                                   ExtendedDepedentListCreateAPIView,
                                   ExtendedDependentDetailAPIView,
                                   FamilyMemberTypeListAPIView)

urlpatterns = [
    path("dependents/", DependentListCreateAPIView.as_view(), name="dependents"),
    path("dependents/<int:pk>/", DependentDetailAPIView.as_view(), name="dependent-details"),

    path("beneficiaries/", BeneficiaryListCreateAPIView.as_view(), name="beneficiaries"),
    path("beneficiaries/<int:pk>/", BeneficiaryDetailAPIView.as_view(), name="beneficiary-details"),

    path("extended-dependents/", ExtendedDepedentListCreateAPIView.as_view(), name="extended-dependents"),
    path("extended-dependents/<int:pk>/", ExtendedDependentDetailAPIView.as_view(), name="extended-dependents-details"),

    path("family-member-types/", FamilyMemberTypeListAPIView.as_view(), name="family-member-types"),
]