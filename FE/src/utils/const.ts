import { EHiringStages, IDeveloper } from 'types/developer'

export const levels = ['Trainee', 'Junior', 'Middle', 'Senior'] as const

export const developers: IDeveloper[] = [
  {
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    hiredAt: null,
    position: 'Trainee Back-end Developer',
    id: 'id' + Math.random().toString(16).slice(2),
    lastName: 'Petrik I',
    firstName: 'Petro',
    hiringStage: EHiringStages.newSubmission,
    color: '#D1D1D1',
  },
  {
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    hiredAt: null,
    position: 'Junior Back-end Developer',
    id: 'id' + Math.random().toString(16).slice(2),
    lastName: 'Petrik II',
    firstName: 'Petro',
    hiringStage: EHiringStages.newSubmission,
    color: '#CFCEEB',
  },
  {
    createdAt: new Date(),
    hiredAt: null,
    position: 'Middle Front-end Developer',
    id: 'id' + Math.random().toString(16).slice(2),
    lastName: 'React Super Developer 228',
    firstName: 'Den',
    hiringStage: EHiringStages.newSubmission,
    color: '#FFBBA6',
  },

  {
    color: '#94D7DB',
    createdAt: new Date(),
    hiredAt: null,
    position: 'Senior Full-stack Developer',
    id: 'id' + Math.random().toString(16).slice(2),
    lastName: 'Stone',
    firstName: 'Alex',
    hiringStage: EHiringStages.newSubmission,
  },
]
