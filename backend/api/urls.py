from django.urls import path
from .views.ai_views import *
from .views.view_day import *
from .views.view_shiftschedule import *


urlpatterns = [
    path('generate_timetable/', AiView.as_view()),

    path('day/', DaysView.as_view()),
    path('day/<str:day>/', SingleDayView.as_view()),

    path('shiftschedule/', ShiftScheduleView.as_view()),
    path('shiftschedule/<int:id>/', SingleShiftScheduleView.as_view()),

]
