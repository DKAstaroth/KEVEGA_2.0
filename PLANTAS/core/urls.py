from django.urls import path
from .views import index,adminn,catalogo,contacto,login, productos, usuarios, pago

urlpatterns = [
    path('', index, name="index"),
    path('adminn', adminn, name="adminn"),
    path('catalogo', catalogo, name="catalogo"),
    path('contacto', contacto, name="contacto"),
    path('login', login, name="login"),
    path('productos', productos, name="productos"),
    path('pago', pago, name="pago"),
    path('usuarios', usuarios, name="usuarios"),

    
]
