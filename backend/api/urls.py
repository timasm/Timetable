from django.urls import path
from .views.ai_views import *
from .views.view_day import *


urlpatterns = [
    path('generate_timetable/', AiView.as_view()),

    path('day/', DaysView.as_view()),
    path('day/<str:day>/', SingleDayView.as_view())
]
