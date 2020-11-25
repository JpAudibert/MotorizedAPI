import Route from '@ioc:Adonis/Core/Route'

Route.get('states', 'StatesController.index')
Route.get('states/:id', 'StatesController.show')

Route.post('states', 'StatesController.store')

Route.put('states/:id', 'StatesController.update')

Route.delete('states/:id', 'StatesController.delete')
