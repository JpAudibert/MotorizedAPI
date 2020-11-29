import Route from '@ioc:Adonis/Core/Route'

Route.get('logs', 'LogsController.index')
Route.get('logs/:id', 'LogsController.show')

Route.post('logs', 'LogsController.store')

Route.put('logs/:id', 'LogsController.update')

Route.delete('logs/:id', 'LogsController.delete')
