import React, { useEffect, useMemo, useState } from 'react'

import * as _ from 'lodash-es'

import { levels } from 'utils/const'
import { EHiringStages, IDeveloper, EPositionLevelPriority } from 'types/developer'

import { Droppable } from 'react-beautiful-dnd'

import { Dropdown } from 'antd'

import Card from './Card'

interface IProps {
  hiringStage: EHiringStages
  index: number
  developers: IDeveloper[]
}

enum ESort {
  newest = 'newest',
  oldest = 'oldest',
  position = 'position',
}

const getDeveloperLevel = (developer: IDeveloper): number => {
  const level = levels.find(level => developer.position.includes(level))

  if (!level) return -1
  return EPositionLevelPriority[level]
}

const sortDeveloperByPositionLevel = (a: IDeveloper, b: IDeveloper) => {
  return getDeveloperLevel(b) - getDeveloperLevel(a)
}
const sortDeveloperByDate =
  (direction: 'newest' | 'oldest' = 'newest') =>
  (a: IDeveloper, b: IDeveloper) =>
    direction === 'newest'
      ? b.createdAt.getTime() - a.createdAt.getTime()
      : a.createdAt.getTime() - b.createdAt.getTime()

const sortDevelopers = (developers: IDeveloper[], sortCallback: any): IDeveloper[] => {
  return _.cloneDeep(developers).sort(sortCallback)
}

const sortCase = {
  [ESort.newest]: sortDeveloperByDate('newest'),
  [ESort.oldest]: sortDeveloperByDate('oldest'),
  [ESort.position]: sortDeveloperByPositionLevel,
}

const Column: React.FC<IProps> = ({ hiringStage, developers, index }) => {
  const [currentDevelopers, setCurrentDevelopers] = useState<IDeveloper[]>(developers)
  const [sortState, setSortState] = useState<ESort>()

  const onClickSort = (key: ESort) =>
    setSortState(sortStateValue => {
      if (sortStateValue === key) {
        resetSort()
        return
      }
      return key
    })

  const resetSort = () => {
    setSortState(undefined)
    setCurrentDevelopers(developers)
  }

  useEffect(() => {
    setCurrentDevelopers(developers)
    sortState && setSortState(undefined)
  }, [developers])

  useEffect(() => {
    sortState && setCurrentDevelopers(sortDevelopers(developers, sortCase[sortState]))
  }, [sortState])

  return (
    <div className="flex min-w-60 min-w-[279px] flex-col gap-y-5">
      <div className="flex items-center justify-between">
        {hiringStage}
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <span className="flex justify-between gap-x-4">
                    Sort By Newest{' '}
                    {sortState === ESort.newest && (
                      <button onClick={resetSort}>
                        <i className="fa-regular fa-circle-xmark"></i>
                      </button>
                    )}
                  </span>
                ),
                key: ESort.newest,
              },
              {
                label: (
                  <span className="flex justify-between gap-x-4">
                    Sort By Oldest
                    {sortState === ESort.oldest && (
                      <button onClick={resetSort} className="z-50">
                        <i className="fa-regular fa-circle-xmark"></i>
                      </button>
                    )}
                  </span>
                ),
                key: ESort.oldest,
              },
              {
                label: (
                  <span className="flex justify-between gap-x-4">
                    Sort By Position Level
                    {sortState === ESort.position && (
                      <button onClick={resetSort}>
                        <i className="fa-regular fa-circle-xmark"></i>
                      </button>
                    )}
                  </span>
                ),
                key: ESort.position,
              },
            ],
            onClick: info => onClickSort(info.key as ESort),
          }}
        >
          <span className="cursor-pointer">
            <i className="fa-regular fa-ellipsis"></i>
          </span>
        </Dropdown>
      </div>

      <Droppable droppableId={hiringStage} key={'droppableId-' + index}>
        {provided => (
          <div
            className="flex h-full  flex-col gap-y-2 rounded-md bg-[#f4f4f4] p-2 shadow-3xl"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {currentDevelopers?.map((developer, index) => (
              <Card developer={developer} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
export default Column
