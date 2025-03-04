from django.urls import path
from .protocol.views import upload, download

urlpatterns = [
    path('upload/', upload),
    path('download/<path:file_path>/', download),
]
