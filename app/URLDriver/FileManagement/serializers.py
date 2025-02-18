from PycharmProjects.PythonProject.main import request_search
from rest_framework import serializers
from .models import File

class FileSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = File
        fields = [
            'id',
            'file_name',
            'file_path',
            'version',
            'created_by',
            'created_at',
            'file'
        ]


    def get_file_url(self, x):
        request = self.context.get('request')

        return request.build_absolute_url(f'/{x.file_path}')
