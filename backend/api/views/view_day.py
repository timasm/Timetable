from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from django.http import HttpResponse
from rest_framework import status
from datetime import date, datetime

from ..models import *
from ..serializer import DaySerializer


class DaysView(APIView):

    #permission_classes = (IsAuthenticated,)

    def get(self, request):
        dayItem = Day.objects.all()
        serializer = DaySerializer(dayItem, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DaySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)


class SingleDayView(APIView):

    #permission_classes = (IsAuthenticated,)

    def get_object(self, day):
        try:
            return Day.objects.get(day=day)
        except Day.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, day):
        dayItem = self.get_object(day)
        serializer = DaySerializer(dayItem)
        return Response(serializer.data)
