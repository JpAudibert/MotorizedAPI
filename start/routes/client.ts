import Route from '@ioc:Adonis/Core/Route'

Route.get('clients', 'ClientsController.index')
Route.get('clients/:id', 'ClientsController.show')

Route.post('clients', 'ClientsController.store')

Route.put('clients/:id', 'ClientsController.update')
Route.patch('clients/:id', 'ClientsController.softDelete')

Route.delete('clients/:id', 'ClientsController.delete')
