# Generated by Django 5.1.1 on 2024-11-29 11:25

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0003_alter_listing_open_house"),
    ]

    operations = [
        migrations.AddField(
            model_name="listing",
            name="maps_location",
            field=models.CharField(default="na", max_length=200),
        ),
    ]
