const initDataArray = [
  { id: 1, type: 'Cat', name: 'Kas', country: 'Czech Republic', age: 2 },
  { id: 2, type: 'Dog', name: 'Rex', country: 'Montenegro', age: 6 },
  { id: 3, type: 'Cat', name: 'Simba', country: 'France', age: 12 },
  { id: 4, type: 'Dog', name: 'Beethoven', country: 'Czech Republic', age: 3 },
  { id: 5, type: 'Cat', name: 'Hash', country: 'Czech Republic', age: 8 },
];

const data = JSON.parse(localStorage.getItem('state-storing-demo-data') || '0') || initDataArray;

const dataStorage = {
  get: () => {
    return data;
  },
  save: (newData: any) => {
    localStorage.setItem('state-storing-demo-data', JSON.stringify(newData));
  },
};
export default dataStorage;
