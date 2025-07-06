from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from task.api.serializers import TagSerializer, CategorySerializer, TaskSerializer
from task.models import Task,Tag,Category
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
    
# class DailyContextListAPIView(ListAPIView):
#     queryset = DailyContextEntry.objects.all()
#     serializer_class = DailyContextEntrySerializer