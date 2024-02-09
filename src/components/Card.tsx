import React, { useMemo } from 'react'

import { Draggable } from 'react-beautiful-dnd'

import useIsLightColor from 'hooks/useIsLightColor'
import { IDeveloper } from 'types/developer'

import dayjs from 'dayjs'

interface IProps {
  developer: IDeveloper
  index: number
}

const defaultColor = '#FFBBA6'

const cutName = (name: string, limit = 6) => (name.length > limit ? name[0] + '.' : name)

const Card: React.FC<IProps> = ({ developer, index }) => {
  const avatarColor = developer.color ?? defaultColor

  const visibleUserName = useMemo<string>(() => {
    const visibleFName = cutName(developer.firstName)

    const visibleLName = cutName(developer.lastName, 10)
    return visibleFName + ' ' + visibleLName
  }, [developer.firstName, developer.lastName])

  const isLightAvatar = useMemo(() => useIsLightColor(avatarColor), [developer.color])

  return (
    <Draggable draggableId={developer.id} index={index} key={'draggableId-' + developer.id}>
      {provided => (
        <div
          className="rounded-md bg-[#fff]"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
        >
          <div className="pointer-events-none flex gap-3 border-b-2 border-solid border-slate-200 p-3">
            <div
              style={{ background: avatarColor, color: isLightAvatar ? '#3f4148' : '#f6f7ff' }}
              className="flex h-10 w-10 items-center justify-center rounded-full	"
            >
              {(developer.firstName[0] + developer.lastName[0]).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <label title={developer.firstName + ' ' + developer.lastName}>
                {visibleUserName}
              </label>
              <span className="text-xs">{developer.position}</span>
            </div>
          </div>
          <div className="pointer-events-none flex flex-col gap-y-2 p-3">
            <span className="text-sm">
              Submitted at: {dayjs(developer.createdAt).format('DD MMMM YYYY')}
            </span>
            {developer.hiredAt && (
              <span className="text-sm">
                Hired at: {dayjs(developer.hiredAt).format('DD MMMM YYYY')}
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}
export default Card
