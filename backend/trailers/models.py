from django.db import models

class Trailer(models.Model):
    title = models.CharField(max_length=255)
    video_file = models.FileField(upload_to='trailers/')
    preview_image = models.ImageField(upload_to='previews/')
    release_year = models.PositiveIntegerField()
    genre = models.CharField(max_length=100)
    age_rating = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.release_year})"
