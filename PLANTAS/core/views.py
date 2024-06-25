from django.shortcuts import render, redirect
#from .models import Figura
# Create your views here.

def index(request):
    return render(request, 'core/index.html')


def adminn(request):
    return render(request, 'core/adminn.html')


def catalogo(request):
    return render(request, 'core/catalogo.html')

def contacto(request):
    return render(request, 'core/contacto.html')

def login(request):
    return render(request, 'core/login.html')

def pago(request):
    return render(request, 'core/pago.html')

def productos(request):
    return render(request, 'core/productos.html')

def usuarios(request):
    return render(request, 'core/usuarios.html')


