from django.urls import path
from django.contrib.auth import views as auth_views
from .views import index, adminn, catalogo, contacto, login, productos, usuarios, pago, registrar_usuario, logout

urlpatterns = [
    path('', index, name="index"),
    path('adminn/', adminn, name="adminn"),
    path('catalogo/', catalogo, name="catalogo"),
    path('contacto/', contacto, name="contacto"),
    path('login/', login, name="login"),
    path('productos/', productos, name="productos"),
    path('pago/', pago, name="pago"),
    path('usuarios/', usuarios, name="usuarios"),
    path('logout/', logout, name='logout'),  # URL para cerrar sesión
    path('registrar/', registrar_usuario, name="registrar_usuario"),
]