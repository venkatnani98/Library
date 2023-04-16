from django.urls import path, re_path
from .views import *
from . import views

urlpatterns = [
    re_path(r'^api/register/$', views.register),
    re_path(r'^api/login/$', views.login),
    re_path(r'^api/login/([0-9]+)$', views.get_user),
    re_path(r'^api/modify/([0-9]+)$', views.modify_user),
    re_path(r'^api/library/$', views.book_list),
    re_path(r'^api/library/([A-Z0-9]+)$', views.book_modify),
    re_path(r'^api/library/search/([A-Za-z0-9]+)$', views.search_book),

    re_path(r'^api/student/$', views.student_list),
    re_path(r'^api/student/([0-9]+-[A-Z]-[0-9]+)$', views.student_modify),

    re_path(r'^api/rental/$', views.rentals),
    re_path(r'^api/rental/id/([0-9]+)$', views.rental_modify),
    re_path(r'^api/rental/fetch/([0-9]+-[A-Z]-[0-9]+)$', views.due_list),

    # re_path(r'^api/test/$', views.StudentView.as_view()),
]
