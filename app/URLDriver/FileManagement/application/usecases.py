from FileManagement.domain.models import File, UrlManagement
from django.shortcuts import get_object_or_404
import traceback

def save_file(
        file_attachment, 
        file_name, 
        file_path, 
        created_by
    ):
    try:
        url = save_or_get_url(file_path, created_by)
        
        latest_file = get_latest_file(url, created_by)

        new_file = File.objects.create(
            file_attachment=file_attachment,
            file_name=file_name,
            file_path=url,
            created_by=created_by,
            version=(int(latest_file.version) + 1) if latest_file else 0
        )

        return new_file
    
    except Exception as e:
        print(e)
        print(traceback.format_exc())


def get_latest_file(
        file_path,
        created_by
):
    try:
        return File.objects.filter(
            file_path=file_path, 
            created_by=created_by
        ).order_by('-version').first()
    
    except Exception as e:
        print(e)
        print(traceback.format_exc())


def save_or_get_url(
        file_path,
        created_by
    ):
    try:
        url = UrlManagement.objects.filter(
            url_path=file_path, 
            created_by=created_by
        )

        if url:
            return url.first()
        
        return UrlManagement.objects.create(
            url_path=file_path,
            created_by=created_by
        )
    
    except Exception as e:
        print(e)
        print(traceback.format_exc())


def get_file(file_path, version, user):
    try:
        if version:
            return File.objects.filter(
                file_path=file_path, 
                version=version,
                created_by=user
            ).first()
        
        return get_latest_file(file_path, user)

    except Exception as e:
        print(e)
        print(traceback.format_exc())


def get_all_urls(created_by):
    try:
        return list(
            UrlManagement.objects.filter(
                created_by=created_by
            ).values()
        )

    except Exception as e:
        print(e)
        print(traceback.format_exc())