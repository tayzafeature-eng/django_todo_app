from django.db import models

class Task(models.Model):

    # Task ရဲ့ စာသားကို စာလုံးရေအများဆုံး ၂၅၅ လုံးထိသိမ်းမယ်လို သတ်မှတ်တာ
    text = models.CharField(max_length=255)

    # Task ပြီး၊ မပြီးကို True သို့မဟုတ် False ပဲ သိမ်းမယ် (အစမှာတော့ မပြီးသေးလို့ false ပေါ့)
    completed = models.BooleanField(default=False)

    # Category အမျိုးအစားကိုလည်း စာသားအနေနဲ့ အများဆုံး စာလုံးရေ ၁၀၀ သိမ်းမယ်
    category = models.CharField(max_length=100, default='Personal')

# ဒါကတော့ Database ထဲမှာ ကြည့်လိုက်ရင် Task ရဲ့ နာမည်ကို စာသားအတိုင်း လှလှပပ မြင်ရအောင် လိုပ်တာပါ
def __str__(self):
    return self.text
