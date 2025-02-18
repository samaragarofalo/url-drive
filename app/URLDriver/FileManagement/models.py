import os.path

from django.db import models
from django.contrib.auth.models import User


def define_upload_path(instance, file_name):
    return os.path.join(instance.file_path, f'v{instance.version}_{file_name}')

class File(models.Model):
    file = models.TextField()
    file_name = models.CharField(max_length=150, db_index=True)
    file_path = models.CharField(max_length=300)
    version = models.PositiveIntegerField(default=0)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f'{self.file_name} - (v{self.version}) - {self.file_path}'


    class Meta:
        db_table = "file"
        verbose_name = "File"
        verbose_name_plural = "Files"
        unique_together = ('file_path', 'version')


# class FileManagement(models.Model):
#     file = models.ForeignKey(File, on_delete=models.SET_NULL, blank=True, null=True)


