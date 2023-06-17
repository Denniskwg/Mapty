from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from v1.models import User, Demo, Workout
from v1.serializers import UserSerializer, DemoSerializer, WorkoutSerializer, LoginSerializer, PostWorkoutSerializer
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework import status
from django.contrib.gis.geos import Point
import json
import uuid

# Create your views here.
@csrf_exempt
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def demo_workouts(request, type):
    if request.method == 'GET':
        demo_workouts = Demo.objects.filter(type=type)
        serializer = DemoSerializer(demo_workouts, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def user_workouts(request, id):
    if request.method == 'GET':
        valid_id = uuid.UUID(id)
        workout = Workout.objects.filter(user_id=valid_id)
        serializer = WorkoutSerializer(workout, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def post_workout(request):
    if request.method == 'POST':
        try:
            json_data = request.body.decode('utf-8')
            data = json.loads(json_data)
            lat1 = data['coords_start'][0]
            lng1 = data['coords_start'][1]
            lat2 = data['coords_end'][0]
            lng2 = data['coords_end'][1]
            data['coords_start'] = Point(lat1, lng1)
            data['coords_end'] = Point(lat2, lng2)
            serializer = PostWorkoutSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=201)
            return JsonResponse(serializer.errors, status=400)
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON')

@csrf_exempt
def user_login(request):
    data = JSONParser().parse(request)
    serializer = LoginSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    username = serializer.validated_data['username']
    password = serializer.validated_data['password']
    try:
        user = User.objects.get(user_name=username, password=password)
        #user = authenticate(request, username=username, password=password)
        serializer = UserSerializer(user)
        return JsonResponse({'message': 'true', 'info': serializer.data})
    except User.DoesNotExist:
        return JsonResponse({'message': 'false'})

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            json_data = request.body.decode('utf-8')
            data = json.loads(json_data)
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'message': 'sucess'}, status=201)
            return JsonResponse(serializer.errors, status=400)
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON')
