from django.urls import path

from apps.users.views import (BrokerageDetailAPIView,
                              BrokerageListCreateAPIView, BrokerCreateAPIView,
                              BrokerListAPIView, MembershipDetailAPIView,
                              MembershipListCreateAPIView, SalesAgentAPIView,
                              SalesAgentDetailAPIView, SalesAgentEditAPIView,
                              UserListAPIView)

urlpatterns = [
    path("", UserListAPIView.as_view(), name="users"),
    path("memberships/", MembershipListCreateAPIView.as_view(), name="memberships"),
    path("memberships/<int:pk>/", MembershipDetailAPIView.as_view(), name="membership-details"),
    path("sales-agents/", SalesAgentAPIView.as_view(), name="sales-agents"),
    path("sales-agents/<int:pk>/", SalesAgentDetailAPIView.as_view(), name="sales-agents-details"),
    path("sales-agent-edit/<int:pk>/",SalesAgentEditAPIView.as_view(), name="sales-agent-edit"),

    path("brokers/", BrokerListAPIView.as_view(), name="brokers"),
    path("create-broker/", BrokerCreateAPIView.as_view(), name="create-broker"),

    path("brokerages/", BrokerageListCreateAPIView.as_view(), name="brokerages"),
    path("brokerages/<int:pk>/", BrokerageDetailAPIView.as_view(), name="brokerage-details"),
]