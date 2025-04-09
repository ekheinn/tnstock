from django.urls import path
from .views import UserCreateView, UserListView, UserRetrieveUpdateDestroyView,UserProfileDetail, ConfirmEmailView, LoginView, ForgotPasswordView, ResetPasswordView

urlpatterns = [
    path('users/', UserCreateView.as_view(), name='user-list-create'),
    path('users-list/', UserListView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-retrieve-update-destroy'),
    path('users/profile/', UserProfileDetail.as_view(), name='user-profile'),
    path('confirm-email/<uuid:token>/', ConfirmEmailView.as_view(), name='confirm-email'),
    path('login/', LoginView.as_view(), name='login'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/<str:token>/', ResetPasswordView.as_view(), name='reset-password'),
]