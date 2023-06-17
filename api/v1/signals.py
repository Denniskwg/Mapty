from django.db.models import Count
from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Workout

@receiver(pre_save, sender=Workout)
def delete_duplicates(sender, instance, **kwargs):
    # Define the fields for duplicate detection
    duplicate_fields = ['name', 'coords_end']

    # Check if the instance is being created or updated
    if instance.pk is None:
        # New instance, check for duplicates
        duplicate_records = Workout.objects.values(*duplicate_fields).annotate(count=Count('id')).filter(count__gt=1)
        duplicate_records = Workout.objects.filter(**{f'{field}__in': values for field, values in duplicate_records.values(*duplicate_fields).items()})
        duplicate_records.delete()
    else:
        # Existing instance, exclude self from duplicate check
        duplicate_records = Workout.objects.values(*duplicate_fields).annotate(count=Count('id')).filter(count__gt=1)
        duplicate_records = Workout.objects.filter(**{f'{field}__in': values for field, values in duplicate_records.values(*duplicate_fields).items()}).exclude(pk=instance.pk)
        duplicate_records.delete()

