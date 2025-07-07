from rest_framework import serializers
from task.models import Task,Tag, Category,ContextEntry

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class ContextSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContextEntry
        fields = "__all__"