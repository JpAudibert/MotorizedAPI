import Route from '@ioc:Adonis/Core/Route'

Route.get('vehiclebookings', 'VehicleBookingsController.index')
Route.get('vehiclebookings/:id', 'VehicleBookingsController.show')

Route.post('vehiclebookings', 'VehicleBookingsController.store')

Route.put('vehiclebookings/:id', 'VehicleBookingsController.update')
Route.patch('vehiclebookings/:id', 'VehicleBookingsController.softDelete')

Route.delete('vehiclebookings/:id', 'VehicleBookingsController.delete')
