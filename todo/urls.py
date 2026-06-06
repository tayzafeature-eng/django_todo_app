from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    #(ဘယ် task_id လဲဆိုတာ ကိန်းကဏန်အနေနဲ့ ယူမယ်လို့ သတ်မှတ်တာပါ)
    path('delete/<int:task_id>/', views.delete_task, name='delete_task'),
    path('complete/<int:task_id>/', views.complete_task, name='complete_task'),
]