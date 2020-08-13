import { TYPE } from '../../../../../../const/type';
import { _requestToServer } from '../../../../../../services/exec';
import { POST, DELETE } from '../../../../../../const/method';
import { EVENT_SCHOOLS, ADMIN_ACCOUNT } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';

export const createRequest = async (self) => {
    console.log('createRequest')
    console.log(self.state.applyModal)
    let { id, body } = self.state;
    let { modalState } = self.props;
    await self.setState({ loading: true });
    switch (modalState.typeModal) {
        // case TYPE.JOB_FILTER.homePriority:
        //     await _requestToServer(
        //         POST,
        //         EVENT_SCHOOLS + `/${body.schoolEventID + routePath.JOBS}/${id}/priority/home`,
        //         { homePriority },
        //         undefined,
        //         undefined,
        //         EMPLOYER_HOST,
        //         true,
        //         false
        //     ).then((res: any) => {
        //         if (res) {
        //             self.requeryData()
        //         }
        //     }).finally(
        //         () => self.setState({
        //             loading: false
        //         })
        //     );
        //     break;

        case TYPE.JOB_FILTER.highlight:
            await _requestToServer(
                POST,
                ADMIN_ACCOUNT + `/jobs/${id}/priority/search`,
                { searchPriority: 'HIGHLIGHT' },
                undefined,
                undefined,
                EMPLOYER_HOST,
                true,
                false
            ).then((res: any) => {
                if (res) {
                    self.requeryData()
                }
            }).finally(
                () => self.setState({
                    loading: false
                })
            );
            await self.props.getListJobService();
            break;
        case 'HOME_TOP':
            await _requestToServer(
                POST,
                ADMIN_ACCOUNT + `/jobs/${id}/priority/home`,
                { homePriority: 'TOP' },
                undefined,
                undefined,
                EMPLOYER_HOST,
                true,
                false
            ).then((res: any) => {
                if (res) {
                    self.requeryData()
                }
            }).finally(
                () => self.setState({
                    loading: false
                })
            );
            await self.props.getListJobService();
            break;
        case 'HOME_TOP_EVENT':
            // console.log(body.schoolEventID)
            await _requestToServer(
                POST,
                EVENT_SCHOOLS + `/${body.schoolEventID}/jobs/${id}/priority/home`,
                { homePriority: 'TOP' },
                undefined,
                undefined,
                EMPLOYER_HOST,
                true,
                false
            ).then((res: any) => {
                if (res) {
                    self.requeryData()
                }
            }).finally(
                () => self.setState({
                    loading: false
                })
            );
            await self.props.getJobServiceEvent(body.schoolEventID);
            break;
        case 'TITLE_HIGHLIGHT_EVENT':
            await _requestToServer(
                POST,
                EVENT_SCHOOLS + `/${body.schoolEventID}/jobs/${id}/highlight`,
                { highlight: 'TITLE_HIGHLIGHT' },
                undefined,
                undefined,
                EMPLOYER_HOST,
                true,
                false
            ).then((res: any) => {
                if (res) {
                    self.requeryData()
                }
            }).finally(
                () => self.setState({
                    loading: false
                })
            );
            await self.props.getJobServiceEvent(body.schoolEventID);
            break;
        case 'TITLE_HIGHLIGHT':
            await _requestToServer(
                POST,
                ADMIN_ACCOUNT + `/jobs/${id}/highlight`,
                { highlight: 'TITLE_HIGHLIGHT' },
                undefined,
                undefined,
                EMPLOYER_HOST,
                true,
                false
            ).then((res: any) => {
                if (res) {
                    self.requeryData()
                }
            }).finally(
                () => self.setState({
                    loading: false
                })
            );
            await self.props.getListJobService();
            break;
        case 'HOME_IN_DAY':
            await _requestToServer(
                POST,
                ADMIN_ACCOUNT + `/jobs/${id}/priority/home`,
                { homePriority: 'IN_DAY' },
                undefined,
                undefined,
                EMPLOYER_HOST,
                true,
                false
            ).then((res: any) => {
                if (res) {
                    self.requeryData()
                }
            }).finally(
                () => self.setState({
                    loading: false
                })
            );
            await self.props.getListJobService();
            break;
        case TYPE.DELETE:
            await _requestToServer(
                DELETE,
                ADMIN_ACCOUNT + `/jobs/${id}`,
                undefined,
                undefined,
                undefined,
                EMPLOYER_HOST,
                true,
                false
            ).then((res) => {
                if (res) {
                    self.searchEventJobs();
                    self.props.handleModal();
                }
            }).finally(
                () => self.setState({
                    loading: false
                })
            )
            break;
        default:
            break;
    };
}