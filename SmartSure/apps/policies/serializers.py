from rest_framework import serializers

from apps.policies.models import Policy, PolicyStatusUpdate


class PolicySerializer(serializers.ModelSerializer):
    date_created = serializers.SerializerMethodField()
    class Meta:
        model = Policy
        fields = "__all__"

    def get_date_created(self, obj):
        return obj.created.date()


class PolicyStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicyStatusUpdate
        fields = "__all__"