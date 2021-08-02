from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated

def index(request):
    authentication_class = (JSONWebTokenAuthentication,) 
    permission_classes = (IsAuthenticated,)
    return render(request, 'calculator/index.html')

class CalculatorAPI(APIView): 
    def post(self, request):
        return JsonResponse("hola", safe=False)
