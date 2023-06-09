# Generated by Django 4.1.7 on 2023-04-06 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0002_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='Branch',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='DOB',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='Email',
            field=models.EmailField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='Gender',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='LastName',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='Mobile',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='Year',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
