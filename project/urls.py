"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import PageHome
    2. Add a URL to urlpatterns:  path('', PageHome.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/buildings/', include('buildings.urls')),
    path('api/roomTypes/', include('roomTypes.urls')),
    path('api/rooms/', include('rooms.urls')),
    path('api/ffes/', include('ffes.urls')),
    path('api/floorFinishes/', include('floorFinishes.urls')),
    path('api/wallFinishes/', include('wallFinishes.urls')),
    path('api/ceilings/', include('ceilings.urls')),
    path('api/resourcesBuildingRegs/', include('resourcesBuildingRegs.urls')),
    path('api/resourcesHBN/', include('resourcesHBN.urls')),
    path('api/auth/', include('users.urls')),
    re_path(r'^.*$', index) # <-- have this come last using re path.
]
