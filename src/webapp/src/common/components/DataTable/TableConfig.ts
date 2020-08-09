export const customStyles = {
  rows: {
    style: {
      minHeight: '32px', // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: '4px', // override the cell padding for head cells
      paddingRight: '4px',
    },
  },
  cells: {
    style: {
      paddingLeft: '4px', // override the cell padding for data cells
      paddingRight: '4px',
    },
  },
};

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
