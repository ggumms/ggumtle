export enum TimeUnitType {
	min = '분',
	hour = '시간',
	week = '주',
	month = '달',
	year = '년',
}

export type AlarmType =
	| 'follow'
	| 'likeCommentBucket'
	| 'likeCommentReview'
	| 'join'
	| 'remind'
	| 'bucket'
	| 'review'
	| 'bucketAchieve'
	| 'commentReview'
	| 'commentBucket'

export interface IAlarm {
	alarmId: number
	sender: string
	senderProfileImage: string
	timeUnit: 'min' | 'hour' | 'week' | 'month' | 'year'
	time: number
	isRead: boolean
	context: string | null
	type: AlarmType
	dataId: number
}