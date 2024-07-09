from django import forms
from .models import Product
from django.contrib.auth.models import User

class AgregarCarritoForm(forms.Form):
    producto_id = forms.IntegerField(widget=forms.HiddenInput())
    cantidad = forms.IntegerField(min_value=1, max_value=100)

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'stock', 'image']


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'email','password']
        widgets = {
            'password': forms.PasswordInput(),
        }