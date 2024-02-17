# Generated by Django 5.0 on 2024-02-17 17:06

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("pricing", "0004_alter_pricingplanextendeddependentpricing_dependent_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="pricingplanextendeddependentpricing",
            name="cover_amount",
            field=models.DecimalField(
                choices=[(15000, 15000), (25000, 25000), (35000, 35000)],
                decimal_places=2,
                max_digits=100,
            ),
        ),
    ]
