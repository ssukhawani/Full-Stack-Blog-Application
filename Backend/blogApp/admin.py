from django.contrib import admin
from .models import BlogPost

# Register your models here.
class BlogAdmin(admin.ModelAdmin):
    exclude = ('slug',)
    list_display = ['id','blogIdentifier','category','post_date',"author",'likes']
    ordering = ['id']
admin.site.register(BlogPost,BlogAdmin)
