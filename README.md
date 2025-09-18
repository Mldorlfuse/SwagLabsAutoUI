📘 Пример README.md для Playwright-проекта
# 🧪 UI-тесты на Playwright

![Playwright](https://playwright.dev/img/playwright-logo.svg)

## 📌 Описание
Автоматизированные тесты для веб-приложения [Swag labs](https://www.saucedemo.com/) с использованием [Playwright](https://playwright.dev/).  
Поддерживается:
- ✅ Кросс-браузерное тестирование (Chromium, Firefox, WebKit)  
- ✅ Page Object Model (POM)  
- ✅ Генерация отчетов (Allure Report)  
- ✅ Запуск в CI/CD (GitHub Actions, Jenkins)  

---

## 🚀 Установка

### 1. Клонировать репозиторий
```
git clone https://github.com/Mldorlfuse/SwagLabsAutoUI.git
cd SwagLabsAutoUI
```

### 2. Установить зависимости
```
npm install
```

---

## ▶️ Запуск тестов

### Все тесты
```
npx playwright test
```

### В конкретном браузере
```
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### По тегу тестов
```
npx playwright test --grep @UI
```

### В headed-режиме (видимый браузер)
```
npx playwright test --headed
```

---


## 📊 Отчет Allure Report

### Генерация отчета 

```
npx allure generate ./allure-results --clean -o ./allure-report
```
### Открытие отчета
```
npx allure open ./allure-report
```




