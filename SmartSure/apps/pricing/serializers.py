from rest_framework import serializers
from rest_framework.response import Response

from apps.pricing.models import (PricingPlan, PricingPlanDependentPricing,
                                 PricingPlanExtendedDependentPricing)


class PricingPlanDependentPricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingPlanDependentPricing
        fields = "__all__"


class PricingPlanExtendedDependentPricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingPlanExtendedDependentPricing
        fields = "__all__"


class PricingPlanSerializer(serializers.ModelSerializer):
    scheme_name = serializers.SerializerMethodField()
    dependent_prices = serializers.SerializerMethodField()
    extended_prices = serializers.SerializerMethodField()
    main_member_prices = serializers.SerializerMethodField()

    class Meta:
        model = PricingPlan
        fields = "__all__"

    def get_scheme_name(self, obj):
        return obj.scheme.name

    def get_dependent_prices(self, obj):
        data = obj.dependentpricing.values()
        return data

    def get_extended_prices(self, obj):
        data = obj.extendedpricing.values()
        return data

    def get_main_member_prices(self, obj):
        data = obj.mainmemberprices.values()
        return data