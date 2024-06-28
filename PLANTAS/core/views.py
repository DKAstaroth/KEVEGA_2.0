from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.decorators import login_required
from .models import Cart, CartItem, Product

def index(request):
    return render(request, 'core/index.html')

@login_required
def adminn(request):
    return render(request, 'core/adminn.html')


def catalogo(request):
    return render(request, 'core/catalogo.html')


def contacto(request):
    return render(request, 'core/contacto.html')

def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        contrasena = request.POST.get('contrasena')

        try:
            user = User.objects.get(email=email)
            username = user.username
            user = authenticate(request, username=username, password=contrasena)
        except User.DoesNotExist:
            user = None

        if user is not None:
            auth_login(request, user)
            messages.success(request, '¡Inicio de sesión exitoso!')
            return redirect('index')  # Redirigir a la página principal después del inicio de sesión
        else:
            messages.error(request, 'Credenciales inválidas. Inténtalo de nuevo.')

    return render(request, 'core/login.html')

@login_required
def productos(request):
    return render(request, 'core/productos.html')


def pago(request):
    return render(request, 'core/pago.html')

@login_required
def usuarios(request):
    return render(request, 'core/usuarios.html')

def logout(request):
    auth_logout(request)
    messages.success(request, '¡Sesión cerrada correctamente!')
    return redirect('index')

def registrar_usuario(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        email = request.POST.get('email')
        usuario = request.POST.get('usuario')
        contrasena = request.POST.get('contrasena')

        nuevo_usuario = User.objects.create_user(username=usuario, email=email, password=contrasena)
        nuevo_usuario.first_name = nombre
        nuevo_usuario.save()

        messages.success(request, '¡Registro exitoso! Ahora puedes iniciar sesión.')
        return redirect('login')

    return render(request, 'core/login.html')




def add_to_cart(request, product_id):
    product = Product.objects.get(id=product_id)
    cart = request.user.cart
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += 1
        cart_item.save()
    return redirect('cart:view_cart')

def view_cart(request):
    cart = request.user.cart
    cart_items = cart.cartitem_set.all()
    total = sum(item.product.price * item.quantity for item in cart_items)
    return render(request, 'cart/cart.html', {'cart_items': cart_items, 'total': total})

def remove_from_cart(request, cart_item_id):
    cart_item = CartItem.objects.get(id=cart_item_id)
    cart_item.delete()
    return redirect('cart:view_cart')