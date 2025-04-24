from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import unlogged_services, logged_services

class GatewayView(APIView):
    def post(self, request):
        service = request.data.get('servicio')
        data = request.data.get('datos')
        if hasattr(unlogged_services, service):
            func_service = getattr(unlogged_services, service)

            try:
                result = func_service(data)
                return Response(result)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            if "access_token" in data:
                if not hasattr(logged_services, service):
                    return Response({"error": "Servicio no encontrado"}, status=status.HTTP_400_BAD_REQUEST)

                func_service = getattr(logged_services, service)

                try:
                    result = func_service(data)
                    return Response(result)
                except Exception as e:
                    return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({
                    "error" : "Falta autenticación del usuario",
                    "status" : 401              
                    })
