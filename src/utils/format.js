import { dayjs } from 'element-plus'

export const formatDate = (time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
