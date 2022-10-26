from dataclasses import field
from rest_framework import serializers

from .models import *


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ["id", "firstname", "lastname", "duration", "preferences"]


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = ["day", "slots"]


class ShiftScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shiftschedule
        fields = "__all__"


class PutShiftScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shiftschedule
        fields = ["data"]
