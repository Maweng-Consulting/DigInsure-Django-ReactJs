from rest_framework import serializers

from apps.schemes.models import Scheme, SchemeGroup


class SchemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scheme
        fields = "__all__"


class SchemeGroupSerializer(serializers.ModelSerializer):
    scheme_name = serializers.SerializerMethodField()
    policy_number = serializers.SerializerMethodField()
    pricing_plan_name = serializers.SerializerMethodField()
    date_created = serializers.SerializerMethodField()

    class Meta:
        model = SchemeGroup
        fields = "__all__"
    
    def get_scheme_name(self, obj):
        return obj.scheme.name

    def get_policy_number(self, obj):
        return obj.policy.policy_number
    
    def get_pricing_plan_name(self, obj):
        return obj.pricing_plan.name

    def get_date_created(self, obj):
        return obj.created.date()