from django.db import models
from django.contrib.auth.models import User

    
class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.IntegerField()
    stock = models.IntegerField(default=0)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    # Otros campos opcionales que podrías añadir
    # Ejemplo: category, created_at, updated_at, etc.

    def __str__(self):
        return self.name

class DetalleVenta(models.Model):
    producto = models.ForeignKey(Product, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()

    def subtotal(self):
        return self.producto.price * self.cantidad

    def __str__(self):
        return f'{self.cantidad} x {self.producto.name}'


class Venta(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    items = models.ManyToManyField(DetalleVenta)
    ordered_date = models.DateTimeField(auto_now_add=True)
    ordered = models.BooleanField(default=False)
    estado=models.TextField(default='Por procesar')

    def __str__(self):
        return f'Order {self.id}'

    def total_price(self):
        return sum(item.subtotal() for item in self.items.all())

class Carrito(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    productos = models.ManyToManyField(Product, through='CarritoProducto')


    def __str__(self):
        return f'Carrito de {self.user}'
    
    def total(self):
        return sum(item.producto.price for item in self.items.all())
    
class CarritoProducto(models.Model):
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE)
    producto = models.ForeignKey(Product, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('carrito', 'producto')