import "./style.scss";
const MyComponent = () => {
  // const hoidanit = "Eric"; // String
  // const hoidanit = 25; // number
  // const hoidanit = true; // boolean
  // const hoidanit = undefined;
  // const hoidanit = null;
  const hoidanit = [1, 2, 3];
  // const hoidanit = {
  //   name: "hoidanit",
  //   age: 25
  // };
  return (
    <>
      <div>{JSON.stringify(hoidanit)} & Hoi Dan IT</div>
      <div className="parent">
        Parent
        <div className="child">Child</div>
      </div>
    </>
  );
}
export default MyComponent;