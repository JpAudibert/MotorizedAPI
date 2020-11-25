import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import State from 'App/Models/State'
import stateProvider from 'App/Services/stateService'

interface RequestState {
  nome: string
  sigla: string
}

export default class StateSeeder extends BaseSeeder {
  public async run() {
    const urlStates = `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`

    const { data: states } = await stateProvider.get<RequestState[]>(urlStates)

    const baseStates = await State.createMany(
      states.map((state) => ({
        name: state.nome,
        abreviation: state.sigla,
      }))
    )
  }
}
