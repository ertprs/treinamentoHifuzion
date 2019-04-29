const clientes = [
  {
    id: 1,
    type_person_display: 'Public',
    name: 'William Galleti',
    address: 'Av. Curimba, 1140 - Centro\nSapezal - MT\n78365-000',
    email: 'william.galleti@gmail.com',
    phone: '65999448004',
    second_phone: null,
    type_person: 2
  },
  {
    id: 2,
    type_person_display: 'Public',
    name: 'teste',
    address: 'teste',
    email: 'odasko@email.com',
    phone: 'dasojidas',
    second_phone: null,
    type_person: 2
  },
  {
    id: 3,
    type_person_display: 'Public',
    name: 'teste',
    address: 'la em casa',
    email: 'dasdsa@email.com',
    phone: '999999',
    second_phone: null,
    type_person: 2
  }
]

const state = {
  clientes: []
}

const mutations = {
  CLIENTES (state, payload = null) {
    state.clientes = clientes
  }
}

export default { state, mutations }
