// 1. Search (ရိုက်ရှာတဲ့ စနစ်) အတွက် Logic
const searchInput = document.getElementById('searchInput');

if (searchInput) {
    searchInput.addEventListener('input', function () {

        const filterValue = this.value.toLowerCase();

        const listItems = document.querySelectorAll('#myList li');

        listItems.forEach(item => {

            const taskText = item.textContent.toLowerCase();

            if (taskText.includes(filterValue)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }

        });

    });
}

function filterCategory(category, button) {
    // ၁။ Button တွေကို Active လဲပေးတဲ့အပိုင်း (မင်းရဲ့မူရင်းကုဒ်)
    document.querySelectorAll('.d-flex .btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // ၂။ Website ပေါ်က task တွေကို filter ပတ်ပြတဲ့အပိုင်း (မင်းရဲ့မူရင်းကုဒ်)
    const tasks = document.querySelectorAll('.list-group-item');
    tasks.forEach(task => {
        if (category === 'All' || task.getAttribute('data-category') === category) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });

    // 🌟 ၃။ views.py ကိုမပြင်ဘဲ Backend ဆီ Category အမှန်ရောက်အောင် ပို့ပေးမည့် နေရာ
    // အကယ်၍ User က '⭐ All' ခလုတ်ကို နှိပ်ထားရင် Default အနေနဲ့ 'Personal' လို့ သတ်မှတ်ပေးလိုက်မယ်
    if (category === 'All') {
        document.getElementById('selectedCategory').value = 'Personal';
    } else {
        // 'Work' သို့မဟုတ် 'Study' သို့မဟုတ် 'Personal' နှိပ်ရင် အဲ့ဒီစာသားအတိုင်း Form ထဲ ထည့်ပေးလိုက်မယ်
        document.getElementById('selectedCategory').value = category;
    }
}