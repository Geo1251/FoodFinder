const products = [
    {
        name: 'Яблоко',
        proteins: 0.3,
        fats: 0.2,
        carbohydrates: 14,
        calories: 52
    },
    {
        name: 'Банан',
        proteins: 1.1,
        fats: 0.3,
        carbohydrates: 23,
        calories: 96
    },
    {
        name: 'Куриное филе',
        proteins: 23,
        fats: 1.2,
        carbohydrates: 0,
        calories: 110
    },
    {
        name: 'Рис',
        proteins: 2.7,
        fats: 0.3,
        carbohydrates: 28,
        calories: 130
    },
    {
        name: 'Молоко',
        proteins: 3.3,
        fats: 1,
        carbohydrates: 4.8,
        calories: 42
    },
    {
        name: 'Гречка',
        proteins: 12.6,
        fats: 2.6,
        carbohydrates: 62,
        calories: 313
    },
    {
        name: 'Хлеб',
        proteins: 6.4,
        fats: 1,
        carbohydrates: 46,
        calories: 227
    },
    {
        name: 'Шоколадка',
        proteins: 5.4,
        fats: 35.3,
        carbohydrates: 56,
        calories: 544
    },
    {
        name: 'Картошка',
        proteins: 2,
        fats: 0.4,
        carbohydrates: 18,
        calories: 80
    },
    {
        name: 'Морковь',
        proteins: 1.3,
        fats: 0.1,
        carbohydrates: 6.9,
        calories: 32
    },
    {
        name: 'Свекла',
        proteins: 1.5,
        fats: 0.1,
        carbohydrates: 8.8,
        calories: 40
    },
    {
        name: 'Капуста',
        proteins: 1.8,
        fats: 0.1,
        carbohydrates: 4.7,
        calories: 27
    },
    {
        name: 'Огурец',
        proteins: 0.8,
        fats: 0.1,
        carbohydrates: 2.8,
        calories: 15
    },
    {
        name: 'Помидор',
        proteins: 0.6,
        fats: 0.2,
        carbohydrates: 4.2,
        calories: 19
    },
    {
        name: 'Кукуруза',
        proteins: 3.3,
        fats: 1.2,
        carbohydrates: 18,
        calories: 86
    },
    {
        name: 'Горох',
        proteins: 5.4,
        fats: 0.4,
        carbohydrates: 14,
        calories: 81
    },
    {
        name: 'Фасоль',
        proteins: 4.8,
        fats: 0.6,
        carbohydrates: 22,
        calories: 119
    },
    {
        name: 'Картофель',
        proteins: 2,
        fats: 0.4,
        carbohydrates: 18,
        calories: 80
    },
    {
        name: 'Лук',
        proteins: 1.4,
        fats: 0.1,
        carbohydrates: 9.3,
        calories: 41
    },
    {
        name: 'Чеснок',
        proteins: 6.5,
        fats: 0.5,
        carbohydrates: 29,
        calories: 143
    },
    {
        name: 'Перец',
        proteins: 1.3,
        fats: 0.1,
        carbohydrates: 5.3,
        calories: 27
    },
    {
        name: 'Соль',
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        calories: 0
    },
    {
        name: 'Сахар',
        proteins: 0,
        fats: 0,
        carbohydrates: 99.7,
        calories: 398
    },
    {
        name: 'Мед',
        proteins: 0.8,
        fats: 0,
        carbohydrates: 81.5,
        calories: 329
    },
    {
        name: 'Масло',
        proteins: 0,
        fats: 99.8,
        carbohydrates: 0,
        calories: 899
    },
    {
        name: 'Майонез',
        proteins: 2.4,
        fats: 67,
        carbohydrates: 3.9,
        calories: 627
    },
    {
        name: 'Кетчуп',
        proteins: 1.8,
        fats: 1,
        carbohydrates: 22,
        calories: 93
    },
    {
        name: 'Соевый соус',
        proteins: 6,
        fats: 0,
        carbohydrates: 5,
        calories: 53
    },
    {
        name: 'Чай',
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        calories: 1
    },
    {
        name: 'Кофе',
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        calories: 2
    },
    {
        name: 'Кола',
        proteins: 0,
        fats: 0,
        carbohydrates: 10.4,
        calories: 42
    },
    {
        name: 'Пиво',
        proteins: 0.3,
        fats: 0,
        carbohydrates: 4.6,
        calories: 42
    },
    {
        name: 'Водка',
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        calories: 235
    },
    {
        name: 'Вино',
        proteins: 0.2,
        fats: 0,
        carbohydrates: 16,
        calories: 68
    },
    {
        name: 'Коньяк',
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        calories: 220
    },
    {
        name: 'Виски',
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        calories: 222
    },
    {
        name: 'Курица',
        proteins: 20.8,
        fats: 13.1,
        carbohydrates: 0,
        calories: 190
    },
    {
        name: 'Свинина',
        proteins: 16.5,
        fats: 21.6,
        carbohydrates: 0,
        calories: 259
    },
    {
        name: 'Говядина',
        proteins: 18.9,
        fats: 12.4,
        carbohydrates: 0,
        calories: 187
    },
    {
        name: 'Баранина',
        proteins: 15.6,
        fats: 16.3,
        carbohydrates: 0,
        calories: 209
    },
    {
        name: 'Конина',
        proteins: 20.6,
        fats: 5.8,
        carbohydrates: 0,
        calories: 140
    },
    {
        name: 'Индейка',
        proteins: 21.6,
        fats: 12.8,
        carbohydrates: 0,
        calories: 197
    },
    {
        name: 'Утка',
        proteins: 16.5,
        fats: 61,
        carbohydrates: 0,
        calories: 346
    },
    {
        name: 'Кролик',
        proteins: 21.8,
        fats: 8.2,
        carbohydrates: 0,
        calories: 156
    },
    {
        name: 'Кабан',
        proteins: 20.6,
        fats: 2.4,
        carbohydrates: 0,
        calories: 108
    },
    {
        name: 'Креветка',
        proteins: 20.5,
        fats: 0.7,
        carbohydrates: 0,
        calories: 100
    },
    {
        name: 'Кальмар',
        proteins: 18.1,
        fats: 2.8,
        carbohydrates: 0,
        calories: 98
    },
    {
        name: 'Мидия',
        proteins: 9.1,
        fats: 1.5,
        carbohydrates: 0,
        calories: 57
    },
    {
        name: 'Моллюск',
        proteins: 9.1,
        fats: 1.5,
        carbohydrates: 0,
        calories: 57
    },
    {
        name: 'Осетр',
        proteins: 16.4,
        fats: 11.7,
        carbohydrates: 0,
        calories: 203
    },
    {
        name: 'Семга',
        proteins: 20.5,
        fats: 13.5,
        carbohydrates: 0,
        calories: 205
    },
    {
        name: 'Сельдь',
        proteins: 18.6,
        fats: 12.7,
        carbohydrates: 0,
        calories: 196
    },
    {
        name: 'Треска',
        proteins: 17.7,
        fats: 0.7,
        carbohydrates: 0,
        calories: 78
    },
    {
        name: 'Тунец',
        proteins: 22.1,
        fats: 6.7,
        carbohydrates: 0,
        calories: 144
    },
    {
        name: 'Щука',
        proteins: 18.8,
        fats: 0.8,
        carbohydrates: 0,
        calories: 82
    },
    {
        name: 'Судак',
        proteins: 18.5,
        fats: 0.9,
        carbohydrates: 0,
        calories: 84
    },
    {
        name: 'Сом',
        proteins: 16.6,
        fats: 4.1,
        carbohydrates: 0,
        calories: 107
    },
    {
        name: 'Окунь',
        proteins: 18.3,
        fats: 0.9,
        carbohydrates: 0,
        calories: 82
    },
    {
        name: 'Лещ',
        proteins: 18.1,
        fats: 1.2,
        carbohydrates: 0,
        calories: 84
    },
    {
        name: 'Овсянка',
        proteins: 11.9,
        fats: 6.2,
        carbohydrates: 60.2,
        calories: 342
    },
    {
        name: 'Макароны',
        proteins: 10.4,
        fats: 1.1,
        carbohydrates: 69.7,
        calories: 337
    },
    {
        name: 'Пельмени',
        proteins: 15.6,
        fats: 18.6,
        carbohydrates: 29.6,
        calories: 348
    },
    {
        name: 'Пицца',
        proteins: 11.9,
        fats: 11.9,
        carbohydrates: 29.6,
        calories: 248
    },
    {
        name: 'Бургер',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Картошка фри',
        proteins: 2.9,
        fats: 15.9,
        carbohydrates: 41.9,
        calories: 319
    },
    {
        name: 'Шаурма',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Шашлык',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Салат',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Суп',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Борщ',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Плов',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Паста',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Суши',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Роллы',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Спагетти',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Котлета',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Шницель',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Картофель фри',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Манная каша',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Гречневая каша',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Кукурузная каша',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Рисовая каша',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Молочная каша',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Творог',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Сыр',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Кефир',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Йогурт',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Сметана',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Масло сливочное',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Масло растительное',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Майонез',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Кетчуп',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    },
    {
        name: 'Соевый соус',
        proteins: 12.9,
        fats: 13.9,
        carbohydrates: 27.9,
        calories: 268
    }
];

export default products;