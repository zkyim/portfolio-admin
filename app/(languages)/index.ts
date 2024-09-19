import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"

const resources = {
  en: {
    translation: {
      // Famous words
      "Create": "Create", "Edit": "Edit", "Delete": "Delete", "Cancel": "Cancel", "Save": "Save",
      "Submit": "Submit" ,"Change": "Change",

      "Dashboard": "Dashboard", "Management": "Management", "Education": "Education", "Skills": "Skills",
      "Projects": "Projects", "Viwers": "Viwers", "Portfolio": "Portfolio", 
      // Settings
      "English": "English", "Arabic": "Arabic", "Light": "Light", "Dark": "Dark", "Settings": "Settgets",

      "Mante_message": "Mange your {{name}} like create, edit and delete",
      "Go back": "Go back",
      "Massege_Discription_Form": "This is your public display {{var}}.",
      "Massege_Created": "{{var}} created",
      "Massege_Updated": "{{var}} updated",
      "Massege_Deleted": "{{var}} delete",
      "Massege_Published": "{{var}} is publick",
      "Massege_Notpublished": "{{var}} is not publick",
      "Title": "Title",
      "Description": "Description",
      "Tool": "Tool",
      "Close": "Close",
      "Category": "Category",
      "Public": "Public",
      "Unpublished": "Unpublished",
      "Something went wrong": "Something went wrong, try again",
      "Empty": "Empty",
      "Pick a date": "Pick a date",
      "Date": "Date",
      "Required": "This field is required",
      "less than": "This field cannot be less than {{var}}",
      "greater than": "This field cannot be greater than {{var}}",
      "Are you sure?": "Are you sure?",
      "This action cannot be undone": "This action cannot be undone",
      "Previous": "Previous",
      "Next": "Next",
      "Filter": "Filter {{var}}",
      "Percentage": "Percentage",
      "Publication date": "Publication date",
      "Project": "Project",
      "Demo": "Demo",
      "GithubUrl": "Github Url",
      "Images for Project": "Images for Project",
      "Message_upload": "Chose a main iamge and upload image.",
      "Image": "Image",
      "you have already": "you have {{var}} already",
      "Remove all": "Remove all",
      "Tools": "Tools",
    }
  },
  ar: {
    translation: {
      // Famous words
      "Create": "إنشاء", "Edit": "تعديل", "Delete": "حذف", "Cancel": "إلغاء", "Save": "حفظ",
      "Submit": "إرسال", "Change": "تغيير",
      // sidebar words
      "Dashboard": "لوحة التحكم", "Management": "الإدارة", "Education": "التعليم", "Skills": "المهارات",
      "Projects": "المشاريع", "Viwers": "المشاهدات", "Portfolio": "ملفك",
      // Settings
      "English": "الإنجليزية","Arabic": "العربية","Light": "مضيء","Dark": "معتم", "Settings": "الإعدادات",

      "Mante_message": "إدارة {{name}} مثل إنشاؤه أو التعديل عليه أو حذفه.",
      "Description": "الوصف",
      "Title": "العنوان",
      "Go back": "العودة",
      "Close": "غلق",
      "Massege_Discription_Form": "هذا ماسوف يظهر للمستخدمين.",
      "Massege_Created": "تم إنشاء {{var}}",
      "Massege_Updated": "تم تعديل {{var}}",
      "Massege_Deleted": "تم حذف {{var}}",
      "Massege_Published": "تم إظهار {{var}}",
      "Massege_Notpublished": "تم إخفاء {{var}}",
      "Tool": "المهارة",
      "Category": "القسم",
      "Public": "إظهار",
      "Unpublished": "إخفاء",
      "Something went wrong": "هناك خطأ ما, أعد المحاولة لاحقا.",
      "Empty": "فارغة",
      "Pick a date": "إختر التارخ",
      "Date": "التارخ",
      "Required": "هذا الحقل مطلوب",
      "less than": "هذا الحقل يجب أنلا يحتوي على أكثر من {{var}}",
      "greater than": "هذا الحقل يجب أنلا يحتوي على أقل من {{var}}",
      "Are you sure?": "هل أنت متأكد ?",
      "This action cannot be undone": "لا يمكن التراجع عن هذه الخطوة فيما بعد.",
      "Previous": "السابق",
      "Next": "التالي",
      "Filter": "فلترة من خلال {{var}}",
      "Percentage" : "النسبة المئوية",
      "Skill" : "المهارة",
      "Publication date" : "تاريخ النشر",
      "Project" : "المشروع",
      "Demo" : "رابط المشروع",
      "GithubUrl" : "رابط جيت هاب",
      "Images for Project" : "صور المشروع",
      "Message_upload": "اختر الصورة الرئيسية وارفع مزيدا من الصور.",
      "you have already": "تمتلك {{var}} من قبل",
      "Image": "الصورة",
      "Remove all": "حذف الكل",
      "Tools": "المهارت",
    },
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ['cookie', 'localeStorage'],
      caches: ['cookie']
    }
  });

  export default i18n;