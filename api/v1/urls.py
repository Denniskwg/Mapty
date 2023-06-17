from django.urls import path
from v1 import views


urlpatterns = [
    path('v1/users/', views.user_list),
    path('v1/demo_workouts/<str:type>/', views.demo_workouts),
    path('v1/user_workouts/<str:id>/', views.user_workouts),
    path('v1/workouts/', views.post_workout),
    path('v1/login/', views.user_login),
    path('v1/signup/', views.signup),
]
