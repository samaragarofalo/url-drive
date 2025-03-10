from django.urls import path
from .protocol.views import upload, download, get_urls

urlpatterns = [
    path('upload/', upload),
    path('download/<path:file_path>', download),
    path('api/urls/', get_urls),
]
