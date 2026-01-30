import CategoryNavigator from "./CategoryNavigator.jsx";

const lang = [
  { lan: 'Hindi' },
  { lan: 'English' },
  { lan: 'Telugu' },
  { lan: 'Tamil' },
  { lan: 'Kannada' },
  { lan: 'Bengali' },
  { lan: 'Malayalam' },
  { lan: 'Bhojpuri' },
  { lan: 'Odia' },
  { lan: 'Marathi' },
  { lan: 'Punjabi' }
];

function ExLAng() {
  return (
    <>
      <CategoryNavigator category={"langauage"} redirecturl={"langauage"} data={lang} />
    </>
  );
}
export default ExLAng