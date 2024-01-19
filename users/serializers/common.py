from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
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
    

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        attrs = super().validate(attrs)
        return {
            **attrs,
            "id":self.user.id,
            "username": self.user.username,
            "email": self.user.email,
            "first_name": self.user.last_name,
            "last_name": self.user.first_name,
            "img":self.user.img,
            "bio":self.user.bio,
            "permissions": self.user.user_permissions.values_list("codename", flat=True),
            "groups": self.user.groups.values_list("name", flat=True),
        }