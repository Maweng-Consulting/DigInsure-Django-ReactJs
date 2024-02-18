from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response

from apps.schemes.models import Scheme, SchemeGroup
from apps.schemes.serializers import SchemeGroupSerializer, SchemeSerializer


# Create your views here.
class SchemeListCreateAPIView(generics.ListCreateAPIView):
    queryset = Scheme.objects.all()
    serializer_class = SchemeSerializer


class SchemeDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Scheme.objects.all()
    serializer_class = SchemeSerializer

    lookup_field = "pk"


class SchemeGroupAPIView(generics.ListCreateAPIView):
    queryset = SchemeGroup.objects.all()
    serializer_class = SchemeGroupSerializer


class SchemeGroupDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SchemeGroup.objects.all()
    serializer_class = SchemeGroupSerializer

    lookup_field = "pk"