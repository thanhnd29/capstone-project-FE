import { BaseResponse, EnumListItem, ResponseList } from '../models/common';
import { PatrolSchedule, PatrolScheduleStatus } from '../models/patrol-schedule';
import { Colors } from '../utils/colors.helper';
import http from './http';

export interface ICreatePatrolScheduleDto extends Pick<PatrolSchedule, 'classId' | 'supervisorId' | 'teacherId' | 'from' | 'to'> {}
export interface IUpdatePatrolScheduleDto extends Pick<PatrolSchedule, 'classId' | 'supervisorId' | 'teacherId' | 'from' | 'to' | 'scheduleId'> {}

const baseUrl = '/patrol-schedules';

export const patrolScheduleApi = {
    create: async (dto: ICreatePatrolScheduleDto) => {
        const { data } = await http.post<PatrolSchedule>(`${baseUrl}`, dto);

        return data;
    },

    update: async (dto: IUpdatePatrolScheduleDto) => {
        const { data } = await http.put<PatrolSchedule>(`${baseUrl}`, dto);

        return data;
    },
    getAll: async () => {
        const { data } = await http.get<ResponseList<PatrolSchedule>>(`${baseUrl}`, {
            params: {
                sortOrder: 'desc',
            },
        });

        return data.data || [];
    },
    getById: async (id: number) => {
        const { data } = await http.get<BaseResponse<PatrolSchedule>>(`${baseUrl}/${id}`);

        return data.data;
    },
    delete: async (id: number) => {
        await http.delete(`${baseUrl}/${id}`);
    },
    getEnumStatuses: async (search?: string) => {
        return [
            {
                color: Colors.YELLOW,
                id: PatrolScheduleStatus.ONGOING,
                label: 'Ongoing',
                name: 'Ongoing',
                slug: 'ongoing',
                value: PatrolScheduleStatus.ONGOING,
            },
            {
                color: Colors.GREEN,
                id: PatrolScheduleStatus.FINISHED,
                label: 'Finished',
                name: 'Finished',
                slug: 'finished',
                value: PatrolScheduleStatus.FINISHED,
            },
        ] as EnumListItem[];
    },
};
