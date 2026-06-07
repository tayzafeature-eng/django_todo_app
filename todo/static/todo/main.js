// 1. Search (ရိုက်ရှာတဲ့ စနစ်) အတွက် Logic
const searchInput = document.getElementById('searchInput');

if (searchInput) {
    searchInput.addEventListener('input', function(){
        const filterValue = searchInput.ariaValueMax.toLowerCase();
        // HTML ထဲမှာ Django ပတ်ပေးထားတဲ့ <li> tag တွေကို လှမ်းဖမ်းတာပါ
        const listItem = document.querySelectorAll('#myList li');

        listItem.forEach(item => {
            // task စာသားတည်ရှိရာ span ကို ရှာတာပါ
            const taskText = item.querySelector('span:not(.badge)').textContent.toLowerCase();

            if (taskText.includes(filterValue)) {
                item.style.setProperty('display', 'flex', 'important');
            }else {
                item.style.setProperty('display', 'none', 'important');
            }
        });
    });
}

// 2. Filter by Category (အမျိုးအစားအလိုက် ခွဲခြားကြည့်တဲ့စနစ်) အတွက် logic
function filterCategory(category, button){
    // Active ဖြစ်နေတဲ့ Button အရောင်တွေကို လဲပေးတာ
    document.querySelectorAll('.mb-3 .btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Website ပေါ်က task တွေကို filter ပတ်ပြတဲ့ အပိုင်း
    const tasks = document.querySelectorAll('.list-group-item');
    tasks.forEach(task => {
        if(category === 'All' || task.getAttribute('data-category') === category) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });

    // backend ဆီ category အမှန်ရောက်အောင်ပို့မယ်
    // user က all ကို နှိပ်ထားရင် default အနေနဲ့ 'personal' ကို သတ်မှတ်ထားမယ်
    if (category === 'All') {
        document.getElementById('selectedCategory').value = 'Personal';
    } else {
        // work or study ကို နှိပ်ရင် form ထည်း ထည့်ပေးလိုက်မယ်
        document.getElementById('selectedCategory').value = category;
    }

}