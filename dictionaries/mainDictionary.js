module.exports = {
    "en": {
        index: "Choose what you want to search. Or you can change language to Russian",
        language: {
            message: "Choose language",
            message_2: "Your language"
        },
        interface: {
            message: "Choose interface",
            message_2: "Your interface"
        },
        main: "Choose what you want to do",
        help: {
            message: "Enter for start search",
            text: "[ Get result ] - push for get result \n\n" +
                "[ Sort ] - push for sort result by one of sorting. Default value from lowest to highest\n" +
                "When you click on the same sort again, the order will be changed from larger to smaller.\n\n" +
                "[ Select ] - push for get result about specific monster from monsters' result list. You should enter the > id < - value from first column. \n\n" +
                "[ Reset ] - push for reset filters. \n" +
                "You can reset all at the same time or partially.\n" +
                "[ Stats ] - reset all stats.\n" +
                "[ Skills ] - reset all skills. \n\n" +
                "You can use some filters at the same time switching by buttons\n" +
                "!Important filter [ Name ] must have only one value. The search is performed by an exact match. \n" +
                "If there is a typo, it will not find anything.\n" +
                "You must enter name only in > *English* <.\n" +
                "You can enter with a small or capital letter, or a caps.\n\n" +
                "The output of several monsters is displayed as: Name (or family name), base stars, element.\n" +
                "The output of one monster contains: Name (or family name), base stars, element," +
                "a brief description of skills (no description, only characteristics), a leader skill (if any).\n\n" +
                "When you choice effect's name, we'll recommend you choice the type firstly, for give you the most correct tip with names.\n" +
                "In case if any type doesn't choice, full list with all names will show.\n\n" +
                "After you get result, if you wanna start search again, you [ MUST ] start by /start command."
        },
        filter: "Select filter to continue",
        monstersById: "Enter id",
        reset: {
            message: "Select filter for reset.",
            filter: "Filter",
            message_2: "has been reset. For search again, use /start"
        },
        result: {
            message: "Select filter type to continue. Pressing it again changes the sort order.\nDefault: smallest to largest."
        },
        getResult: "Nothing found",
        updateFilter: "Your filters",
        monsters: {
            awaken: "Monster awakening level",
            element: "Pick an Element of monster",
            fusion: "Is fusion food",
            name: "Enter the monster or which family it belongs to.",
            stars: {
                message: "Choose to filter the rarity of the monster.",
                gte: "Choose the mi rarity of the monster. " +
                    "If you are looking for an awakened monster, add one star (eg. Oracle 5*, awakened 6*)." +
                    "All a2 monsters have 6*.",
                lte: "Choose the max rarity of the monster." +
                    "If you are looking for an awakened monster, add one star (eg. Oracle 5*, awakened 6*).",
            },
            type: "Choose monster type",
            leaderSkill: {
                amount: "Choose a value",
                area: "Choose a value",
                attribute: "Choose attribute",
                element: "Choose a value",
                filter: "Choose leader skill properties",
            },
            skills: {
                aoe: "Aoe",
                cooltime: "Choose a skill cooltime",
                filter: "Choose a skill properties",
                hits: "Choose a hits count",
                passive: "Passive or active",
                scalesWith: "Scales with",
                slot: "Choose a slot number"
            },
            skillEffect: {
                aoe: "Aoe",
                chance: "Chance of overlaying effect",
                dmg: "Does skill effect deal damage?",
                filter: "Choose skill effect properties"
            },
            effect: {
                name: "Enter effect name from list.",
                filter: "Choose a effect properties",
                type: "Choose a effect type"
            },
            stats: {
                filter: "Choose a filter",
                accuracy: "Choose a value.",
                attack: {
                    filter: "Choose a value.",
                    lte: "Search value less than",
                    gte: "Search value greater than"
                },
                speed: {
                    filter: "Choose a value.",
                    lte: "Search value less than",
                    gte: "Search value greater than"
                },
                hp: {
                    filter: "Choose a value.",
                    lte: "Search value less than",
                    gte: "Search value greater than"
                },
                defense: {
                    filter: "Choose a value.",
                    lte: "Search value less than",
                    gte: "Search value greater than"
                },
                resistance: "Choose a value.",
                criRate: "Choose a value."
            }
        }
    }, "ru": {
        index: "Что ищем?. Или же, Вы можете изменить язык на английский",
        language: {
            message: "Выберите язык",
            message_2: "Выбран язык"
        },
        interface: {
            message: "Выберите интерфейс",
            message_2: "Ваш интерфейс"
        },
        main: "Выберите действие",
        help: {
            message: "Введите, чтобы начать поиск.",
            text: "[ Get result ] - нажмите, чтобы получить результат \n\n" +
                "[ Sort ] - нажмите, чтобы отсортировать результат по одной из сортировок. По умолчанию значения от наименьшего - к большему.\n" +
                "При повторном нажатии на ту же сортировку, порядок будет изменён на от большего к меньшему.\n\n" +
                "[ Select ] - нажмите, чтобы получить полную информацию о конкретном мобе из списка найденых. Вам необходимо будет ввести > id < - значение из первой колонки. \n\n" +
                "[ Reset ] - Нажмите, чтобы сбросить фильтры. \n" +
                "Вы можете сбросить все одновременно, либо очистить по-отдельности. \n" +
                "[ Stats ] - сбросит все статы.\n" +
                "[ Skills ] - все скиллы. \n\n" +
                "Вы можете использовать одновременно несколько фильтров, переключаясь по кнопкам. \n" +
                "!Важно Фильтр [ Name ] может содержать только _одно_ значение. Поиск осуществляется точным совпадением. \n" +
                "В случае, если будет допущена опечатка - ничего не найдёт.\n" +
                "Вводить имя или название нужно\n" +
                "> только на английском языке <.\n" +
                "Вводить можно с маленькой или большой буквы, или капсом. \n\n" +
                "Вывод нескольких мобов выводится в виде: Имя (или название семейства), базовое к-во звёзд, стихия.\n" +
                "Вывод одного моба содержит: Имя (или название семейства), базовое к-во звёзд, стихию," +
                " краткую характеристику скиллов (без описания, только характеристики), лидерку (если есть).\n\n" +
                "При выборе названия эффекта, рекомендуем сначала выбрать его тип, чтобы предоставить более чёткую подсказку с названиями.\n" +
                "В случае, если тип не выбран, будет показан список со всеми возможными эффектами.\n\n" +
                "После получения результата, если Вы хотите начать поиск заново, [ОБЯЗАТЕЛЬНО] начинать с команды /start"
        },
        filter: "Выберите фильтр",
        monstersById: "Введите id",
        reset: {
            message: "Выберите фильтр для сброса.",
            filter: "Фильтр",
            message_2: "сброшен. Для поиска заново, используйте /start"
        },
        result: {
            message: "Выберите тип фильтра. Повторное нажатие меняет порядок сортировки.\nПо умолчанию: от меньшего к большему."
        },
        getResult: "Ничего не найдено",
        updateFilter: "Ваши фильтры",
        monsters: {
            awaken: "Уровень пробуждения монстра",
            element: "Выберите элемент",
            fusion: "Является ли мобом для гекса",
            name: "Введите имя или название семейства",
            stars: {
                message: "Выберите фильтрацию редкости моба.",
                gte: "Выберите минимальную редкость моба. " +
                    "Если ищете пробуждённого монстра, добавляйте одну звезду (напр. оракул 5*, пробуждённая 6*)." +
                    " Все мобы а2 имеют 6*.",
                lte: "Выберите максимальную редкость моба. " +
                    "Если ищете пробуждённого монстра, добавляйте одну звезду (напр. оракул 5*, пробуждённая 6*).",
            },
            type: "Выберите тип монстра",
            leaderSkill: {
                amount: "Выберите значение",
                area: "Выберите значение",
                attribute: "Выберите аттрибут",
                element: "Выберите значение",
                filter: "Выберите свойства лидер скилла",
            },
            skills: {
                aoe: "Массовый",
                cooltime: "Выберите кд скилла",
                filter: "Выберите свойства скилла",
                hits: "Выберите количество ударов",
                passive: "Пассивный или активный",
                scalesWith: "Увеличение от",
                slot: "Выберите номер слота"
            },
            skillEffect: {
                aoe: "Массовый или одиночный",
                chance: "Шанс наложения эффекта",
                dmg: "Наносит ли эффект скилла урон?",
                filter: "Выбрать свойства эффекта скилла"
            },
            effect: {
                name: "Введите название эффекта из списка.",
                filter: "Выберите свойства эффекта",
                type: "Выберите тип эффекта"
            },
            stats: {
                filter: "Выберите фильтр",
                accuracy: "Выберите значение.",
                attack: {
                    filter: "Выберите значение.",
                    lte: "Искать значение меньше, чем",
                    gte: "Искать значение больше, чем"
                },
                speed: {
                    filter: "Выберите значение.",
                    lte: "Искать значение меньше, чем",
                    gte: "Искать значение больше, чем"
                },
                hp: {
                    filter: "Выберите значение.",
                    lte: "Искать значение меньше, чем",
                    gte: "Искать значение больше, чем"
                },
                defense: {
                    filter: "Выберите значение.",
                    lte: "Искать значение меньше, чем",
                    gte: "Искать значение больше, чем"
                },
                resistance: "Выберите значение.",
                criRate: "Выберите значение."
            }
        }
    }
};