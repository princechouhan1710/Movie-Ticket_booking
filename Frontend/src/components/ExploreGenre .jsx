import CategoryNavigator from './CategoryNavigator';
const lang = [
  { lan: 'Comedy' },
  { lan: 'Action' },
  { lan: 'Drama' },
  { lan: 'Romance' },
  { lan: 'Horror' },
  { lan: 'Thriller' },
  { lan: 'Crime' },
  { lan: 'Mystery' },
  { lan: 'Biography' },
  { lan: 'Adventure' },
  { lan: 'Animation' },
  { lan: 'Family' }
];
function ExGenre() {
  return (
    <CategoryNavigator category={"Genre"}  redirecturl={"category"} data={lang}/>
      )
}
export default ExGenre;
