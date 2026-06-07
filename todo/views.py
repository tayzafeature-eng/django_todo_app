from django.shortcuts import render, redirect
from .models import Task, Category

def home(request):
    if request.method == "POST":
        text_form_website = request.POST.get('task_text')
        category_id_from_website = request.POST.get('task_category')
        
        if text_form_website:
            # 🌟 အလွန်ရိုးရှင်းပြီး လုံခြုံတဲ့ နည်းလမ်းဖြင့် စစ်ဆေးခြင်း
            # Form က ID ပို့လိုက်ပြီး အဲ့ဒီ ID က ကိန်းဂဏန်းအစစ်ဖြစ်ရင်
            if category_id_from_website and category_id_from_website.isdigit():
                try:
                    selected_category = Category.objects.get(id=int(category_id_from_website))
                except:
                    # ဒေတာဘေ့စ်ထဲမှာ ရှာမတွေ့ရင် ပထမဆုံး Category ကို အလိုအလျောက် ယူမယ်
                    selected_category = Category.objects.first()
            else:
                # ID မပါလာရင် ပထမဆုံး Category ကို ယူမယ်
                selected_category = Category.objects.first()
            
            # အကယ်၍ Database ထဲမှာ Category လုံးဝမရှိသေးရင် Default တစ်ခု အတင်းဆောက်မယ်
            if not selected_category:
                selected_category = Category.objects.create(name='Personal')
            
            # Task ကို အောင်မြင်စွာ သိမ်းဆည်းခြင်း
            Task.objects.create(
                text=text_form_website,
                category=selected_category
            )
            return redirect('home')
            
    # Website ပေါ်မှာ Task တွေ ပြန်ပြဖို့ ဆွဲထုတ်ခြင်း
    all_tasks = Task.objects.all()
    
    context = {
        'tasks': all_tasks
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