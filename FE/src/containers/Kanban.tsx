import { useState, useEffect } from 'react'

import { DragDropContext, DropResult, DraggableLocation } from 'react-beautiful-dnd'

import { EHiringStages, IDeveloper } from 'types'
import { developers as defaultDevelopers } from 'utils/const'

import Column from 'components/Column'

import * as _ from 'lodash-es'

const Kanban = () => {
  const [developers, setDevelopers] = useState<{ [key in string]: IDeveloper[] }>({})

  useEffect(() => {
    setDevelopers(
      Object.fromEntries(
        Object.values(EHiringStages).map(hiringStage => [
          hiringStage,
          defaultDevelopers.filter(developer => developer.hiringStage === hiringStage),
        ])
      )
    )
  }, [defaultDevelopers])

  const handleSubmissionDrag = (draggableMetaData: DropResult) => {
    if (
      !draggableMetaData.destination ||
      _.isEqual(draggableMetaData.destination, draggableMetaData.source)
    )
      return

    const newDraggableMetaData: Omit<DropResult, 'destination' | 'source'> & {
      destination: DraggableLocation
      source: DraggableLocation
    } = draggableMetaData as any

    if (draggableMetaData.destination.droppableId === draggableMetaData.source.droppableId)
      return setDevelopers(currentDevelopers => {
        const subsArr =
          _.cloneDeep(currentDevelopers[newDraggableMetaData.destination.droppableId]) ?? []

        const removed = subsArr.splice(draggableMetaData.source.index, 1)
        subsArr.splice(newDraggableMetaData.destination.index, 0, ...removed)
        return { ...currentDevelopers, [newDraggableMetaData.destination.droppableId]: subsArr }
      })

    const targetDeveloper: IDeveloper | undefined = developers[
      newDraggableMetaData.source.droppableId
    ].find(developer => developer.id === newDraggableMetaData.draggableId)

    if (draggableMetaData.destination.droppableId === EHiringStages.hired && targetDeveloper)
      targetDeveloper['hiredAt'] = new Date()

    if (
      draggableMetaData.destination.droppableId !== EHiringStages.hired &&
      targetDeveloper?.hiredAt
    )
      targetDeveloper['hiredAt'] = null

    setDevelopers(currentDevelopers => {
      const sourceDevelopers = _.cloneDeep(
        currentDevelopers[newDraggableMetaData.source.droppableId]
      )
      const destinationDevelopers = _.cloneDeep(
        currentDevelopers[newDraggableMetaData.destination.droppableId]
      )
      const removed = sourceDevelopers.splice(newDraggableMetaData.source.index, 1)

      destinationDevelopers.splice(newDraggableMetaData.destination.index, 0, ...removed)

      return {
        ...currentDevelopers,
        [newDraggableMetaData.source.droppableId]: sourceDevelopers,
        [newDraggableMetaData.destination.droppableId]: destinationDevelopers,
      }
    })
  }

  return (
    <div className="h-full px-8 py-4">
      <h1 className="mb-10 text-center text-xl">Kanban board like Jira</h1>
      <div className="flex h-full gap-x-4">
        <DragDropContext onDragEnd={handleSubmissionDrag}>
          {!_.isEmpty(developers) ? (
            Object.values(EHiringStages).map((hiringStage, index) => (
              <Column
                hiringStage={hiringStage}
                index={index}
                developers={developers[hiringStage]}
              />
            ))
          ) : (
            <span>NO DATA</span>
          )}
        </DragDropContext>{' '}
      </div>
    </div>
  )
}
export default Kanban
