from django.contrib import admin
from django.urls import path, include, re_path

from library import views

from rest_framework import routers

# create a router object
router = routers.DefaultRouter()

# # register the router
# # router.register(r'tasks',views.BookView, 'task')

# urlpatterns = [
# 	path('admin/', admin.site.urls),
   
# 	# add another path to the url patterns
# 	# when you visit the localhost:8000/api
# 	# you should be routed to the django Rest framework
# 	path('api/', include(router.urls)),
#     path('', include('library.urls')),
# ]

from django.contrib import admin
from django.urls import path, include
from library import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('library.urls'))
    
    
]
