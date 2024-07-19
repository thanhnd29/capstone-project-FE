import { EnumListItem, ResponseList } from '../models/common';
import { User, UserStatus } from '../models/user';
import { Colors } from '../utils/colors.helper';
import http from './http';

export interface ILoginUserDto extends Pick<User, 'phone' | 'password'> { }
export interface ICreateUserDto extends Omit<User, 'userId' | 'roleName' | 'adminId' | 'userName' | 'schoolAdminId' | 'roleId' | 'status' | 'schoolName'> { }
export interface IUpdateUserDto extends Omit<User, 'userId' | 'roleName' | 'adminId' | 'userName' | 'schoolAdminId' | 'roleId' | 'status' | 'schoolName'> { }

const baseUrl = '/users';

export const userApi = {
    getAll: async (role?: number) => {
        const { data } = await http.get<ResponseList<User>>(baseUrl, {
            params: {
                sortOrder: 'desc',
            },
        });

        if (role) return data.data.filter((item) => item.roleId === role);

        return data.data;
    },
    getAllAdmin: async () => {
        const { data } = await http.get<ResponseList<User>>(`/admins`, {
            params: {
                sortOrder: 'desc',
            },
        });

        return data.data;
    },
    getBySchool: async (id: number) => {
        const { data } = await http.get<ResponseList<User>>(`${baseUrl}/school/${id}`);

        return data.data;
    },
    getById: async (id: number) => {
        const { data } = await http.get<User>(`${baseUrl}/${id}`);

        return data;
    },
    create: async (dto: ICreateUserDto) => {
        const { data } = await http.post<User>(baseUrl, dto);

        return data;
    },
    createSchoolAdmin: async (dto: ICreateUserDto) => {
        const { data } = await http.post<User>(`${baseUrl}/school_admin`, dto);

        return data;
    },
    update: async (id: string, dto: IUpdateUserDto) => {
        const { data } = await http.put<User>(`${baseUrl}/${id}`, dto);

        return data;
    },
    delete: async (id: string) => {
        await http.delete(`${baseUrl}/${id}`);
    },
    getEnumStatuses: async (search?: string) => {
        const list: EnumListItem[] = [
            {
                color: Colors.GREEN,
                id: UserStatus.ACTIVE,
                label: 'Active',
                name: 'Active',
                slug: UserStatus.ACTIVE,
                value: UserStatus.ACTIVE,
            },
            {
                color: Colors.RED,
                id: UserStatus.INACTIVE,
                label: 'Inactive',
                name: 'Inactive',
                slug: UserStatus.INACTIVE,
                value: UserStatus.INACTIVE,
            },
        ];

        return list;
    },
};