from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.admin.views.decorators import staff_member_required
from django.views.decorators.http import require_POST
from core.models import Product, Carrito, CarritoProducto, Venta, DetalleVenta
from .forms import AgregarCarritoForm, ProductForm

def index(request):
    return render(request, 'core/index.html')

def catalogo(request):
    data = Product.objects.all()
    context={
        "productos": data
    }
    return render(request, 'core/catalogo.html',context)


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

@login_required(login_url="/login")
def productos(request):
    if request.user.is_authenticated and request.user.is_staff:
        if request.method == 'POST':
            data = request.POST.dict()
            producto = Product(name=data["nom"], description=data["desc"], price=data["pre"], stock=data["stock"], image=request.FILES.get("img"))
            producto.save()
            return redirect(to="productos")
        data = Product.objects.all()  # Cambiado de values() a all()
        context = {"xd": data}
        return render(request, 'core/productos.html', context)
    return redirect('index')

@login_required(login_url="/login")
def editar_producto(request, pk):
    producto = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=producto)
        if form.is_valid():
            form.save()
            return redirect('productos')
    else:
        form = ProductForm(instance=producto)
    return render(request, 'core/editar_producto.html', {'form': form, 'producto': producto})

@login_required(login_url="/login")
def eliminar_producto(request, pk):
    producto = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        producto.delete()
        return redirect('productos')
    return render(request, 'core/eliminar_producto.html', {'producto': producto})

def pago(request):
    return render(request, 'core/pago.html')

@login_required(login_url="/login")
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

        carrito = Carrito(user=nuevo_usuario)
        carrito.save()

        messages.success(request, '¡Registro exitoso! Ahora puedes iniciar sesión.')
        return redirect('login')

    return render(request, 'core/login.html')

@login_required(login_url='/login')
def carrito(request):
    carrito, creado = Carrito.objects.get_or_create(user=request.user)
    productos_en_carrito = CarritoProducto.objects.filter(carrito=carrito)
    return render(request, 'core/carrito.html', {'productos_en_carrito': productos_en_carrito})

@login_required(login_url='/login')
@require_POST
def agregar_carrito(request):
    form = AgregarCarritoForm(request.POST)
    if form.is_valid():
        producto_id = form.cleaned_data['producto_id']
        cantidad = form.cleaned_data['cantidad']
        producto = get_object_or_404(Product, id=producto_id)

        carrito, creado = Carrito.objects.get_or_create(user=request.user)
        carrito_producto, creado = CarritoProducto.objects.get_or_create(carrito=carrito, producto=producto)

        if creado:
            carrito_producto.cantidad = cantidad
        else:
            carrito_producto.cantidad += cantidad
        
        carrito_producto.save()
        return redirect('catalogo')
    
    return redirect('catalogo')

@require_POST
@login_required(login_url='/login')
def eliminar_carrito(request):
    producto_id = request.POST.get('producto_id')
    producto = get_object_or_404(Product, id=producto_id)
    carrito = get_object_or_404(Carrito, user=request.user)
    carrito_producto = get_object_or_404(CarritoProducto, carrito=carrito, producto=producto)
    carrito_producto.delete()
    return redirect('carrito')

@login_required(login_url='/login')
@require_POST
def comprar(request):
    carrito, _ = Carrito.objects.get_or_create(user=request.user)
    productos_en_carrito = CarritoProducto.objects.filter(carrito=carrito)
    venta_items = []

    # Verificar stock
    for item in productos_en_carrito:
        if item.producto.stock < item.cantidad:
            messages.error(request, f'No hay suficiente stock para {item.producto.name}')
            return redirect('carrito')

    # Crear venta y actualizar stock
    venta = Venta(user=request.user, ordered=True)
    venta.save()

    for item in productos_en_carrito:
        detalle = DetalleVenta(producto=item.producto, cantidad=item.cantidad)
        detalle.save()
        venta.items.add(detalle)
        
        # Actualizar stock
        item.producto.stock -= item.cantidad
        item.producto.save()
        
        # Eliminar item del carrito
        item.delete()

    venta.save()
    messages.success(request, 'Compra realizada con éxito')
    return redirect('catalogo')

@login_required(login_url='/login')
@require_POST
def actualizar_cantidad_carrito(request):
    producto_id = request.POST.get('producto_id')
    nueva_cantidad = int(request.POST.get('cantidad'))
    producto = get_object_or_404(Product, id=producto_id)
    carrito = get_object_or_404(Carrito, user=request.user)
    carrito_producto = get_object_or_404(CarritoProducto, carrito=carrito, producto=producto)

    if nueva_cantidad > producto.stock:
        messages.error(request, f'No hay suficiente stock para {producto.name}')
        return redirect('carrito')

    carrito_producto.cantidad = nueva_cantidad
    carrito_producto.save()
    messages.success(request, f'Cantidad de {producto.name} actualizada a {nueva_cantidad}')
    return redirect('carrito')