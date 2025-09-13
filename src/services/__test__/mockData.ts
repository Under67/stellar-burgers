export const mockFetchUserOrders = [
  {
    _id: '68a2f81a673086001ba835e0',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный бессмертный spicy бургер',
    createdAt: '2025-08-18T09:53:30.059Z',
    updatedAt: '2025-08-18T09:53:30.983Z',
    number: 86735
  },
  {
    _id: '68a435cb673086001ba837e0',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa094a',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный астероидный spicy бургер',
    createdAt: '2025-08-19T08:28:59.441Z',
    updatedAt: '2025-08-19T08:29:00.361Z',
    number: 86781
  }
];

export const mockFetchOrder = [
  '643d69a5c3f7b9001cfa093d',
  '643d69a5c3f7b9001cfa093e',
  '643d69a5c3f7b9001cfa0941',
  '643d69a5c3f7b9001cfa093d'
];

export const mockFetchResponseOrder = {
  success: true,
  name: 'Флюоресцентный люминесцентный био-марсианский бургер',
  order: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      }
    ],
    _id: '68c52bc0673086001ba88078',
    owner: {
      name: 'test',
      email: 'test123@mail.ru',
      createdAt: '2025-08-17T09:02:08.940Z',
      updatedAt: '2025-09-12T15:51:35.384Z'
    },
    status: 'done',
    name: 'Флюоресцентный люминесцентный био-марсианский бургер',
    createdAt: '2025-09-13T08:30:56.908Z',
    updatedAt: '2025-09-13T08:30:58.025Z',
    number: 88654,
    price: 3388
  }
};

export const mockFetchOrderByNumberId = 88660;

export const mockFetchResponseOrderByNumber = {
  success: true,
  orders: [
    {
      _id: '68c5357f673086001ba88096',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      owner: '68a19a90673086001ba83412',
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2025-09-13T09:12:31.588Z',
      updatedAt: '2025-09-13T09:12:32.510Z',
      number: 88660,
      __v: 0
    }
  ]
};

export const mockFetchIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    __v: 0
  }
];

export const mockFetchFeeds = {
  success: true,
  orders: [
    {
      _id: '68c4310f673086001ba87e1e',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-09-12T14:41:19.011Z',
      updatedAt: '2025-09-12T14:41:23.207Z',
      number: 88613
    }
  ],
  total: 88287,
  totalToday: 71
};

export const mockLoginUser = {
  email: 'test123@mail.ru',
  password: 'test123'
};

export const mockLoginUserResponse = {
  success: true,
  accessToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTE5YTkwNjczMDg2MDAxYmE4MzQxMiIsImlhdCI6MTc1Nzc3MTU0NSwiZXhwIjoxNzU3NzcyNzQ1fQ.Yp2lPXKOJcPri0sg3LVb1AbPMj7yRK47IKgxIhTDyA4',
  refreshToken:
    '458a72a552f732ebeb8e324080c60786bd7ee571536a372477ba81613292452525ebf40972c57f74',
  user: {
    email: 'test123@mail.ru',
    name: 'test'
  }
};

export const mockRegisterUser = {
  email: 'test123@mail.ru',
  password: 'test123',
  name: 'test'
};

export const mockRegisterUserResponse = {
  success: true,
  user: {
    email: 'test123@mail.ru',
    name: 'test'
  },
  accessToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzU3YjljNjczMDg2MDAxYmE4ODE0MiIsImlhdCI6MTc1Nzc3MjcwMCwiZXhwIjoxNzU3NzczOTAwfQ.C3LMyL-eoQuFl-h6BCx6EUkin0rihCIxdo6FAWcOSIE',
  refreshToken:
    '436437becad5092bab67dd18a9bd97cd1abe13481a134c9d0ead807325f994c4ae71c4a64bcbef04'
};

export const mockFetchUserResponse = {
  success: true,
  user: {
    email: 'test123@mail.ru',
    name: 'test'
  }
};

export const mockRefreshUserResponse = {
  success: true,
  accessToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTE5YTkwNjczMDg2MDAxYmE4MzQxMiIsImlhdCI6MTc1Nzc3NDQ3MiwiZXhwIjoxNzU3Nzc1NjcyfQ.9r-hnImkcMdled686nsk4DRJm5nsIrbTxlf03dIRml8',
  refreshToken:
    'bbb9b1437f0fba1a516a7dd4bd4a22eda1a4a112ed9948cdb4228b2d73f975f67fc72075a4bac05a'
};

export const mockLogoutUserResponse = {
  success: true,
  message: 'Successful logout'
};

export const mockUpdateUser = {
  name: 'test1',
  email: 'test123@mail.ru',
  password: ''
};

export const mockUpdateUserResponse = {
  success: true,
  user: {
    email: 'test123@mail.ru',
    name: 'test1'
  }
};
