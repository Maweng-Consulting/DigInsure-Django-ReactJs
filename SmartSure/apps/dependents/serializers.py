from rest_framework import serializers

from apps.dependents.models import Beneficiary, Dependent, ExtendedDependent


class DependentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dependent
        fields = "__all__"


class ExtendedDependentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtendedDependent
        fields = "__all__"


class BeneficiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Beneficiary
        fields = "__all__"