import Route from '@ioc:Adonis/Core/Route'

Route.get('cities/:stateId', 'CitiesController.index')
Route.get('cities/:stateId/:id', 'CitiesController.show')

Route.post('cities/:stateId', 'CitiesController.store')

Route.put('cities/:stateId/:id', 'CitiesController.update')

Route.delete('cities/:stateId/:id', 'CitiesController.delete')
