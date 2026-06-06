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

    // (ဒါက !) နိုပ်လိုက်တဲ့ Category စာသားကို html က လျှို့ဝှက် အကွက်ထဲ လှမ်းထည့်လိုက်တာ
    // တကယ်လို့ 'all' ကို နိုပ်ထားရင် default အနေနဲ့ 'personal' လို့ သတ်မှတ်ပေးလိုက်မယ်
    const backendCategory = (category == 'All') ? 'Personal' :category;
    document.getElementById('selectedCategory').value = backendCategory;

    const listItem = document.querySelectorAll('#myList li');

    listItem.forEach(item =>{
        // <li> ထဲမှာ ရှိတဲ့ badge ရဲ့ စာသားကို ယူတာ(ဉပမာ - work ဆိုရင် 'work' လို့ ယူမယ်)
        const badgeElement = item.querySelector('.badge');
        const itemCategory = badgeElement ? badgeElement.textContent.toLowerCase() : '';

        if (category === 'All') {
            item.style.setProperty('display', 'flex', 'important');
        } else if (itemCategory.includes(category.toLowerCase())) {
            item.style.setProperty('display', 'flex', 'important');
        } else {
            item.style.setProperty('display', 'none', 'important');
        }
    });
}