import Route from '@ioc:Adonis/Core/Route'

Route.get('vehicles', 'VehiclesController.index')
Route.get('vehicles/:id', 'VehiclesController.show')

Route.post('vehicles', 'VehiclesController.store')

Route.put('vehicles/:id', 'VehiclesController.update')
Route.patch('vehicles/:id', 'VehiclesController.softDelete')

Route.delete('vehicles/:id', 'VehiclesController.delete')
