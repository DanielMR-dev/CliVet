from django.urls import path
from .views import GatewayView

urlpatterns = [
    path('redirect/', GatewayView.as_view(), name='redirections'),
]
