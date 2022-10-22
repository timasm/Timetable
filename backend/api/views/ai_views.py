from django.shortcuts import render
from .ai import Timetable
import constraint as cs
from ..models import Employee
from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializer import EmployeeSerializer


#Employee = Employee.objects.all()
#print(Employee)

class AiView(APIView):
    
    def get(self, request):
        employees = Employee.objects.all()
        
        serializer = EmployeeSerializer(employees, many=True)


        timetable_generator = Timetable(cs.MinConflictsSolver())
        for item in serializer.data:
            timetable_generator.add_worker(name=item["firstname"]+" "+item["lastname"], working_hours=item["duration"], id=item["id"])
        for item in serializer.data:
            timetable_generator.constrain_working_hours(name=item["firstname"]+" "+item["lastname"])
        timetable_generator.generate_timetable(0.15)
        
        return Response(timetable_generator.timetable)

# Create your views here.
