from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import TrailerViewSet

router = DefaultRouter()
router.register(r'trailers', TrailerViewSet)

urlpatterns = [
    path('', include(router.urls)),  # <-- вот так подключаем роутер
]
