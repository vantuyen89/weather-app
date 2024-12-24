// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Cấu hình ngôn ngữ
i18n
  .use(initReactI18next) // tích hợp i18next với React
  .init({
    resources: {
      en: {
        translation: {
          hello: "Hello",
        },
      },
      vi: {
        translation: {
          hello: "Xin chào",
        },
      },
    },
    lng: "vi", // Ngôn ngữ mặc định
    fallbackLng: "en", // Nếu không tìm thấy bản dịch, sẽ dùng ngôn ngữ mặc định
    interpolation: {
      escapeValue: false, // Để tránh lỗi XSS
    },
  });

export default i18n;
