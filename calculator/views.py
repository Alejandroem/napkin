import json
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser


from calculator.business.calculate_from_gsheets import calculate_from_gsheets


def index(request):
    authentication_class = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    return render(request, 'calculator/index.html')


class CalculatorAPI(APIView):
    def post(self, request):
        body_data = json.loads(request.body)
        return JsonResponse(calculate_from_gsheets(body_data), safe=False)


class FileAPI(APIView):
    parser_classes = (MultiPartParser,)

    def put(self, request, format=None):
        word = request.data.get('word')
        excel = request.data.get('excel')
        return JsonResponse({
            "exel": excel.temporary_file_path(),
            "word": word.temporary_file_path(),
        }, safe=False)
