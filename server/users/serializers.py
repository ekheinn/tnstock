from rest_framework import serializers
from .models import CustomUser, EmailConfirmationToken
from django.core.mail import send_mail
from django.conf import settings
from .models import UserProfile
import uuid
from rest_framework.authtoken.models import Token


class UserSerializerList(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'description','profile_picture']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_active=False  
        )

        token = str(uuid.uuid4())
        profile = UserProfile.objects.create(user=user, reset_token=token)
        self.send_confirmation_email(user, profile.reset_token)
        return user

    def send_confirmation_email(self, user, token):
        subject = 'Confirme seu e-mail'
        message = f'Olá {user.username},\n\nPor favor, clique no link abaixo para confirmar seu e-mail:\n\nhttp://localhost:5173/confirm-email/{token}/\n\nObrigado!'
        send_mail(subject, message, settings.EMAIL_HOST_USER, [user.email])