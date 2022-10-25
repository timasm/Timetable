from django.urls import path
from .views.ai_views import *


urlpatterns = [
    path('generate_timetable/', AiView.as_view()),
]