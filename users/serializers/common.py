from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):

    # class attributes preventing serialization
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    class Meta:
        model = User
        # fields = ('id', 'username', 'email', 'password', 'password_confirmation', 'bio')
        fields = '__all__'
        extra_fields = ['password_confirmation']

    def validate(self, data):
        password = data.get('password')
        password_confirmation = data.pop('password_confirmation')
        if password != password_confirmation:
            raise serializers.ValidationError('Password do not match.')    
        return data

    def create(self, validated_data): 
        user = User.objects.create_user(**validated_data)
        return user
