import { AirportsState } from './airports/airports.reducer'
import { SearchState } from './search/search.reducer'
import { SettingsState } from './settings/settings.reducer'

export interface AirwayState {
  settings: SettingsState
  airports: AirportsState
  search: SearchState
}
