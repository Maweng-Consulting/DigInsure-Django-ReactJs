from django.db import transaction
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.users.models import Broker, BrokerAge, Membership, SalesAgent, User
from apps.users.serializers import (BrokerageSerializer, BrokerSerializer,
                                    ChangePasswordSerializer,
                                    CreateBrokerSerializer,
                                    CreateSalesAgentSerializer,
                                    EditSalesAgentSerializer,
                                    EditUserProfileSerializer,
                                    ForgotPasswordSerializer,
                                    MembershipSerializer, RegisterSerializer,
                                    SalesAgentSerializer,
                                    UserActivationSerializer,
                                    UserListSerializer, UserLoginSerializer)


class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer

    #permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        queryset = User.objects.all()
        #user = request.user
        #user_data = self.queryset.get(id=user.id)
        #print(user_data)
        serializer = self.serializer_class(instance=queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BrokerListAPIView(generics.ListAPIView):
    queryset = Broker.objects.all()
    serializer_class = BrokerSerializer

    def get(self, request, *args, **kwargs):
        brokerage = request.query_params.get("brokerage")

        if brokerage and brokerage != "null":
            broker_ids = list(Broker.objects.filter(brokerage=brokerage).values_list("user_id", flat=True))
            brokers = User.objects.filter(id__in=broker_ids)
            serializer = self.serializer_class(instance=brokers, many=True)
            print(f"Brokerage: {brokerage}")
            print(broker_ids)

            return Response(serializer.data, status=status.HTTP_200_OK)

        return super().get(request, *args, **kwargs)


class BrokerCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateBrokerSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid(raise_exception=True):

            with transaction.atomic():

                brokerage = serializer.validated_data.get("brokerage")
                username = serializer.validated_data.get("username")
                email = serializer.validated_data.get("email")
                first_name = serializer.validated_data.get("first_name")
                last_name = serializer.validated_data.get("last_name")
                id_number = serializer.validated_data.get("id_number")
                role = serializer.validated_data.get("role")
                phone_number = serializer.validated_data.get("phone_number")
                gender = serializer.validated_data.get("gender")
                date_of_birth = serializer.validated_data.get("date_of_birth")
                city = serializer.validated_data.get("city")
                country = serializer.validated_data.get("country")
                physical_address = serializer.validated_data.get("postal_address")
                postal_address = serializer.validated_data.get("postal_address")

                broker = {
                    "first_name": first_name,
                    "last_name": last_name,
                    "username": username,
                    "email": email,
                    "id_number": id_number,
                    "role": role,
                    "phone_number": phone_number,
                    "gender": gender,
                    "date_of_birth": date_of_birth,
                    "city": city,
                    "country": country,
                    "physical_address": physical_address,
                    "postal_address": postal_address
                }

                user = User.objects.create(**broker)
                broker = Broker.objects.create(user=user, brokerage_id=brokerage)


                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BrokerageListCreateAPIView(generics.ListCreateAPIView):
    queryset = BrokerAge.objects.all()
    serializer_class = BrokerageSerializer


class BrokerageDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BrokerAge.objects.all()
    serializer_class = BrokerageSerializer

    lookup_field = "pk"


class SalesAgentAPIView(generics.ListCreateAPIView):
    queryset = SalesAgent.objects.all()
    serializer_class = SalesAgentSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = CreateSalesAgentSerializer(data=data)

        if serializer.is_valid(raise_exception=True):
            with transaction.atomic():
                brokerage = serializer.validated_data.get("brokerage")
                broker_id = serializer.validated_data.get("broker")
                username = serializer.validated_data.get("username")
                email = serializer.validated_data.get("email")
                first_name = serializer.validated_data.get("first_name")
                last_name = serializer.validated_data.get("last_name")
                id_number = serializer.validated_data.get("id_number")
                role = serializer.validated_data.get("role")
                phone_number = serializer.validated_data.get("phone_number")
                gender = serializer.validated_data.get("gender")
                date_of_birth = serializer.validated_data.get("date_of_birth")
                city = serializer.validated_data.get("city")
                country = serializer.validated_data.get("country")
                physical_address = serializer.validated_data.get("postal_address")
                postal_address = serializer.validated_data.get("postal_address")
                
                agent = {
                    "first_name": first_name,
                    "last_name": last_name,
                    "username": username,
                    "email": email,
                    "id_number": id_number,
                    "role": role,
                    "phone_number": phone_number,
                    "gender": gender,
                    "date_of_birth": date_of_birth,
                    "city": city,
                    "country": country,
                    "physical_address": physical_address,
                    "postal_address": postal_address
                }

                print(f"Brokerage: {type(brokerage)}, Broker: {type(broker_id)}")
                
                user = User.objects.create(**agent)
                broker = Broker.objects.get(user_id=broker_id)
                
                SalesAgent.objects.create(
                    user=user,
                    broker=broker,
                    brokerage_id=brokerage
                )
                
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SalesAgentEditAPIView(generics.RetrieveUpdateAPIView):
    queryset = SalesAgent.objects.all()
    serializer_class = EditSalesAgentSerializer    

    lookup_field = "pk"

    def update(self, request, *args, **kwargs):
        data = request.data
        print(data)
        return super().update(request, *args, **kwargs)

class SalesAgentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = SalesAgentSerializer

    lookup_field = "pk"


class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = EditUserProfileSerializer

    lookup_field = "pk"


class UserLoginAPIView(ObtainAuthToken):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]

    def get_serializer(self):
        return self.serializer_class()

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token = Token.objects.get(user=user).key

        # Update last_login of the current user
        user.last_login = timezone.now()
        user.save()

        response = {
            "token": token,
            "pk": user.pk,
            "role": user.role,
            "username": user.username,
            "email": user.email,
            "name": f"{user.first_name} {user.last_name}"
            #'view_id': user.get_view_id,
        }

        return Response(response)


class RegisterUserAPIView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)


class UserRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = EditUserProfileSerializer

    lookup_field = "pk"


class ForgotPasswordAPIView(APIView):
    serializer_class = ForgotPasswordSerializer
    permission_classes = [
        AllowAny,
    ]

    def get_serializer_class(self):
        return self.serializer_class()

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #serializer.send_email()

        return Response(
            {"message": "Password reset link will be send to your email!"},
            status=status.HTTP_200_OK,
        )


class ChangePasswordAPIView(APIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [
        AllowAny,
    ]

    def get_serializer_class(self):
        return self.serializer_class()

    def post(self, request, token):
        context = {"request": request, "token": token}
        serializer = self.serializer_class(data=request.data, context=context)
        if serializer.is_valid():
            serializer.save(serializer.validated_data)
            return Response(
                {"message": "Password has been successfully changed"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserActivationAPIView(APIView):
    serializer_class = UserActivationSerializer
    permission_classes = [
        AllowAny,
    ]

    def post(self, request, *args, **kwargs):
        data = request.data

        serializer = self.serializer_class(data=data)

        if serializer.is_valid(raise_exception=True):
            user = User.objects.get(token=data["token"])
            user.is_active = True
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

class MembershipListCreateAPIView(generics.ListCreateAPIView):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer

    def get(self, request, *args, **kwargs):
        queryset = Membership.objects.all()
        scheme_group = request.query_params.get("scheme_group")
        print(f"Scheme Group: {scheme_group}")

        if scheme_group:
            queryset = queryset.filter(scheme_group=scheme_group)
            serializer = self.serializer_class(instance=queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return super().get(request, *args, **kwargs)


class MembershipDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer

    lookup_field = "pk"