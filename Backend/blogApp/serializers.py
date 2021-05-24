from django.db.models import fields
from .models import BlogPost
from django.contrib.auth.models import User
from django.db.models.fields import EmailField
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class UserSerializers(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False)
    username = serializers.CharField(required=True, validators=[UniqueValidator(
        queryset=User.objects.all(), message="Username already exist !!")])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(
        queryset=User.objects.all(), message="Email already exist !!")])
    password = serializers.CharField(
        min_length=6, required=True, write_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "first_name", "username",
                  "email", "password", "isAdmin"]

    def get_isAdmin(self, obj):
        return obj.is_staff

class BlogSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = BlogPost
        fields = "__all__"

