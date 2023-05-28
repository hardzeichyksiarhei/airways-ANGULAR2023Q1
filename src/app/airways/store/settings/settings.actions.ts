import { createAction, props } from '@ngrx/store'
import { IStep } from './settings.reducer'

export const changeCurrency = createAction(
  '[Airway Settings] Change currency',
  props<{ currency: string }>()
)

export const changeDate = createAction(
  '[Airway Settings] Change date',
  props<{ date: string }>()
)

export const changeStep = createAction(
  '[Airway Settings] Change step',
  props<{ step: IStep }>()
)

interface IPartialSlot extends Partial<IStep> {
  key: string
}

export const updateSteps = createAction(
  '[Airway Settings] Update steps',
  props<{ steps: IPartialSlot[] }>()
)
