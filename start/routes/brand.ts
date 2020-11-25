import Route from '@ioc:Adonis/Core/Route'

Route.get('brands', 'BrandsController.index')
Route.get('brands/:id', 'BrandsController.show')

Route.post('brands', 'BrandsController.store')

Route.put('brands/:id', 'BrandsController.update')

Route.delete('brands/:id', 'BrandsController.delete')
