from django.shortcuts import render, redirect, get_object_or_404 #redirect ကိုပါ import ထည့်ရမယ်
from .models import Task # အပေါ်ဆုံးမှာ task model ကို အရင် import လုပ်ပေးရပါမယ်


def home(request):
    # 1. User က website ကနေ Submit နှိပ်ပြီး data အသစ် ပို့လိုက်ရင်
    if request.method == "POST":
        # HTML input ရဲ့ name= 'task_text' ထဲက စာသားကို လှမ်းဖမ်းတာ
        text_form_website = request.POST.get('task_text')
        # HTML က ရွေးလိုက်တဲ့ Category ကို လှမ်းဖမ်းတဲ့ logic
        category_from_website = request.POST.get('task_category')

        if text_form_website:
            # Database ထဲကို အသစ်သွားဆောက် (သိမ်း) ခိုင်းတဲ့ logic
            Task.objects.create(
                text=text_form_website,
                category=category_from_website
            )

        # သိမ်းပြီးသွားရင် စာမျက်နာကို refresh (Redirect) ပြန်လုပ်ခိုင်းတာ
        return redirect('home')

    # ရိုးရိုးတန်းတန်း website ထဲဝင်လာရင် (GET Request) ရှိသမျှ task တွေ ပြပေးမယ်
    all_tasks = Task.objects.all()

    # 2. HTML ဖိုင်ဆီ ပို့ပေးဖို့ အတွက် context (သေတ္တာ) ထဲ ထည့်လိုက်တာ
    context = {
        'tasks': all_tasks
    }

    # 3. HTML ဆီကို render လုပ်တဲ့ အချိန်မှာ context သေတ္တာကိုပါ တစ်ပါတည်း ထည့်ပေးလိုက်တာပါ
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