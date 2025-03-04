from rest_framework.decorators import api_view
from rest_framework.response import Response
from FileManagement.application.usecases import save_file, get_file
from django.http import FileResponse, Http404
import traceback

from FileManagement.domain.models import File


@api_view(['POST'])
def upload(request):
    try:
        uploaded_file = request.FILES.get('file')
        response = dict(request.POST)
        file_response = {k: v[0] for k, v in response.items()}

        if not file_response['url'] or not uploaded_file:
            return Response({'error:' 'URL and file are both required.'})
        
        file = save_file(
            uploaded_file,
            uploaded_file.name,
            file_response['url'],
            request.user
        )
        
        return Response({
            'message': 'File saved successfully!'
        })

    except Exception as e:
        print(e)
        print(traceback.format_exc())


@api_view(['GET'])
def download(request, file_path):
    try:
        file = get_file(
            file_path,
            request.GET.get('version') if 'version' in request.GET else None,
            request.user
        )

        if not file:
            raise Http404('File not found.')
        
        return FileResponse(file.file_attachment)
    
    except Exception as e:
        print(e)
        print(traceback.format_exc())
