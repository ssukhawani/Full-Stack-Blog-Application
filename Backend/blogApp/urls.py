from django.urls import path
from .import views

urlpatterns = [
    path("users", views.getAllUsers, name="get-all-users"),
    path("login", views.loginUser, name="login"),
    path("register", views.registerUser, name="register"),
    path("getallblogs", views.getAllblogs, name="get-all-blogs"),
    path("getlogedinblogs", views.getLogedInblogs, name="get-all-blogs"),
    path("getoneblog/<int:pk>", views.fetchOneBlog, name="get-one-blogs"),
    path("createBlog", views.createBlog, name="create-blog")
]
