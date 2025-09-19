# 🧪 UI-тесты на Playwright

![Playwright](https://playwright.dev/img/playwright-logo.svg)

## 📌 Описание
Автоматизированные тесты для веб-приложения [Swag labs](https://www.saucedemo.com/) с использованием [Playwright](https://playwright.dev/).  
Поддерживается:
- ✅ Кросс-браузерное тестирование (Chromium, Firefox, WebKit)  
- ✅ Page Object Model (POM)  
- ✅ Генерация отчетов (Allure Report)  
- ✅ Запуск в CI/CD (GitHub Actions, Jenkins)  

Список автотестов
- ✅ Успешная авторизация
- ✅ Попытка авторизации с заблокированными данными
- ✅ Попытка авторизации с неверными данными
- ✅ Авторизация и выход из аккаунта
- ✅ Добавление и удаление элементов из корзины с главной страницы
- ✅ Добавление элементов в корзину и удаление одного из них на странице корзины
- ✅ Попытка оставить одно из полей пустым при заполнении формы на странице информации
- ✅ Проверка соответствия полей товара на всех страницах и url этих страниц
- ✅ Оформление товара
- ✅ Фильтрация элементов на главной странице
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

---






