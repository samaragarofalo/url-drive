from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from FileManagement.application.usecases import save_file, get_file, save_or_get_url, get_all_urls
from django.http import FileResponse, Http404, JsonResponse
import traceback


@api_view(['POST'])
def upload(request):
    try:
        uploaded_file = request.FILES.get('file')
        response = request.data

        if not response.get('url') or not uploaded_file:
            return Response(
                {
                    'error:' 'URL and file are both required.'
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        file = save_file(
            uploaded_file.read(),
            uploaded_file.name,
            response.get('url'),
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
        file_name = file_path.rsplit('/', 1)[-1]
        url = file_path.rsplit('/', 1)[0] + '/'
  
        file = get_file(
            save_or_get_url(url, request.user),
            int(request.GET.get('version')) if 'version' in request.GET else None,
            request.user
        )

        if not file:
            raise Http404('File not found.')
        
        return FileResponse(file.file_attachment)
    
    except Exception as e:
        print(e)
        print(traceback.format_exc())


@api_view(['GET'])
def get_urls(request):
    try:
        urls = get_all_urls(request.user)

        return JsonResponse(urls, safe=False)
    except Exception as e:
        print(e)
        print(traceback.format_exc())
