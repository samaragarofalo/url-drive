from django.urls import path
from Gateway.protocol.views import sign_up, login

urlpatterns = [
    path('signup/', sign_up),
    path('login/', login),
]
