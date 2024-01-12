from rest_framework.generics import CreateAPIView
from .serializers.common import RegistrationSerializer#, LoginSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your views here.
class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer

# class LoginView(TokenObtainPairView):
#     queryset = User.objects.all()
#     serializer_class = LoginSerializer