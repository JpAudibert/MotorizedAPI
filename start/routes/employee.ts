import Route from '@ioc:Adonis/Core/Route'

Route.get('employees', 'EmployeesController.index')
Route.get('employees/:id', 'EmployeesController.show')

Route.post('employees', 'EmployeesController.store')

Route.put('employees/:id', 'EmployeesController.update')
Route.patch('employees/:id', 'EmployeesController.softDelete')

Route.delete('employees/:id', 'EmployeesController.delete')
