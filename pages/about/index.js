import Loading from "./loading";

async function takeTime() {
  await new Promise((resolve) => {
    setTimeout(resolve, 5000)
  });
}

const About = () => {
  takeTime();
  return (
    <div>
      This is the about page
      <Loading />
    </div>
  )
}

export default About
