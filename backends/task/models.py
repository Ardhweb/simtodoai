from django.db import models

# Create your models here.
from core.models import BaseModel

class Tag(models.Model):
    tag_name = models.CharField(max_length=20,blank=False, null=False, unique=True)
    usage_frequency = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.tag_name

class Category(models.Model):
    category_name = models.CharField(max_length=20, blank=False, null=False, unique=True)
    tag = models.ForeignKey(Tag, related_name='categories_tags', on_delete=models.SET_NULL, null=True)
    usage_frequency = models.PositiveIntegerField(default=0)

class Task(BaseModel):
    STATUS_CHOICES = [
        (0, 'Todo'),
        (1, 'Pending'),
        (2, 'Completed'),
        (3, 'In Progress'),
    ]
    title = models.CharField(max_length=50, blank=True, null=True, default="Untitld")
    description = models.TextField(blank=True, null=True, max_length=244)
    category = models.ForeignKey(Category , related_name="task_categories",on_delete=models.SET_NULL, null=True)
    priority_score = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=100, blank=False, null=False, choices=STATUS_CHOICES)
    deadline = models.DateField(blank=True, null=True)


class ContextEntry(BaseModel):
    SOURCE_TYPE_CHOICES = [
        ('whatsapp', 'WhatsApp'),
        ('email', 'Email'),
        ('notes', 'Notes'),
        ('youtube', 'Youtube'),
    ]
    content = models.TextField(blank=True, null=True)
    source_type = models.CharField(max_length=20, choices=SOURCE_TYPE_CHOICES)
    processed_insights = models.JSONField(blank=True, null=True)
    