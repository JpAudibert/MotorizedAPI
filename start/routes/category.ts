import Route from '@ioc:Adonis/Core/Route'

Route.get('categories', 'CategoriesController.index')
Route.get('categories/:id', 'CategoriesController.show')

Route.post('categories', 'CategoriesController.store')

Route.put('categories/:id', 'CategoriesController.update')

Route.delete('categories/:id', 'CategoriesController.delete')
