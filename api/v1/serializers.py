from rest_framework import serializers
from .models import User
from .models import Demo
from .models import Workout

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'password', 'user_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

        def create(self, validated_data):
            user = User.objects.create_user(**validated_data)
            return user

        def update(self, instance, validated_data):
            instance.email = validated_data.get('email', instance.email)
            instance.first_name = validated_data.get('first_name', instance.first_name)
            instance.last_name = validated_data.get('last_name', instance.last_name)
            instance.user_name = validated_data.get('user_name', instance.user_name)
            instance.password = validated_data.get('password', instance.password)
            instance.save()
            return instance

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class PostWorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'type', 'coords_start', 'coords_end', 'name', 'date', 'user_id']

class DemoSerializer(serializers.ModelSerializer):
    coords_start = serializers.SerializerMethodField()
    coords_end = serializers.SerializerMethodField()

    def get_coords_start(self, obj):
        return [obj.coords_start.x, obj.coords_start.y]

    def get_coords_end(self, obj):
        return [obj.coords_end.x, obj.coords_end.y]

    class Meta:
        model = Demo
        fields = ['id', 'type', 'coords_start', 'coords_end', 'name']

    def create(self, validated_data):
        demo_workout = Demo.objects.create(**validated_data)
        return demo_workout

    def update(self, instance, validated_data):
        instance.type = validated_data.get('type', instance.type)
        instance.coords_start = validated_data.get('coords_start', instance.coords_start)
        instance.coords_end = validated_data.get('coords_end', instance.coords_end)
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class WorkoutSerializer(serializers.ModelSerializer):
    coords_start = serializers.SerializerMethodField()
    coords_end = serializers.SerializerMethodField()

    def get_coords_start(self, obj):
        return [obj.coords_start.x, obj.coords_start.y]

    def get_coords_end(self, obj):
        return [obj.coords_end.x, obj.coords_end.y]

    class Meta:
        model = Workout
        fields = ['id', 'type', 'coords_start', 'coords_end', 'name', 'date', 'user_id']

    def create(self, validated_data):
        workout = Workout.objects.create(**validated_data)
        return workout

    def update(self, instance, validated_data):
        instance.type = validated_data.get('type', instance.type)
        instance.coords_start = validated_data.get('coords_start', instance.coords_start)
        instance.coords_end = validated_data.get('coords_end', instance.coords_end)
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
