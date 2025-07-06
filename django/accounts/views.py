from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.core.paginator import Paginator
from .forms import SignUpForm, UserUpdateForm

User = get_user_model()

class CustomLoginView(LoginView):
    template_name = 'accounts/login.html'
    redirect_authenticated_user = True

def signup_view(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, 'Account created successfully!')
            return redirect('accounts:profile')
    else:
        form = SignUpForm()
    return render(request, 'accounts/register.html', {'form': form})

@login_required
def profile_view(request):
    return render(request, 'accounts/profile.html', {'user': request.user})

@login_required
def edit_profile_view(request):
    if request.method == 'POST':
        form = UserUpdateForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('accounts:profile')
    else:
        form = UserUpdateForm(instance=request.user)
    return render(request, 'accounts/edit_profile.html', {'form': form})

@login_required
def user_list_view(request):
    users = User.objects.all().order_by('username')
    paginator = Paginator(users, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'accounts/user_list.html', {'page_obj': page_obj})

@login_required
def user_detail_view(request, user_id):
    user = get_object_or_404(User, id=user_id)
    return render(request, 'accounts/user_detail.html', {'profile_user': user})

@login_required
def delete_user_view(request, user_id):
    user = get_object_or_404(User, id=user_id)
    if request.user.is_superuser or request.user == user:
        if request.method == 'POST':
            if user == request.user:
                logout(request)
            user.delete()
            messages.success(request, 'User deleted successfully!')
            return redirect('accounts:user_list')
        return render(request, 'accounts/delete_user.html', {'profile_user': user})
    else:
        messages.error(request, 'You do not have permission to delete this user.')
        return redirect('accounts:user_list')

def signout_view(request):
    logout(request)
    messages.success(request, 'You have been logged out successfully!')
    return redirect('accounts:login')