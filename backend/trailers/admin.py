from django.contrib import admin

from .models import Trailer


@admin.register(Trailer)
class TrailerAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_year', 'genre', 'age_rating', 'created_at')
    search_fields = ('title', 'genre')
    list_filter = ('release_year', 'genre', 'age_rating')