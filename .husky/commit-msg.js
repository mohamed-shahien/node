// scripts/commit-msg.js
const fs = require('fs');
const msgPath = process.argv[2]; // المسار إلى رسالة الكوميت
let msg = fs.readFileSync(msgPath, 'utf-8').trim(); // قراءة الرسالة من الملف

// تحقق إذا كانت الرسالة تحتوي على رقم أو معرف
const validMessagePattern = /\d+/; // النمط للتحقق من وجود رقم في الرسالة

// إذا لم تحتوي الرسالة على رقم، قم بإضافة رقم افتراضي أو استرداد الرقم من بعض المصدر
if (!validMessagePattern.test(msg)) {
  const defaultIssueNumber = '123'; // يمكنك تغيير الرقم الافتراضي أو استرداده من مصدر آخر
  msg = `[Issue #${defaultIssueNumber}] ${msg}`; // إضافة الرقم في بداية الرسالة
  fs.writeFileSync(msgPath, msg); // كتابة الرسالة المعدلة إلى الملف
  console.log(`Commit message was updated: ${msg}`);
} else {
  console.log('Commit message is valid.');
}

process.exit(0); // نجاح إذا كانت الرسالة صحيحة
