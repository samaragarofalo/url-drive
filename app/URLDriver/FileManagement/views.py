from django.http import HttpResponseNotFound
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated

from .models import File
from .serializers import FileSerializer


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = [isAuthenticated]

    def upload_file(self, serializer):
        file_path = serializer.validated_data['document_path']
        latest_version = File.objects.filter(file_path=file_path).order_by('-version').first()
        newest_version = latest_version.version + 1 if latest_version else 0

        serializer.save(created_by=self.request_user, version=newest_version)


    def download_file(self, request, **kwargs):
        file_path = kwargs.get('file_path')
        revision = request.GET.get('revision')

        if revision is not None:
            file = get_object_or_404(File, file_path=file_path, version=int(revision))
        else:
            file = File.objects.filter(file_path=file_path).order_by('-version').first()

            if not file:
                return HttpResponseNotFound('File not found')

        return FileResponse(file.file.open(), as_attachment=True)
