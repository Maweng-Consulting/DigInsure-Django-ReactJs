
from apps.dependents.data_methods.family_members_data import (
    beneficiaries, dependents, extended_dependents)
from apps.dependents.models import Beneficiary, Dependent, ExtendedDependent


class LoadFamilyMembersMixin(object):
    def __init__(self):
        pass

    def load_beneficiaries(self):
        beneficiaries_list = []

        for x in beneficiaries:
            beneficiaries_list.append(Beneficiary(**x))
        
        Beneficiary.objects.bulk_create(beneficiaries_list)

    def load_dependents(self):
        dependents_list = []
        for x in dependents:
            dependents_list.append(Dependent(**x))
        
        Dependent.objects.bulk_create(dependents_list)

    
    def load_extended_dependents(self):
        extended_members_list = []

        for x in extended_dependents:
            extended_members_list.append(ExtendedDependent(**x))

        ExtendedDependent.objects.bulk_create(extended_members_list)
            
