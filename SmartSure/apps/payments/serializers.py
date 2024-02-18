from rest_framework import serializers

from apps.payments.models import PolicyPayment, PolicyPremium


class PolicyPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicyPayment
        fields = "__all__"


class PolicyPremiumSerializer(serializers.ModelSerializer):
    member = serializers.SerializerMethodField()
    class Meta:
        model = PolicyPremium
        fields = "__all__"

    def get_member(self, obj):
        return f"{obj.membership.user.first_name} {obj.membership.user.last_name}"