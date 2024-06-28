from django.urls import path
from django.contrib.auth import views as auth_views
from .views import index, adminn, catalogo, contacto, login, productos, usuarios, pago, registrar_usuario, logout
from . import views


app_name = 'cart'

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
    path('add/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('view/', views.view_cart, name='view_cart'),
    path('remove/<int:cart_item_id>/', views.remove_from_cart, name='remove_from_cart'),
]
# mycart/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cart/', include('cart.urls')),
    # otras URLs de tu proyecto
]

