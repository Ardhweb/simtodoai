from rest_framework.routers import DefaultRouter
from task.api.views import TaskViewSet  ,CategoryListAPIView,TagListAPIView,DailyContextListAPIView,DailyContextCreateAPIView
from django.urls import path

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')
urlpatterns = [
    path('categories/list/',CategoryListAPIView.as_view(), name="category-list"),
    path('tags/list/',TagListAPIView.as_view(), name="tag-list"),
    path('daily-context/', DailyContextListAPIView.as_view(),name="context-list"),   
    path('daily-context/create/', DailyContextCreateAPIView.as_view(),name="create-context"),


]

urlpatterns += router.urls
