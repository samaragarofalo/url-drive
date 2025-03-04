from django.contrib.auth.models import User
import traceback


def create_user(
        username: str, 
        email: str, 
        password: str):
    
    try:

        new_user = User.objects.create_user(
            username=username, 
            email=email, 
            password=password)
        
    except Exception as e:
        print(e)
        print(traceback.format_exc())

    return new_user
