# Generated by Django 4.2.1 on 2023-06-02 11:04

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Demo',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=60)),
                ('coords_start', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('coords_end', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('name', models.CharField(max_length=60)),
                ('speed', models.PositiveIntegerField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.CharField(max_length=60)),
                ('first_name', models.CharField(max_length=60)),
                ('last_name', models.CharField(max_length=60)),
                ('password', models.CharField(max_length=60)),
                ('user_name', models.CharField(max_length=60)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Workout',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=60)),
                ('coords_start', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('coords_end', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('name', models.CharField(max_length=60)),
                ('speed', models.PositiveIntegerField()),
                ('date', models.DateField()),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='workouts', to='v1.user')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]