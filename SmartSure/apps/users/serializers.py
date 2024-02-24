from datetime import datetime

from django.conf import settings
from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework import serializers
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.exceptions import AuthenticationFailed

from apps.core.validators import check_valid_password
#from apps.notifications.tasks import welcome_new_user_task
#from apps.notifications.utils import reset_mail
from apps.users.models import Membership, User
from apps.users.utils import generate_unique_key


class UserListSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = User
        fields = "__all__"


class EditUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "id_number",
            "role",
            "phone_number",
            "gender",
            "address",
            "city",
            "country",
        ]


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "id_number",
            "role",
            "phone_number",
            "gender",
            "date_of_birth",
            "country",
            "address",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
        )
        user.first_name = validated_data["first_name"]
        user.last_name = validated_data["last_name"]
        user.id_number = validated_data["id_number"]
        user.role = validated_data["role"]
        user.phone_number = validated_data["phone_number"]
        user.country = validated_data["country"]
        user.address = validated_data["address"]
        user.date_of_birth = validated_data["date_of_birth"]
        user.gender = validated_data["gender"]
        user.save()

        token = generate_unique_key(user.email)
        user.token = token
        user.save()

        try:
            context_data = {
                "name": f"{user.first_name} {user.last_name}",
                "email": user.email,
                "phone_number": user.phone_number,
                "redirect_url": "{0}activate-account/{1}".format(
                    settings.DEFAULT_FRONT_URL, user.token
                ),
                "subject": "Welcome to Wonder Wise",
            }
            #welcome_new_user_task.delay(context_data=context_data, email=user.email)
        except Exception as e:
            raise e

        return user


class UserLoginSerializer(AuthTokenSerializer):
    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if username and password:
            user = authenticate(username=username, password=password)

            if user:
                # From Django 1.10 onwards the `authenticate` call simply
                # returns `None` for is_active=False users.
                # (Assuming the default `ModelBackend` authentication backend.)
                if not user.is_active:
                    raise serializers.ValidationError(
                        "User account is disabled.", code="authorization"
                    )
            else:
                raise AuthenticationFailed(
                    "Unable to log in with provided credentials.", code="authorization"
                )
        else:
            raise serializers.ValidationError(
                'Must include "username" and "password".', code="authorization"
            )

        attrs["user"] = user
        return attrs


class ChangePasswordSerializer(serializers.Serializer):
    user = None
    password = serializers.CharField()
    repeat_password = serializers.CharField()

    def save(self, validated_data):
        self.user.set_password(validated_data["password"])
        self.user.token = None
        self.user.token_expiration_date = None
        if not self.user.is_active:
            self.user.activation_date = datetime.date.today()
        self.user.is_active = True
        self.user.save()

    def validate(self, data):
        self.check_valid_token()
        check_valid_password(data, user=self.user)

        return data

    def check_valid_token(self):
        try:
            self.user = User.objects.get(token=self.context["token"])
        except User.DoesNotExist:
            raise serializers.ValidationError("Token is not valid.")
        fields = "__all__"


class UserActivationSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=500)


class ForgotPasswordSerializer(serializers.Serializer):
    user = None
    email = serializers.EmailField()

    def send_email(self):
        self.user.token = generate_unique_key(self.user.email)
        self.user.token_expiration_date = timezone.now() + timezone.timedelta(hours=24)
        self.user.IS_UPDATE = True
        self.user.save()
        #reset_mail(self.user)

    def validate_email(self, value):
        try:
            self.user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("No user found with provided email!")


class MembershipSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    date_created = serializers.SerializerMethodField()
    date_modified = serializers.SerializerMethodField()

    class Meta:
        model = Membership
        fields = "__all__"

    def get_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"

    def get_date_created(self, obj):
        return obj.created.date()

    def get_date_modified(self, obj):
        return obj.modified.date()