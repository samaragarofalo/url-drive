from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from Gateway.application.usecases import create_user
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
import traceback


@api_view(['POST'])
def sign_up(request):
    try:
        response = request.data

        print(response.get('username'))

        if User.objects.filter(
            username=response.get('username')
        ).exists():
            return Response(
                {
                    'error': 'User already exists.'
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        user = create_user(
            response.get('username'),
            response.get('email'), 
            response.get('password')
        )

        return Response(
            {
                "message": 'Account created successfully!', 
                "user_id": user.id
            },
            status=status.HTTP_201_CREATED
        )
    
    except Exception as e:
        print(e)
        print(traceback.format_exc())
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def login(request):
    try:
        response = request.data

        try:
            user = User.objects.get(
                username=response.get('username'), 
            )

        except User.DoesNotExist:
            return Response (
                {
                    'error': "Invalid credentials."
                }, 
                status=status.HTTP_401_UNAUTHORIZED
            )

        if user.check_password(response.get('password')):
            refresh = RefreshToken.for_user(user)
            return Response({'refresh': str(refresh), 'access': str(refresh.access_token)})
    
        return Response({'error': 'Invalid credentials.'}, status=401)
    
    except Exception as e:
        print(e)
        print(traceback.format_exc())
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)