export const rowData = (data) => {
  // return data?.map((item) => {
  return {
    id: data?.Id || 'Dummy Data',
    title: data?.Title || 'Title',
    path: data?.Path || 'url link',
  };
  // });
};
