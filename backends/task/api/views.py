from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from task.api.serializers import TagSerializer, CategorySerializer, TaskSerializer , ContextSerializer
from task.models import Task,Tag,Category,ContextEntry
from rest_framework import status
from rest_framework.permissions import AllowAny

class TagListAPIView(ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class CategoryListAPIView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TaskViewSet(viewsets.ModelViewSet):
    "This viewset handle all the operation related to  task in database  like GET,POST method for Task"
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    permission_classes = [AllowAny] 

    def get_queryset(self):
        return self.queryset
    
    def list(self,request):
        queryset = Task.objects.all()
        serializer = TaskSerializer(queryset, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save()
    
class DailyContextListAPIView(ListAPIView):
    queryset = ContextEntry.objects.all()
    serializer_class = ContextSerializer

class DailyContextCreateAPIView(APIView):
    def post(self, request):
        serializer = ContextSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)