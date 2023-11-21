// competitionApi.tsx
import tokenHttp from './tokenHttp';

export const CompetitionAPI = {
  /** 최근 대회 정보 조회 */
  getCompetitionAxios: function () {
    return tokenHttp
      .request({
        method: 'GET',
        url: '/compete/',
      })
      .catch(error => {
        console.log(error);
      });
  },

  /** 특정 달의 대회 기록 조회 */
  getCompetitionHistoryAxios: function (
    year: Number = 2023,
    month: Number = 11,
  ) {
    return tokenHttp.request({
      method: 'GET',
      url: `/compete/history/${year}/${month}`,
    });
  },
};

export default CompetitionAPI;
