import Route from '@ioc:Adonis/Core/Route'

Route.get('contracts', 'ContractsController.index')
Route.get('contracts/:id', 'ContractsController.show')

Route.post('contracts', 'ContractsController.store')

Route.put('contracts/:id', 'ContractsController.update')
Route.patch('contracts/:id', 'ContractsController.softDelete')

Route.delete('contracts/:id', 'ContractsController.delete')
