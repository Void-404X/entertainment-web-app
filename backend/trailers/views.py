from rest_framework import viewsets

from .models import Trailer
from .serializers import TrailerSerializer


class TrailerViewSet(viewsets.ModelViewSet):
    queryset = Trailer.objects.all()
    serializer_class = TrailerSerializer
