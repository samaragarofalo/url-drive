from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from FileManagement.application.usecases import save_file, get_file, save_or_get_url, get_all_urls
from django.http import FileResponse, Http404, JsonResponse
import traceback
from io import BytesIO


@permission_classes([IsAuthenticated])
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
            response.get('url') if str(response.get('url')).endswith('/') else response.get('url') + '/',
            request.user
        )
        
        return Response({
            'message': 'File saved successfully!'
        })

    except Exception as e:
        print(e)
        print(traceback.format_exc())


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def download(request, file_path):
    try:
        file_path_str = file_path.split('/')
        url = '/'.join(file_path_str[:-1]) + '/'
        # file_name = file_path_str[-1]

        if len(file_path_str) < 2:
            return Response({'error': 'Invalid file path.'}, status=status.HTTP_400_BAD_REQUEST)
        
        file = get_file(
            save_or_get_url(url, request.user),
            int(request.GET.get('version')) if 'version' in request.GET else None,
            request.user
        )

        if not file:
            raise Http404('File not found.')
        
        file_data = bytes(file.file_attachment)
        file_content = BytesIO(file_data)

        return FileResponse(file_content, as_attachment=True, filename=file.file_name)
        
    except Http404 as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        print(e)
        print(traceback.format_exc())
        return Response({'error': 'Error while downloading file.'}, status=500)
    

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_urls(request):
    try:
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'User not authenticated'}, status=401)
        
        urls = get_all_urls(request.user)

        return JsonResponse(urls, safe=False)
    except Exception as e:
        print(e)
        print(traceback.format_exc())
