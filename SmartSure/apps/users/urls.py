from django.urls import path

from apps.users.views import (MembershipDetailAPIView,
                              MembershipListCreateAPIView, UserListAPIView)

urlpatterns = [
    path("", UserListAPIView.as_view(), name="users"),
    path("memberships/", MembershipListCreateAPIView.as_view(), name="memberships"),
    path("memberships/<int:pk>/", MembershipDetailAPIView.as_view(), name="membership-details"),
]