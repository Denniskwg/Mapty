from v1.models import Demo
from v1.serializers import DemoSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.contrib.gis.geos import Point


demo = Demo(type='cycling', coords_start=Point(x=-1.3982, y=36.8509), coords_end=Point(x=-1.3761, y=36.8617), name="Nairobi National Park")
demo.save()


demo = Demo(type='running', coords_start=Point(x=-1.2824, y=36.8089), coords_end=Point(x=-1.2870, y=36.8123), name="Uhuru Park")
demo.save()


demo = Demo(type='cycling', coords_start=Point(x=-1.2982, y=36.7589), coords_end=Point(x=-1.2971, y=36.7604), name="Ngong Road Forest Sanctuary")
demo.save()


demo = Demo(type='running', coords_start=Point(x=-1.2674, y=36.8112), coords_end=Point(x= -1.2697, y=36.8128), name="Arboretum Park")

