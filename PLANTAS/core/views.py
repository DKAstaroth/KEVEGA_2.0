from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login

def index(request):
    return render(request, 'core/index.html')

def adminn(request):
    return render(request, 'core/adminn.html')

def catalogo(request):
    return render(request, 'core/catalogo.html')

def contacto(request):
    return render(request, 'core/contacto.html')

def login(request):
    if request.method == 'POST':
        username = request.POST.get('usuario')
        contrasena = request.POST.get('contrasena')

        user = authenticate(request, username=username, password=contrasena)

        if user is not None:
            auth_login(request, user)
            messages.success(request, '¡Inicio de sesión exitoso!')
            return redirect('core/login.html')  # Redirigir a la página principal después del inicio de sesión
        else:
            messages.error(request, 'Credenciales inválidas. Inténtalo de nuevo.')

    return render(request, 'core/login.html')

def productos(request):
    return render(request, 'core/productos.html')

def pago(request):
    return render(request, 'core/pago.html')

def usuarios(request):
    return render(request, 'core/usuarios.html')

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
