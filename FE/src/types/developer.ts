import { levels } from 'utils/const'

export interface IDeveloper {
  createdAt: Date
  hiredAt: Date | null
  firstName: string
  lastName: string
  position: `${TPositionLevel} ${TPositionTitle} Developer`
  id: string
  testTaskPeriod?: { start: Date; end: Date }
  hiringStage: EHiringStages
  color?: string
}

export enum EPositionLevelPriority {
  Trainee = 0,
  Junior = 1,
  Middle = 2,
  Senior = 3,
}

export type TPositionLevel = (typeof levels)[number] | any
export type TPositionTitle = 'Front-end' | 'Back-end' | 'Full-stack' | 'Software'

export enum EHiringStages {
  newSubmission = 'New Submission',
  testTask = 'Test Task',
  interview = 'Interview',
  hired = 'Hired',
  failed = 'Failed',
}
