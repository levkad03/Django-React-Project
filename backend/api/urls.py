from django.urls import path, include
from .views import ProjectViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('project', ProjectViewSet, basename='project')

urlpatterns = router.urls
