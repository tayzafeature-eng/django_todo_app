import json 
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404 #redirect ကိုပါ import ထည့်ရမယ်
from .models import Task 
from django.views.decorators.csrf import csrf_exempt # လိုအပ်ရင်သုံးဖို့


def home(request):
    # Javascript Fetch က ပို့လိုက်တဲ့ post request ကို ဖမ်းမယ့်အပိုင်း
    if request.method == "POST":
        # JavaScript က ပို့လိုက်တဲ့ JSON formant ဒေတာကို ဖတ်ယူခြင်း
        try:
            data = json.loads(request.body)
            text_form_website = data.get('task_text')
            category_form_website = data.get('task_category')

        except json.JSONDecodeError:
            # ရိုးရိုး Form သုံးတားသေးရင် အဟောင်းအတိုင်း ဖတ်မယ်
            text_form_website = request.POST.get('task_text')
            category_form_website = request.POST.get('task_category')

        if text_form_website:
            if not category_form_website:
                category_form_website = 'Personal'

            # Database ထဲသွားသိမ်းမယ်
            new_task = Task.objects.create(
                text=text_form_website,
                category=category_form_website
            )

            # Reload မလုပ်တော့ ဘဲ Javascript ဆီအောင်မြင်ကြောင်းပို့မယ်
            return JsonResponse({
                'status': 'success',
                'message': 'Task created successfully!',
                'task_id': new_task.id,
                'task_text': new_task.text,
                'task_category': new_task.category
            })
        
    #GET Request အတွက် မူရင်းအတိုင်းပဲ 
    all_tasks = Task.objects.all()
    context = {
        'tasks': all_tasks
    }
    return render(request, 'todo/home.html', context)
    
# for delete logic
def delete_task(request, pk):
    task = get_object_or_404(Task, id=pk)

    if request.method == "POST":
        task.delete()
        # ရိုးရိုး redirect နေရာမှာ javascript  ဆီအောင်မြင်ကြောင်း သတင်းပို့လိုက်တာ
        return JsonResponse({
            'status': 'success',
            'message': 'Task deleted successfylly!'
        })
    
    # အကယ်၍ GET request နဲ့ လာရင်တော့ မူရင်းအတိုင်း ဖျက်ပြီး redirect လုပ်ပေးထားမယ်
    task.delete()
    return redirect('home')

# for change Task logic
def complete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)

    # လက်ရှိ completed ဖြစ်နေရင် မဖြစ်တော့ဘူး (false) ပြောင်းမယ်
    # မဖြစ်သေးရင် ဖြစ်သွားပြီ (True) လို့ ပြောင်းပေးလိုက်တာ 
    task.completed = not task.completed

    task.save()

    return redirect('home')