// 1. Search (ရိုက်ရှာတဲ့ စနစ်) အတွက် Logic
const searchInput = document.getElementById('searchInput');

if (searchInput) {
    searchInput.addEventListener('input', function(){
        const filterValue = searchInput.value.toLowerCase();
        // HTML ထဲမှာ Django ပတ်ပေးထားတဲ့ <li> tag တွေကို လှမ်းဖမ်းတာပါ
        const listItem = document.querySelectorAll('#myList li').length;

        listItem.forEach(item => {
            // task စာသားတည်ရှိရာ span ကို ရှာတာပါ
            const textElement = item.querySelector('.fs-5');

            if (!textElement) return;

            const taskText = textElement.textContent.toLowerCase();

            if (taskText.includes(filterValue)) {
                item.style.setProperty('display', 'flex', 'important');
            }else {
                item.style.setProperty('display', 'none', 'important');
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

// HTML Form ကို javascript က လှမ်းဖမ်းတာ
const todoForm = document.getElementById('todoForm');

todoForm.addEventListener('submit', function(event){
    // Form နှိပ်လိုက်ရင် website ကြီး Reload မဖြစ်အောင် တာဆီး
    event.preventDefault();

    // Input Box ထဲက စားသားကို ဆွဲယူတယ်
    const taskText = document.getElementById('taskInput').value;
    // Hidden Input ထဲက ရွှေးထားတဲ့ category ကို ဆွဲယူတယ်
    const taskCategory = document.getElementById('selectedCategory').value;

    // Django ရဲ့ CSRF Tokenကို HTML ကနေ ဖမ်းထား(လုံခြံုရေးအတွက်)
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Fetch API စတင် အလုပ်လုပ်ပြီ
    // '/home/' နေရာမှာ မိမိရဲ့ URL  သတ်မှတ်ချက်အတိုင်း ပြင်နိုင်
    fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken // Django ဆီ CSRF Token လှမ်းပေးလိုက်တာ
        },
        // ဒေတာတွေကို စာသား (JSON String)ပြောင်းပြိး ပို့မယ်
        body: JSON.stringify({
            'task_text': taskText,
            'task_category': taskCategory
        })
    })
    .then(response => response.json())// ဆာဗာက ပြန်ပေးတဲ့ JSON ဒေတာကို ဖတ်မယ်
    .then(data => {
        // ၁။ HTML နေရာဟောင်း <ul id='taskList"> ကိုလှမ်းဖမ်းတယ်
        const taskList = document.getElementById('taskList');

        // ၂။ ဘာ task မှ မရှိသေးပါ ဆိုတဲ့ စာသားရှိနေရင် ဖျက်ထုတ်ပစ်မယ်
        if (taskList.children.length === 1 && taskList.children[0].textContent.includes('ဘာ task မှ မရှိသေးပါ')) {
            taskList.innerHTML = '';
        }

        // ၃။ <li> tag အသစ်တစ်ခုကို javascript နဲ့ ဆောက်တယ်
        const newLi = document.createElement('li');
        newLi.className = 'list-group-item d-flex justify-content-between align-items-center';
        newLi.setAttribute('data-category', data.task_category); // Filter လုပ်လို့ရအောင်

        // 4။ Category အလိုက် badge အရောင်ခွဲခြားတဲ့ အပိုင်း
        let badgeHTML = '';
        if (data.task_category === 'Work') {
            badgeHTML = `<span class="badge bg-danger me-2">💼 Work</span>`
        } else if (data.task_category === 'Study') {
            badgeHTML = `<span class="badge bg-warning text-dark me-2">📚 Study</span>`
        } else {
            badgeHTML = `<span class="badge bg-info text-dark me2">🏠 Personal</span>`
        }

        // ၅။ မူရင်း HTML structure အတိုင်း <li> ထဲကို ကုဒ်တွေအရှင်ထည့်တာ
        newLi.innerHTML = `
            <div class="d-flex align-items-center w-100">
                ${badgeHTML}
                <div class="d-flex align-items-center">
                    <a href="/complete/${data.task_id}" class="text-decoration-none">
                        <span class="me-2 text-muted">⭕</span>
                    </a>
                    <span class="fs-5">${data.task_text}</span>
                </div>
            </div>
            
            <button class="btn btn-sm btn-danger delete-btn" data-id="${data.task_id}">❌</button>
        `;

        // ၆။ <li> အသစ်ကြီးကို <ul> ထဲ ပစ်ထည့်လိုက်ပြီ
        taskList.appendChild(newLi);

        // ၇။ ပြိးသွားရင် Input Box ကို စာပြန်ဖျက်ပေးမယ်
        document.getElementById('taskInput').value = '';
    })
    .catch(error => {
        console.error("အိုင်ယား ... တစ်နေရာရာမှာ လွဲသွားပြီ -", error);
    });
});

const taskListContainer = document.getElementById('taskList');

taskListContainer.addEventListener('click', function(event){
    // နှိပ်လိုက်တဲ့ အရာက (delete-btn) ဖြစ်သလားလို့ စစ်တာ
    if(event.target.classList.contains('delete-btn')){
        const button = event.target;
        const taskId = button.getAttribute('data-id'); // Task ID ကို ဆွဲယူတယ်
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        // တကယ်ဖျက်မှာ သေခြာလို့လားလို့ မေးတာ
        if (confirm("ဒီ task ကို တကယ် ဖျက်မှာလား?")){
            // Django ဆီကို ဖြတ်လမ်းကနေ POST request နဲ့ လှမ်းဖျက်ခိုင်းတာ
            fetch(`/delete/${taskId}/`, {
                method: 'POST',
                headers:{
                    'X-CSRFToken': csrfToken
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    //မျက်စိရှေ့က <li> tag တစ်ခုလုံးကို ရှာပြီး auto ဖျက်ထုတ်ပစ်တာ
                    const liToDestory = button.closest('li');
                    liToDestory.remove();

                    // အကယ်၍ Task တွေအကုန်ကုန်သွားရင် "ဘာ task မှ မရှိသေးပါ" စာသားပြန်ပြပေး
                    const remainingTasks = document.getElementById('taskList');
                    if (remainingTasks.children.length === 0) {
                        remainingTasks.innerHTML = '<li class="list-group-item text-center text-muted">ဘာ task မှမရှိသေးပါ</li>';
                    }
                }
            })
            .catch(error => console.error("ဖျက်တာ လွဲသွားတယ်ဗျာ -", error));
        }
    }
});