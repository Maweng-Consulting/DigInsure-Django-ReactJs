from rest_framework import serializers

from apps.policies.models import Policy, PolicyStatusUpdate


class PolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = Policy
        fields = "__all__"


class PolicyStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicyStatusUpdate
        fields = "__all__"