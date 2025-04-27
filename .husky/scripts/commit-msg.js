const fs = require('fs');
const { execSync } = require('child_process'); // عشان نشغل أوامر Git
const msgPath = process.argv[2]; // المسار إلى رسالة الكوميت
let msg = fs.readFileSync(msgPath, 'utf-8').trim(); // قراءة الرسالة من الملف

// تحقق إذا كانت الرسالة تحتوي على رقم أو معرف
const validMessagePattern = /\d+/; // النمط للتحقق من وجود رقم في الرسالة

// إذا لم تحتوي الرسالة على رقم، أضف رقم الكوميت الحالي
if (!validMessagePattern.test(msg)) {
  // جيب عدد الكوميتات في المشروع
  const commitCount = execSync('git rev-list --count HEAD').toString().trim();
  msg = `[Commit #${commitCount}] ${msg}`; // إضافة رقم الكوميت في بداية الرسالة
  fs.writeFileSync(msgPath, msg); // كتابة الرسالة المعدلة إلى الملف
  console.log(`Commit message was updated: ${msg}`);
} else {
  console.log('Commit message is valid.');
}

process.exit(0); // نجاح إذا كانت الرسالة صحيحة