from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include

from calculator import views as calculator_views

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token


urlpatterns = [
    path('admin/', admin.site.urls),
    path('calculator', calculator_views.index),
    path('api-auth/', include('rest_framework.urls')),
    url(r'^auth/obtain_token', obtain_jwt_token),
    url(r'^auth/refresh_token', refresh_jwt_token),

]
