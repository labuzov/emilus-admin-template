import fetch from 'auth/FetchInterceptor';

const CustomersService = {}

CustomersService.getAll = function (params) {
  return fetch({
    url: '/users',
    method: 'get',
    params
  })
}

CustomersService.getById = function (id, params) {
  return fetch({
    url: '/users',
    method: 'get',
    params: {
      id,
      ...params
    }
  })
}

CustomersService.update = function (id, data) {
  return fetch({
    url: '/users/' + id,
    method: 'put',
    data
  })
}

export default CustomersService;