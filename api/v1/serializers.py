from rest_framework import serializers
from .models import User

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
