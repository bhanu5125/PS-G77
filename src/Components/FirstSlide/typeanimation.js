import { TypeAnimation } from 'react-type-animation';

const ExampleComponent = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'We provide solution for ADHD',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'We provide solution for Dyslexia',
        1000,
        'We provide solution for Autism',
        1000,

      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};
export default ExampleComponent
