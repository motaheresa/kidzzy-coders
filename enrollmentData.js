let enrollments = [];

function sendToWhatsApp(data) {
    const phoneNumber = '201279098049'; // Replace with your WhatsApp number
    
    const message = `🎓 *تسجيل جديد - أكاديمية Kidzzy Coders*

👨‍👩‍👧 *اسم ولي الأمر:* ${data['parent-name']}
👶 *اسم الطفل:* ${data['child-name']}
🎂 *العمر:* ${data.age} سنة
📧 *البريد الإلكتروني:* ${data.email}
📱 *رقم الهاتف:* ${data.phone}
💻 *البرنامج المطلوب:* ${data.program}
📝 *رسالة إضافية:* ${data.message || 'لا توجد'}

⏰ تاريخ التسجيل: ${data.timestamp}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    enrollments.push(encodedMessage)
    window.open(whatsappUrl, '_blank');
}