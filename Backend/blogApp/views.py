from rest_framework.decorators import api_view, authentication_classes, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework import serializers, status
from django.contrib.auth.models import User
from .serializers import UserSerializers, BlogSerializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import BlogPost
from rest_framework.parsers import MultiPartParser, FormParser



@api_view(["GET"])
@permission_classes([IsAdminUser])
def getAllUsers(request):
    users = User.objects.all()
    serializer = UserSerializers(users, many=True)
    return Response(data=serializer.data)


@api_view(["POST"])
def loginUser(request):
    try:
        data = request.data
        username = data["username"]
        email = data["email"]
        password = data["password"]
        userData = User.objects.get(username=username, email=email)

        if userData.check_password(password):
            serializer = UserSerializers(userData, many=False)
            refresh = RefreshToken.for_user(userData)

            return Response(data={"token": str(refresh.access_token), "user": serializer.data}, status=status.HTTP_200_OK)
        else:
            message = {'detail': "Wrong password Dude !!"}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)
    except:
        message = {"detail": "Dude put the right credentials !!"}
        return Response(message, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["POST"])
def registerUser(request):
    password = request.data["password"]
    serializer = UserSerializers(data={**request.data})
    if serializer.is_valid():
        user = User.objects.create(**request.data)
        user.set_password(password)
        user.save()
        # serializer.save()
        refresh = RefreshToken.for_user(user)
        serializer2 = UserSerializers(user)
        return Response(data={"token": str(refresh.access_token), "user": serializer2.data}, status=status.HTTP_200_OK)
    else:
        return Response(data=serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getAllblogs(request):
    blogs = BlogPost.objects.all()
    serializer = BlogSerializers(blogs, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getLogedInblogs(request):
    blogs = BlogPost.objects.filter(author=request.user.id)
    serializer = BlogSerializers(blogs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def createBlog(request):
    serializer = BlogSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=401)
    return Response(serializer.data, status=201)


@api_view(['GET', "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def fetchOneBlog(request, pk):
    if request.method == "GET":
        blog = BlogPost.objects.get(id=pk)
        serializer = BlogSerializers(blog)
        return Response({**serializer.data, "author":str(blog.author)}, status=status.HTTP_200_OK)

    elif request.method == "PUT":
        try:
            blog = BlogPost.objects.get(author=request.user.id, id=pk)
            serializer = BlogSerializers(data=request.data, instance=blog)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except:
            message = {
                "detail": "Sorry dude you can't update someone else blog !!"}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)


    elif request.method == "DELETE":
        try:
            blog = BlogPost.objects.get(author=request.user.id, id=pk)
            blog.delete()
            message = {"detail": "Blog deleted Sucessfully!!"}
            return Response(data=message, status=status.HTTP_204_NO_CONTENT)
        except:
            message = {"detail": "Sorry dude you can't delete someone else blog !!"}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)

               
