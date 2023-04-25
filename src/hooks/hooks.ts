import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { StateRoot, AppDispatch } from '../app/store'


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StateRoot> = useSelector