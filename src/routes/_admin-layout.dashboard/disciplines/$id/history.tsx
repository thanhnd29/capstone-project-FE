import { dashboardApi } from '@/core/api/dashboard.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import TableBuilder from '@/core/components/table/TableBuilder';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useSelector } from 'react-redux';

interface PageProps { }

const Page: React.FunctionComponent<PageProps> = () => {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();

  const { isAdmin, isPrincipal, isSchoolAdmin, isSupervisor, isStudentSupervisor, isTeacher, schoolId, userId } = useSelector<RootState, UserState>(
    (state: RootState) => state.user,
  );

  const violationQuery = useQuery({
    queryKey: ['violation', id],
    queryFn: () => {
      return dashboardApi.getHistoryViolations(id);
    },
  });

  if (violationQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!violationQuery.data) return null;

  return (
    <div className="">
      <TableBuilder
        sourceKey="history-violation"
        title="History Violation"
        columns={[
          {
            key: 'violationId',
            title: 'ID',
            type: FieldType.TEXT,
          },
          {
            key: 'studentCode',
            title: 'Code',
            type: FieldType.TEXT,
          },
          {
            key: 'studentName',
            title: 'Student',
            type: FieldType.TEXT,
          },
          {
            key: 'violationName',
            title: 'Name',
            type: FieldType.TEXT,
          },
          {
            key: 'date',
            title: 'Date',
            type: FieldType.TIME_DATE,
          },
          {
            key: 'violationGroupName',
            title: 'Group',
            type: FieldType.TEXT,
          },
          {
            key: 'year',
            title: 'Year',
            type: FieldType.TEXT,
          },
        ]}
        queryApi={async () => await violationQuery.data}
      />
    </div>
  );
};

export const Route = createFileRoute('/_admin-layout/dashboard/disciplines/$id/history')({
  component: Page,
})