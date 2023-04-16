from django.contrib import admin

# Register your models here.
from .models import *

class BookAdmin(admin.ModelAdmin):
    list_display = ("BookId", "BookName", "Branch")

admin.site.register(Books, BookAdmin)