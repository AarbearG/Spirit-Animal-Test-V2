export default function Result({ animal }) {
  return (
    <div className='max-w-xl mx-auto p-8 text-center'>
      <h1 className='text-3xl font-bold mb-4'>Your Spirit Animal Is:</h1>
      <div className='text-5xl mb-2'>🐺</div>
      <h2 className='text-2xl font-semibold mb-1'>{animal.name}</h2>
      <p className='text-lg italic mb-4'>{animal.embodiment}</p>
      <p className='text-md mb-2'><span className='font-semibold'>Role:</span> {animal.role}</p>
      <p className='text-sm text-gray-600'>Thank you for completing the test! This is your strongest energetic alignment based on your answers.</p>
    </div>
  );
}
