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
    </div>
  )
}

export default About
