# Generated by Django 5.0 on 2024-02-17 21:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("policies", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="PolicyPayment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("modified", models.DateTimeField(auto_now=True)),
                ("amount", models.DecimalField(decimal_places=2, max_digits=100)),
                ("payment_date", models.DateField()),
                (
                    "status",
                    models.CharField(
                        choices=[("Failed", "Failed"), ("Successful", "Successful")],
                        max_length=255,
                    ),
                ),
                (
                    "payment_method",
                    models.CharField(
                        choices=[
                            ("Mpesa", "Mpesa"),
                            ("Card", "Card"),
                            ("Manual", "Manual"),
                        ],
                        max_length=255,
                    ),
                ),
                (
                    "policy",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="policies.policy",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="PolicyPremium",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("modified", models.DateTimeField(auto_now=True)),
                ("amount", models.DecimalField(decimal_places=2, max_digits=100)),
                ("balance", models.DecimalField(decimal_places=2, max_digits=100)),
                ("expected_date", models.DateField()),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("Future", "Future"),
                            ("Failed", "Failed"),
                            ("Paid", "Paid"),
                            ("Pending", "Pending"),
                        ],
                        max_length=255,
                    ),
                ),
                ("payments", models.JSONField(default=list)),
                (
                    "payment_method",
                    models.CharField(
                        choices=[
                            ("Mpesa", "Mpesa"),
                            ("Card", "Card"),
                            ("Manual", "Manual"),
                        ],
                        max_length=255,
                    ),
                ),
                (
                    "policy",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="policies.policy",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
