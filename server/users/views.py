from rest_framework import generics, permissions
from .serializers import UserSerializer, UserSerializerList
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import CustomUser, UserProfile
from django.utils import timezone
from django.contrib.auth import authenticate, login
from django.core.mail import send_mail
from django.conf import settings
import uuid
from rest_framework.authtoken.models import Token


class UserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    
class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializerList
    permission_classes = [IsAuthenticated]

class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]



class UserProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class ConfirmEmailView(APIView):
    def get(self, request, token):
        profile = get_object_or_404(UserProfile, reset_token=token)
        
        user = profile.user
        user.is_active = True
        user.save()
        
        profile.reset_token = None
        profile.save()
        
        return Response({'message': 'E-mail confirmado com sucesso!'}, status=status.HTTP_200_OK)
    
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = CustomUser.objects.filter(email=email).first()
        if not user:
            return Response({'error': 'Usuário não encontrado'}, status=status.HTTP_404_NOT_FOUND)

        if not user.is_active:
            return Response({'error': 'Conta não foi ativada, ou está desativada. Entre em contato com o suporte.'}, status=status.HTTP_403_FORBIDDEN)

        profile = user.userprofile

        if profile.is_locked:
            return Response({'error': 'Conta bloqueada. Redefina a senha para desbloquear.'}, status=status.HTTP_403_FORBIDDEN)

        user = authenticate(request, email=email, password=password)
        if user:
            profile.login_attempts = 0
            profile.save()
            login(request, user)

            token, created = Token.objects.get_or_create(user=user)

            return Response({
                'message': 'Login bem-sucedido',
                'token': token.key  
            }, status=status.HTTP_200_OK)
        else:
            profile.login_attempts += 1

            if profile.login_attempts >= 6:
                profile.is_locked = True
                profile.save()
                return Response({'error': 'Conta bloqueada. Redefina a senha para desbloquear.'}, status=status.HTTP_403_FORBIDDEN)

            profile.save()
            return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
        
class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = CustomUser.objects.filter(email=email).first()
        if not user:
            return Response({'error': 'E-mail não encontrado'}, status=status.HTTP_404_NOT_FOUND)

        token = str(uuid.uuid4())
        user.userprofile.reset_token = token
        user.userprofile.save()

        subject = 'Recuperação de Senha'
        message = f'Olá {user.username},\n\nPara redefinir sua senha, clique no link abaixo:\n\nhttp://localhost:5173/reset-password/{token}/\n\nObrigado!'
        send_mail(subject, message, settings.EMAIL_HOST_USER, [user.email])

        return Response({'message': 'E-mail de recuperação enviado'}, status=status.HTTP_200_OK)
    
class ResetPasswordView(APIView):
    def post(self, request, token):
        new_password = request.data.get('new_password')
        
        profile = UserProfile.objects.filter(reset_token=token).first()
        if not profile:
            return Response({'error': 'Token inválido'}, status=status.HTTP_404_NOT_FOUND)

        user = profile.user
        user.set_password(new_password)
        user.save()

        profile.is_locked = False
        profile.login_attempts = 0
        profile.reset_token = None
        profile.save()

        return Response({'message': 'Senha redefinida com sucesso. Sua conta foi desbloqueada.'}, status=status.HTTP_200_OK)