from django.shortcuts import render, redirect
from .models import Student
from .forms import StudentForm

def studentList(request):
    students = Student.objects.all()
    context = {'students': students}
    return render(request, 'Students/list.html', context)

def addStudent(request):
    if request.method == 'POST':
        form = StudentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('studentList')
    else:
        form = StudentForm()
    context = {'form': form}
    return render(request, 'Students/add.html', context)