<div align="center">
<img src="assets/common/icon.png" alt="" />
<h1>ZeppOS Транспорт</h1>
<p>
Расписание общественного транспорта для умных часов от Amazfit
На базе <a href="https://bus62.ru/">Bus62.ru API</a>
</p>
</div>

- [📀 Установить](https://mmk.pw/zepp/transport/)
- [❤️ Сказать спасибо](https://mmk.pw/donate/)

## Как собрать

Нужны:
- Python 3.10+
- NodeJS и [ZeppOS CLI Tools](https://docs.zepp.com/docs/guides/tools/cli/)

Клонируйте исходный код **рекурсивно**:
```bash
git clone --recursive https://github.com/melianmiko/ZeppOS-Transport.git
cd ZeppOS-Transport
```

Сгенерируйте ассеты для всех моделей часов:
```bash
python3 prepare_all.py
```

Остаётся выполнить сборку
```bash
zeus preview    # Для установки на часы, ИЛИ
zeus dev        # для запуска на офф симуляторе
```
