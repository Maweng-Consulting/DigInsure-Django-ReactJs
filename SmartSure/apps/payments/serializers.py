from rest_framework import serializers

from apps.payments.models import PolicyPayment, PolicyPremium


class PolicyPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicyPayment
        fields = "__all__"


class PolicyPremiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicyPremium
        fields = "__all__"