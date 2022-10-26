from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from django.http import HttpResponse
from rest_framework import status
from datetime import date, datetime

from ..models import *
from ..serializer import ShiftScheduleSerializer, PutShiftScheduleSerializer


class ShiftScheduleView(APIView):

    #permission_classes = (IsAuthenticated,)

    def get(self, request):
        shift_schedules = Shiftschedule.objects.all()
        serializer = ShiftScheduleSerializer(shift_schedules, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ShiftScheduleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)


class SingleShiftScheduleView(APIView):

    #permission_classes = (IsAuthenticated,)

    def get_object(self, id):
        try:
            return Shiftschedule.objects.get(id=id)
        except Shiftschedule.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        shift_schedule = self.get_object(id)
        serializer = ShiftScheduleSerializer(shift_schedule)
        return Response(serializer.data)

    def put(self, request, id):
        shift_schedule = self.get_object(id)
        serializer = PutShiftScheduleSerializer(
            shift_schedule, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
