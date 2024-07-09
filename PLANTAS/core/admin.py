from django.contrib import admin
#from .models import xxxx
# Register your models here.

from core.models import Product, Venta

# Register your models here.
class admProduct(admin.ModelAdmin):
    list_display=["name","description","price","stock","image"]
    list_editable=["description","price","stock","image"]
    
    class Meta:
        model = Product

register = [Product]
classes = [admProduct]
for x in range(0, len(register), 1):
    admin.site.register(register[x], classes[x])



admin.site.register(Venta)