# Generated by Django 5.1.1 on 2024-11-29 11:39

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0005_alter_listing_maps_location"),
    ]

    operations = [
        migrations.AlterField(
            model_name="listing",
            name="maps_location",
            field=models.CharField(default="na", max_length=1000),
        ),
    ]
