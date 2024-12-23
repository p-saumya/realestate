from django.db import models
from datetime import datetime
from django.utils import timezone

# Create your models here.
class Contact(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    seller_email = models.CharField(max_length=50)
    subject = models.CharField(max_length=100)
    message = models.TextField(blank=True)
    contact_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.email