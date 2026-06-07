from django.shortcuts import render, redirect, get_object_or_404 #redirect ကိုပါ import ထည့်ရမယ်
from .models import Task, Category # အပေါ်ဆုံးမှာ task model ကို အရင် import လုပ်ပေးရပါမယ်


def home(request):
    # 1. User က website ကနေ Submit နှိပ်ပြီး data အသစ် ပို့လိုက်ရင်
    if request.method == "POST":
        text_form_website = request.POST.get('task_text')
        category_id_from_website = request.POST.get('task_category') # push ID from HTML

        if text_form_website:
            # Safe Logic: ID ရှိရင် database ထဲမှာ ရှာမယ်၊ ရှာမတွေ့ရင် မထမဆုံး category ကို ယူမယ်
            try:
                selected_category = Category.object.get(id=category_id_from_website)
            except (Category.DoesNotExist, ValueError):
                #category ထဲမှာ data မရှိသေးရင် personal ကို ပြမယ်
                selected_category, create = Category.objects.get_or_create(name='Personal')

            # Database ထဲကို အသစ်သွားဆောက်(သိမ်း) logic
            Task.object.create(
                text=text_form_website,
                category=selected_category # html string/ID အဟုတ်ဘဲ category object ကို ထည့်ပေးလိုက်တာ
            )
            return redirect('home')
        
        # ရိုးရိုးတန်းတန်း website ထဲဝင်လာရင် (GET Request)ရှိသမျှ task တွေပြမယ်
        all_tasks = Task.objects.all()
        all_categories = Category.objects.all()

        context = {
            'tasks': all_tasks,
            'categories': all_categories
        }

        return render(request, 'todo/home.html', context)
        
# for delete logic
def delete_task(request, task_id):
    # search database same Task form URL
    task = get_object_or_404(Task, id=task_id)

    # delete,if search Database 
    task.delete()

    # website (redirect) after delete
    return redirect('home')

# for change Task logic
def complete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)

    # လက်ရှိ completed ဖြစ်နေရင် မဖြစ်တော့ဘူး (false) ပြောင်းမယ်
    # မဖြစ်သေးရင် ဖြစ်သွားပြီ (True) လို့ ပြောင်းပေးလိုက်တာ 
    task.completed = not task.completed

    task.save()

    return redirect('home')