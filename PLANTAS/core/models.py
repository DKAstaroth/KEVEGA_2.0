from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)  # Debes considerar el uso seguro de contraseñas

    def __str__(self):
        return self.username


