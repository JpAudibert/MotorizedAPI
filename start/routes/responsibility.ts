import Route from '@ioc:Adonis/Core/Route'

Route.get('responsibilities', 'ResponsibilitiesController.index')
Route.get('responsibilities/:id', 'ResponsibilitiesController.show')

Route.post('responsibilities', 'ResponsibilitiesController.store')

Route.put('responsibilities/:id', 'ResponsibilitiesController.update')

Route.delete('responsibilities/:id', 'ResponsibilitiesController.delete')
