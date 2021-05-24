
from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import User
# from django.utils import timezone
from datetime import datetime

# Create your models here.


def upload_path_handler(instance, filename):
    return "{id}/{file}".format(id=instance.blogIdentifier, file=filename)

class Author(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    title = models.CharField(max_length=300)
    blogIdentifier = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              upload_to=upload_path_handler)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(null=True, blank=True)
    post_date = models.DateTimeField(default=datetime.now())
    category = models.CharField(max_length=255, default="Technology")
    likes = models.IntegerField(null=True, blank=True, default=0)


