import Route from '@ioc:Adonis/Core/Route'

Route.get('vehiclemodels/:brandId', 'VehicleModelsController.index')
Route.get('vehiclemodels/:brandId/:id', 'VehicleModelsController.show')

Route.post('vehiclemodels', 'VehicleModelsController.store')

Route.put('vehiclemodels/:brandId/:id', 'VehicleModelsController.update')
Route.patch('vehiclemodels/:brandId/:id', 'VehicleModelsController.softDelete')

Route.delete('vehiclemodels/:brandId/:id', 'VehicleModelsController.delete')
