export const customStyles = {
  rows: {
    style: {
      minHeight: '42px', // override the row height
      fontFamily: 'Source Sans Pro,sans-serif',
    },
    highlightOnHoverStyle: {
      backgroundColor: 'rgb(230, 244, 244)',
      borderBottomColor: '#FFFFFF',
      borderRadius: '25px',
      outline: '1px solid #FFFFFF',
      cursor: 'pointer',
    },
  },
  headCells: {
    style: {
      paddingLeft: '4px', // override the cell padding for head cells
      paddingRight: '4px',
      fontFamily: 'Source Sans Pro,sans-serif',
      fontWeight: 'bold',
    },
  },
  cells: {
    style: {
      paddingLeft: '4px', // override the cell padding for data cells
      paddingRight: '4px',
      fontFamily: 'Source Sans Pro,sans-serif',
    },
  },
};

export const customShortStyles = {
  rows: {
    style: {
      fontFamily: 'Source Sans Pro,sans-serif',
    },
    highlightOnHoverStyle: {
      backgroundColor: 'rgb(230, 244, 244)',
      borderBottomColor: '#FFFFFF',
      borderRadius: '1px',
      outline: '1px solid #FFFFFF',
      cursor: 'pointer',
    },
  },
  headCells: {
    style: {
      paddingLeft: '1px', // override the cell padding for head cells
      paddingRight: '1px',
      fontFamily: 'Source Sans Pro,sans-serif',
      fontWeight: 'bold',
    },
  },
  cells: {
    style: {
      paddingLeft: '1px', // override the cell padding for data cells
      paddingRight: '1px',
      fontFamily: 'Source Sans Pro,sans-serif',
    },
  },
};

export const largeRowStyles = [
  {
    when: (row: any) => row,
    style: {
      minHeight: '60px',
    },
  },
];

export const playerRowStyeForNew = [
  {
    when: (row: any) => row.isNew,
    style: {
      backgroundColor: '#4F91CD',
    },
  },
  {
    when: (row: any) => row,
    style: {
      minHeight: '50px',
    },
  },
];
export const playerRowStyles = [
  {
    when: (row: any) => row.type == 'BATSMAN',
    style: {
      backgroundColor: 'rgba(63, 195, 128, 0.9)',
    },
  },
  {
    when: (row: any) => row.type == 'BOWLER',
    style: {
      backgroundColor: 'rgb(223, 220, 182)',
    },
  },
  {
    when: (row: any) => row.type == 'ALLROUNDER',
    style: {
      backgroundColor: '#AAC9FF',
    },
  },
  {
    when: (row: any) => row.type == 'WICKETKEEPER',
    style: {
      backgroundColor: 'rgb(0, 255, 135)',
    },
  },
];
