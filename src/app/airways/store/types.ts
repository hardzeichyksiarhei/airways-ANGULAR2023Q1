import { AirportsState } from './airports/airports.reducer'
import { SearchState } from './search/search.reducer'
import { SettingsState } from './settings/settings.reducer'
import { AuthState } from './auth/auth.reducer'

export interface AirwayState {
  settings: SettingsState
  airports: AirportsState
  search: SearchState
  auth: AuthState
}
