
import { isValid } from 'date-fns'

import type { ActivityType } from '@src/types'



const activityListByCourse = (activityList: ActivityType[], id: string) => {
    if (id === '-1') { // 전체 코스의 아이템을 불러올 경우
      return activityList;
    }
  
    return activityList.filter(activity => activity.courseId === id); // filter로 courseId 와 같은 아이템만 걸러서 반환
  }
  const sortAcitivityList = (activityList: ActivityType[]) => {
    const [endAtList, noEndAtList] = activityList.reduce<[ActivityType[], ActivityType[]]>( //기한이 있는 아이템과 제출기한이 없는 아이템을 분류하는 작업
      (acc, cur) => {
        if (isValid(new Date(cur.endAt))) { // 만약 기한이 있다면 , cur원소를 acc[0](endAtList)과 합침
          return [[...acc[0], cur], acc[1]];
        }
  
        return [acc[0], [...acc[1], cur]]; // 만약 기한이 없다면, cur원소를 noEndAtList(acc[1])에 합침
      },
      [[], []], // reduce 초기값 빈 배열 2개
    )
  
    const sortedList = endAtList.sort((a, b) => { // sort로 기한이 적은 순으로 정렬
      return new Date(a.endAt).getTime() - new Date(b.endAt).getTime();
    })
  
    return [...sortedList, ...noEndAtList];
  }
  const activityListBySubmitted = (activityList: ActivityType[]) => {
    return activityList.filter(activity => !activity.hasSubmitted); // 제출하지 않은 과제만 필터링
  }
  type PipeFunction = (activities: ActivityType[]) => ActivityType[];
  

  function pipe(fn1: PipeFunction, fn2: PipeFunction, fn3: PipeFunction): PipeFunction;
  
  function pipe(...fns: Function[]) {
    return (initialValue: any) => fns.reduce((acc, fn) => fn(acc), initialValue);
  }
  const useFilterItem = (
    activityList: ActivityType[],
    selectedCourseId: string,
  ) => {
    return pipe(
      activityList => activityListByCourse(activityList, selectedCourseId),
      activityList => activityListBySubmitted(activityList),
      activityList => sortAcitivityList(activityList),
    )(activityList);
  }
  export default useFilterItem;