export interface Maniac {
  id: number;
  name: string;
  nickname: string;
  years: string;
  victims: number;
  address: string;
  district: string;
  coords: [number, number];
  description: string;
  sentence: string;
  photo?: string;
  photoPosition?: string;
}

export const maniacs: Maniac[] = [
  {
    id: 1,
    name: "Василий Комаров",
    nickname: "Шаболовский душегуб",
    years: "1921–1923",
    victims: 33,
    address: "Шаболовка, 26",
    district: "Замоскворечье",
    coords: [37.6083, 55.7167],
    description:
      "Извозчик. Заманивал клиентов, убивал молотком, грабил.",
    sentence: "Расстрелян в 1923",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/1/19/%D0%92%D0%B0%D1%81%D0%B8%D0%BB%D0%B8%D0%B9_%D0%9A%D0%BE%D0%BC%D0%B0%D1%80%D0%BE%D0%B2.jpg",
  },
  {
    id: 2,
    name: "Владимир Ионесян",
    nickname: "Мосгаз",
    years: "1963–1964",
    victims: 5,
    address: "Сокол, ул. Балтийская",
    district: "Сокол",
    coords: [37.5156, 55.8128],
    description:
      "Представлялся сотрудником Мосгаза, убивал топором. Москва в панике — люди боялись открывать дверь газовщикам.",
    sentence: "Расстрелян в 1964",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/c/c4/Preview_2dcca45fc808580cd1ebf416f1faf7b2.jpg",
  },
  {
    id: 3,
    name: "Сергей Головкин",
    nickname: "Фишер",
    years: "1984–1992",
    victims: 11,
    address: "Одинцово, Горки-10",
    district: "Одинцовский район",
    coords: [37.2774, 55.7294],
    description:
      "Зоотехник на конезаводе. Прозвище — Фишер (от шахматиста Бобби Фишера). Гараж-пыточная в 500 м от дачи Ельцина.",
    sentence: "Расстрелян в 1996 — последний казнённый в России",
    photo:
      "https://upload.wikimedia.org/wikipedia/en/3/38/Sergey_Golovkin_%28murderer%29.png",
  },
  {
    id: 4,
    name: "Александр Пичушкин",
    nickname: "Битцевский маньяк",
    years: "1992–2006",
    victims: 49,
    address: "Зюзино, Херсонская ул.",
    district: "Зюзино",
    coords: [37.5756, 55.6531],
    description:
      "Безработный. Сбрасывал тела в колодцы Битцевского леса. Мечтал убить 64 — как клеток на шахматной доске.",
    sentence: "Пожизненное заключение",
    photo:
      "https://upload.wikimedia.org/wikipedia/en/d/d9/AlexanderPichushkin.jpg",
  },
  {
    id: 5,
    name: "Сергей Ряховский",
    nickname: "Балашихинский потрошитель",
    years: "1988–1993",
    victims: 19,
    address: "Балашиха, Салтыковка",
    district: "Балашиха",
    coords: [37.9378, 55.7961],
    description:
      "Грузчик. Родился и убивал в одном районе — Салтыковке. Жертвы — преимущественно женщины.",
    sentence: "Расстрелян в 1995",
    photo:
      "https://upload.wikimedia.org/wikipedia/en/d/dc/SergeiRyakhovsky.png",
  },
  {
    id: 6,
    name: "Олег Кузнецов",
    nickname: "Лжедмитрий",
    years: "1991–1992",
    victims: 10,
    address: "Балашиха → Измайлово",
    district: "Измайлово",
    coords: [37.8003, 55.7887],
    description:
      "Рабочий. 5 жертв в Киеве, вернулся в Балашиху — ещё 5 в Измайловском парке. Не смог уйти с привычной территории.",
    sentence: "Пожизненное заключение",
    photo:
      "https://upload.wikimedia.org/wikipedia/ru/e/e2/%D0%9E%D0%BB%D0%B5%D0%B3_%D0%9A%D1%83%D0%B7%D0%BD%D0%B5%D1%86%D0%BE%D0%B2_%28%D1%81%D0%B5%D1%80%D0%B8%D0%B9%D0%BD%D1%8B%D0%B9_%D1%83%D0%B1%D0%B8%D0%B9%D1%86%D0%B0%29.png",
  },
  {
    id: 7,
    name: "Андрей Евсеев",
    nickname: "Таганский маньяк",
    years: "1974–1977",
    victims: 9,
    address: "Таганский район",
    district: "Таганский",
    coords: [37.6597, 55.7392],
    description:
      "Слесарь. Выбирал женщин в красной одежде. 3 нападения за 55 минут на Таганской площади. 9 убийств, 18 покушений.",
    sentence: "Расстрелян",
    photo:
      "https://upload.wikimedia.org/wikipedia/ru/4/4c/Evseev.png",
  },
  {
    id: 8,
    name: "Владимир Белов",
    nickname: "Ховринский маньяк",
    years: "2001–2002",
    victims: 8,
    address: "Ховрино",
    district: "Ховрино",
    coords: [37.4883, 55.8669],
    description:
      "Действовал с сообщником Шабановым. 8 убийств за 4 месяца на севере Москвы.",
    sentence: "Пожизненное заключение",
  },
  {
    id: 9,
    name: "Юрий Раевский",
    nickname: "Внуковский маньяк",
    years: "1971",
    victims: 4,
    address: "Внуково, м. Динамо",
    district: "Внуково",
    coords: [37.2911, 55.6017],
    description:
      "Беглый заключённый. Дарил жертвам синие розы перед убийством. Убивал в разных городах после побега из колонии.",
    sentence: "Расстрелян",
    photo:
      "https://upload.wikimedia.org/wikipedia/ru/4/45/%D0%AE%D1%80%D0%B8%D0%B9_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B5%D0%B2%D0%B8%D1%87_%D0%A0%D0%B0%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B9.jpg",
  },
  {
    id: 10,
    name: "Валерий Асратян",
    nickname: "Режиссёр",
    years: "1988–1990",
    victims: 2,
    address: "Центр, у Детского мира",
    district: "Центр",
    coords: [37.6247, 55.7608],
    description:
      "Представлялся кинорежиссёром у Детского мира, обещая роли в кино. 2 убийства, 17 изнасилований.",
    sentence: "Расстрелян в 1996",
    photo:
      "https://upload.wikimedia.org/wikipedia/ru/4/4d/%D0%90%D1%81%D1%80%D0%B0%D1%82%D1%8F%D0%BD.jpg",
  },
  {
    id: 11,
    name: "Владимир Миргород",
    nickname: "Аккуратный душитель",
    years: "2000–2004",
    victims: 33,
    address: "Север Москвы",
    district: "САО",
    coords: [37.5308, 55.8378],
    description:
      "Разнорабочий. Душил женщин в северных районах столицы. 16 жертв по первому делу, 17 по второму.",
    sentence: "Два пожизненных срока",
    photo:
      "https://upload.wikimedia.org/wikipedia/ru/1/1e/%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9C%D0%B8%D1%80%D0%B3%D0%BE%D1%80%D0%BE%D0%B4.jpeg",
  },
  {
    id: 12,
    name: "Сергей Седов",
    nickname: "Сокольнический маньяк",
    years: "1998–1999",
    victims: 6,
    address: "Сокольники",
    district: "Сокольники",
    coords: [37.6789, 55.7897],
    description:
      "Убивал в парке Сокольники рядом с домом. Классический пример «охоты рядом с норой».",
    sentence: "Невменяем. Принудительное лечение",
    photo:
      "https://upload.wikimedia.org/wikipedia/ru/a/aa/Sedov_Sergey.jpg",
  },
  {
    id: 13,
    name: "Мария Петрова",
    nickname: "Зюзинская маньячка",
    years: "2002",
    victims: 2,
    address: "Зюзино",
    district: "Зюзино",
    coords: [37.5656, 55.6631],
    description:
      "Учитель физкультуры. Резала горло мужчинам. Одна из редких женщин-серийных убийц в России.",
    sentence: "Невменяема. Бессрочное принудительное лечение",
  },
  {
    id: 15,
    name: "Братья Сидоровы",
    nickname: "Уличные маньяки",
    years: "2013",
    victims: 6,
    address: "Орехово-Борисово",
    district: "Орехово-Борисово",
    coords: [37.7247, 55.6108],
    description:
      "Вячеслав и Дмитрий. Действовали под влиянием идеолога Славнова. Заявляли о 36 жертвах.",
    sentence: "Оба — пожизненное заключение",
  },
  {
    id: 16,
    name: "Борис Гусаков",
    nickname: "",
    years: "1963–1968",
    victims: 6,
    address: "Салтыковка",
    district: "Балашиха",
    coords: [37.9478, 55.7561],
    description:
      "6 убийств, 15 нападений в Салтыковке, Люберцах и центре Москвы.",
    sentence: "Расстрелян",
    photo:
      "https://upload.wikimedia.org/wikipedia/ru/5/57/Gusakov.png",
  },
  {
    id: 17,
    name: "Виктор Малюк",
    nickname: "Убийца по объявлениям",
    years: "2000–2001",
    victims: 4,
    address: "Стартовая улица",
    district: "САО",
    coords: [37.5608, 55.8178],
    description:
      "Притворялся покупателем. Приезжал «посмотреть товар» по объявлениям — и убивал продавцов.",
    sentence: "Пожизненное. Повесился в камере в 2004",
    photo:
      "https://upload.wikimedia.org/wikipedia/ru/7/77/Malyuk.png",
  },
  {
    id: 18,
    name: "Алексей Малаев",
    nickname: "Измайловский маньяк",
    years: "2007",
    victims: 1,
    address: "Парковые улицы",
    district: "Измайлово",
    coords: [37.7903, 55.7987],
    description:
      "Наркозависимый, безработный. Жил и грабил на одной улице. 1 убийство + 11 грабежей за январь 2007.",
    sentence: "15 лет лишения свободы",
  },
  {
    id: 19,
    name: "Владимир Кузьмин",
    nickname: "Царицынский маньяк",
    years: "1997",
    victims: 7,
    address: "Борисовские Пруды",
    district: "Царицыно",
    coords: [37.7547, 55.6308],
    description:
      "Трижды судим ранее. Охотился у интерната на юге Москвы. Минимум 7 жертв за одно лето.",
    sentence: "Пожизненное заключение",
    photo:
      "https://upload.wikimedia.org/wikipedia/ru/c/c1/Vladimir_Kuzmin_%28serial_killer%29.jpg",
  },
  {
    id: 20,
    name: "Анатолий Бирюков",
    nickname: "Охотник за младенцами",
    years: "1977",
    victims: 5,
    address: "Москва, Чехов",
    district: "ЮАО",
    coords: [37.6347, 55.6708],
    description:
      "Слесарь, сын Героя СССР генерал-лейтенанта. Похищал и убивал грудных детей. Министр МВД Щёлоков докладывал лично Брежневу.",
    sentence: "Расстрелян в 1979",
    photo:
      "https://upload.wikimedia.org/wikipedia/ru/3/3d/%D0%91%D0%B8%D1%80%D1%8E%D0%BA%D0%BE%D0%B2_%D0%90%D0%BD%D0%B0%D1%82%D0%BE%D0%BB%D0%B8%D0%B9_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B5%D0%B2%D0%B8%D1%87.png",
  },
  {
    id: 21,
    name: "Николай Шестаков",
    nickname: "Люберецкий маньяк",
    years: "1975–1976",
    victims: 12,
    address: "Люберцы, Балашиха",
    district: "Люберцы",
    coords: [37.8944, 55.6767],
    description:
      "Рабочий-маляр. С двумя сообщниками убил 12 человек кувалдой у автобусных остановок. Грабил и насиловал жертв.",
    sentence: "Расстрелян в 1978",
    photo:
      "https://upload.wikimedia.org/wikipedia/ru/f/fd/%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B9_%D0%9F%D0%BE%D1%80%D1%84%D0%B8%D1%80%D1%8C%D0%B5%D0%B2%D0%B8%D1%87_%D0%A8%D0%B5%D1%81%D1%82%D0%B0%D0%BA%D0%BE%D0%B2.jpg",
  },
  {
    id: 22,
    name: "Иван Продан",
    nickname: "Домодедовский упырь",
    years: "1998–1999",
    victims: 5,
    address: "Домодедово, ст. Востряково",
    district: "Домодедово",
    coords: [37.7636, 55.4397],
    description:
      "Строитель из Молдавии. Нападал ночью у ж/д станций, насиловал и убивал. Признался в 58 нападениях. Единственный серийный убийца в РФ, не получивший пожизненное.",
    sentence: "25 лет. Освободился в 2024",
    photo:
      "https://upload.wikimedia.org/wikipedia/ru/d/da/Prodan.png",
  },
  {
    id: 23,
    name: "Александр Ершов",
    nickname: "Лосиноостровский маньяк",
    years: "1997",
    victims: 4,
    address: "Лосиный Остров",
    district: "Лосиноостровский",
    coords: [37.7789, 55.8678],
    description:
      "На момент убийств — 16 лет, один из самых юных серийных убийц России. Убивал в лесопарке Лосиный Остров.",
    sentence: "Признан невменяемым. Принудительное лечение",
  },
  {
    id: 24,
    name: "Денис Писчиков",
    nickname: "Уральский Раскольников",
    years: "2002–2003",
    victims: 17,
    address: "Восток МО, Владимирская обл.",
    district: "Орехово-Зуево",
    coords: [38.72, 55.91],
    description:
      "Бродяга из Свердловской области. Убивал одиноких стариков топором ради мелкого грабежа — заходил в дома и просил воды.",
    sentence: "Пожизненное заключение (дважды)",
    photo:
      "https://upload.wikimedia.org/wikipedia/ru/5/5e/Pischikov.png",
  },
  {
    id: 25,
    name: "Василий Хилецкий",
    nickname: "",
    years: "2006–2009",
    victims: 4,
    address: "Домодедово, Подольск",
    district: "Домодедово",
    coords: [37.76, 55.44],
    description:
      "Бродяга из Крыма. Убивал женщин топором после совместного распития. За его убийства осудили двух невиновных — признания выбили под пытками.",
    sentence: "Пожизненное заключение",
    photo:
      "https://upload.wikimedia.org/wikipedia/ru/2/26/Hilec.jpg",
  },
  {
    id: 26,
    name: "Андрей Алёшин",
    nickname: "Буратино",
    years: "2002",
    victims: 4,
    address: "Ярославское шоссе, Бабушкинский",
    district: "Бабушкинский",
    coords: [37.66, 55.86],
    description:
      "Криминальный элемент. За 8 дней убил 4 человек ради денег. Разоблачён только через 20 лет по ДНК. Ошибка ИИ при распознавании лиц привела к аресту невиновного учёного.",
    sentence: "13 лет (срок давности по части эпизодов)",
    photo:
      "https://upload.wikimedia.org/wikipedia/ru/b/b4/Andrew_Aleshin_serial_killer.jpg",
  },
];
