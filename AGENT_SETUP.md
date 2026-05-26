# ProfitGuard Site Agent

В этот пакет добавлен быстрый FAQ-агент на JavaScript.

## Что он делает
- Показывает кнопку «Задать вопрос»
- Отвечает на типовые вопросы по ProfitGuard Platform
- Даёт контакт Екатерины для пилота
- Работает на GitHub Pages без backend

## Важно
Это безопасный статический FAQ-агент. Он не использует OpenAI API, поэтому не раскрывает API-ключ на сайте.

## Для настоящего AI-агента
GitHub Pages не подходит для прямого подключения OpenAI API, потому что API-ключ будет виден в браузере.
Нужен один из вариантов:
1. Backend proxy: FastAPI / Node.js / Vercel Function
2. Готовый виджет: Botpress / Voiceflow / Chatbase / Crisp / Tidio
3. ProfitGuard backend в будущей платформе

## Что дать AI-агенту как knowledge base
- описание ProfitGuard Platform
- модули DistributionGuard, RetailGuard, SalesControl Tower
- условия пилота
- список входных файлов
- правила безопасности и Data Leak Prevention
- контакты Екатерины
