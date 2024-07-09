from django.urls import path
from django.contrib.auth import views as auth_views
from .views import index, catalogo, comprar, eliminar_producto, editar_producto, actualizar_cantidad_carrito, eliminar_carrito, carrito, contacto, login, productos, usuarios, eliminar_usuario, editar_usuario, pago, registrar_usuario, logout, agregar_carrito, historial_usuario, historial_admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', index, name="index"),
    path('catalogo/', catalogo, name="catalogo"),
    path('contacto/', contacto, name="contacto"),
    path('login/', login, name="login"),
    path('productos/', productos, name="productos"),
    path('productos/editar/<int:pk>/', editar_producto, name='editar_producto'),
    path('productos/eliminar/<int:pk>/', eliminar_producto, name='eliminar_producto'),
    path('pago/', pago, name="pago"),
    path('usuarios/', usuarios, name="usuarios"),
    path('usuarios/editar/<int:pk>/', editar_usuario, name='editar_usuario'),
    path('usuarios/eliminar/<int:pk>/', eliminar_usuario, name='eliminar_usuario'),
    path('logout/', logout, name='logout'),  # URL para cerrar sesión
    path('registrar/', registrar_usuario, name="registrar_usuario"),
    path('agregar_carrito/', agregar_carrito, name='agregar_carrito'),
    path('carrito/', carrito, name='carrito'),
    path('eliminar_carrito/', eliminar_carrito, name='eliminar_carrito'),
    path('comprar/', comprar, name='comprar'),
    path('actualizar_cantidad_carrito/', actualizar_cantidad_carrito, name='actualizar_cantidad_carrito'),
    path('historial/', historial_usuario, name='historial'),
    path('pedidos/', historial_admin, name='pedidos')
]

if settings.DEBUG == True:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)