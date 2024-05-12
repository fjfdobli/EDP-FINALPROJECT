from django.urls import path
from . import views

urlpatterns = [
    path('', views.studentList, name='studentList'),
    path('add/', views.addStudent, name='addStudent'),
    path('delete/<int:student_id>/', views.deleteStudent, name='deleteStudent'),
    path('edit/<int:student_id>/', views.updateStudent, name='updateStudent'),
]
