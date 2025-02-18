from django.urls import path
from rest_framework.urls import urlpatterns

from .views import FileViewSet

urlpatterns = [
    path('files/', FileViewSet.as_view({'post': 'upload'}), name='file-upload'),
    path('files/<path:file_path>', FileViewSet.as_view({'get': 'download'}), name='file-download'),
]