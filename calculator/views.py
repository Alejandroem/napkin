from django.shortcuts import render
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated

def index(request):
    authentication_class = (JSONWebTokenAuthentication,) 
    permission_classes = (IsAuthenticated,)
    return render(request, 'calculator/index.html')