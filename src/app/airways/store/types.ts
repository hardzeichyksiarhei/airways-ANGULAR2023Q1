import { CountriesState } from './countries/countries.reducer'
import { SearchState } from './search/search.reducer'
import { SettingsState } from './settings/settings.reducer'

export interface AirwayState {
  settings: SettingsState
  countries: CountriesState
  search: SearchState
}
