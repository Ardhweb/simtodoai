from rest_framework.routers import DefaultRouter
from task.api.views import TaskViewSet  ,CategoryListAPIView,TagListAPIView
from django.urls import path

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')
urlpatterns = [
    path('categories/list/',CategoryListAPIView.as_view(), name="category-list"),
    path('tags/list/',TagListAPIView.as_view(), name="tag-list"),
]

urlpatterns += router.urls
