export enum AddPlanStepEnum {
  SetInfo,
  SetPlaceAndDate,
  CheckPlan,
}

export enum StoreNameEnum {
  Plan = 'plan',
  Auth = 'auth',
}

export enum DateFormatTypeEnum {
  DateWithDots = 'yyyy.MM.dd',
  DateWithSlash = 'yyyy/MM/dd',
  YearAndMonth = 'yyyy.MM',
  MonthAndDay = 'MM.dd',
}

export enum HttpStatusCodeEnum {
  UnAuthorized = 401,
  Forbbiden = 403,
  NotFound = 404,
  OK = 200,
  Created = 201,
}
