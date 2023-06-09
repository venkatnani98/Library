# Generated by Django 4.1.7 on 2023-04-06 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('PIN', models.CharField(max_length=255, unique=True)),
                ('first_name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('password', models.TextField()),
                ('aToken', models.TextField()),
                ('rToken', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
