from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.db.models import Q 

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

def updateStudent(request, student_id):
    student = get_object_or_404(Student, pk=student_id)

    if request.method == 'POST':
        form = StudentForm(request.POST, instance=student)
        if form.is_valid():
            form.save()
            return redirect('studentList')  
    else:
        form = StudentForm(instance=student)  

    context = {'form': form, 'student': student}
    return render(request, 'Students/add.html', context)


def deleteStudent(request, student_id):
    if request.method == 'DELETE':
        student = get_object_or_404(Student, pk=student_id)
        student.delete()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'message': 'Method not allowed'})
    
def studentList(request):
    students = Student.objects.all()


    name = request.GET.get('name')
    gender = request.GET.get('gender')
    course = request.GET.get('course')
    min_age = request.GET.get('minAge')
    max_age = request.GET.get('maxAge')


    if name:
        name_parts = name.split()
        name_query = Q()
        for part in name_parts:
            name_query |= Q(firstName__icontains=part) | Q(lastName__icontains=part)
        
        students = students.filter(name_query)
    if gender:
        students = students.filter(gender=gender)
    if course:
        students = students.filter(course=course)
    if min_age:
        students = students.filter(age__gte=min_age)
    if max_age:
        students = students.filter(age__lte=max_age)

    context = {'students': students}
    return render(request, 'Students/list.html', context)
