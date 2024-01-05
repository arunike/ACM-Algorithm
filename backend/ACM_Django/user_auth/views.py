from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


def login(request):
    return redirect("social:begin", "github")



@login_required
def home(request):
    return render(request, 'home.html')

